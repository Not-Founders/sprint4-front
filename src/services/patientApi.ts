import type { Patient, PatientRequest, ApiResponse } from '../types/patient';
import { ErrorHandler, NetworkUtils, type ErrorContext } from '../utils/errorHandler';



interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

export class PatientApi {
  private static readonly BASE_URL = 'https://sprint4-java-av1f.onrender.com';
  private static readonly TIMEOUT = 30000;
  private static readonly RETRY_CONFIG: RetryConfig = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2
  };

  private static async checkNetworkConnectivity(): Promise<boolean> {
    if (!NetworkUtils.isOnline()) {
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${this.BASE_URL}/main/pacientes`, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors'
      });

      clearTimeout(timeoutId);

      return response.status < 500;
    } catch {
      return true;
    }
  }

  private static detectCorsIssue(error: unknown, response?: Response): boolean {
    if (error && NetworkUtils.isCorsError(error)) {
      return true;
    }

    if (response) {
      const corsHeaders = [
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Headers'
      ];

      const hasCorsHeaders = corsHeaders.some(header =>
        response.headers.has(header)
      );

      if (!hasCorsHeaders && response.status === 0) {
        return true;
      }
    }

    return false;
  }

  private static async parseApiError(response: Response): Promise<{
    message: string;
    validationErrors?: Record<string, string[]>;
    serverMessage?: string;
    code?: string;
    field?: string;
  }> {
    let errorData: Record<string, any> = {};

    try {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        const textResponse = await response.text();
        errorData = { message: textResponse || `HTTP ${response.status}` };
      }
    } catch {
      try {
        const textResponse = await response.text();
        errorData = { message: textResponse || `HTTP ${response.status}` };
      } catch {
        errorData = { message: `HTTP ${response.status}` };
      }
    }

    const message = errorData.message ||
      errorData.error ||
      errorData.detail ||
      errorData.msg ||
      `HTTP ${response.status}`;

    const serverMessage = errorData.message || errorData.error || errorData.detail;

    let validationErrors: Record<string, string[]> | undefined;

    if (errorData.validationErrors) {
      validationErrors = errorData.validationErrors;
    } else if (errorData.errors) {
      if (Array.isArray(errorData.errors)) {
        validationErrors = {};
        errorData.errors.forEach((err: any) => {
          if (err.field && err.message) {
            if (!validationErrors![err.field]) {
              validationErrors![err.field] = [];
            }
            validationErrors![err.field].push(err.message);
          }
        });
      } else if (typeof errorData.errors === 'object') {
        validationErrors = errorData.errors;
      }
    } else if (errorData.field && errorData.message) {
      validationErrors = {
        [errorData.field]: [errorData.message]
      };
    }

    return {
      message,
      validationErrors,
      serverMessage,
      code: errorData.code,
      field: errorData.field
    };
  }

  static async testConnectivity(): Promise<{
    isOnline: boolean;
    canReachServer: boolean;
    corsIssues: boolean;
    responseTime?: number;
    error?: string;
  }> {
    const startTime = performance.now();

    const isOnline = NetworkUtils.isOnline();
    if (!isOnline) {
      return {
        isOnline: false,
        canReachServer: false,
        corsIssues: false,
        error: 'Device is offline'
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${this.BASE_URL}/main/pacientes`, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);
      const responseTime = performance.now() - startTime;

      return {
        isOnline: true,
        canReachServer: response.ok || response.status < 500,
        corsIssues: false,
        responseTime
      };

    } catch (error) {
      const responseTime = performance.now() - startTime;
      const isCorsError = this.detectCorsIssue(error);

      return {
        isOnline: true,
        canReachServer: false,
        corsIssues: isCorsError,
        responseTime,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  static async testHealthEndpoint(): Promise<{
    available: boolean;
    responseTime?: number;
    status?: number;
    error?: string;
  }> {
    const startTime = performance.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${this.BASE_URL}/main/pacientes`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);
      const responseTime = performance.now() - startTime;

      return {
        available: true,
        responseTime,
        status: response.status
      };

    } catch (error) {
      const responseTime = performance.now() - startTime;

      return {
        available: false,
        responseTime,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private static getRetryDelay(attempt: number): number {
    const delay = this.RETRY_CONFIG.baseDelay * Math.pow(this.RETRY_CONFIG.backoffMultiplier, attempt - 1);
    return Math.min(delay, this.RETRY_CONFIG.maxDelay);
  }

  private static shouldRetryRequest(error: any, attempt: number): boolean {
    if (attempt >= this.RETRY_CONFIG.maxAttempts) {
      return false;
    }

    if (NetworkUtils.isNetworkError(error)) {
      return true;
    }

    if (error.name === 'AbortError') {
      return true;
    }

    if (error.status >= 500) {
      return true;
    }

    if (error.status === 429) {
      return true;
    }

    return false;
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private static async fetchWithTimeout(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private static async fetchWithRetry(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const isConnected = await this.checkNetworkConnectivity();
    if (!isConnected) {
      const error = new Error('No network connectivity');
      throw error;
    }

    let lastError: any;

    for (let attempt = 1; attempt <= this.RETRY_CONFIG.maxAttempts; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, options);
        return response;

      } catch (error) {
        lastError = error;

        const isCorsError = this.detectCorsIssue(error);

        if (isCorsError) {
          break;
        }

        if (!this.shouldRetryRequest(error, attempt)) {
          break;
        }

        if (attempt < this.RETRY_CONFIG.maxAttempts) {
          const delay = this.getRetryDelay(attempt);
          await this.sleep(delay);
        }
      }
    }

    throw lastError;
  }

  private static async handleResponse<T>(
    response: Response
  ): Promise<ApiResponse<T>> {
    const requestId = `resp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    try {
      const status = response.status;
      const timestamp = new Date().toISOString();

      if (status === 200 || status === 201) {
        let rawData;
        
        const responseText = await response.text();
        
        try {
          rawData = JSON.parse(responseText);
        } catch {
          if (status === 201 && responseText) {
            rawData = {
              success: true,
              message: responseText,
              id: Date.now(),
              name: 'Paciente criado com sucesso',
              cpf: '',
              age: 0,
              gender: '',
              plan: ''
            };
          } else {
            rawData = { message: responseText };
          }
        }

        let data = rawData;
        
        if (rawData && typeof rawData === 'object' && typeof rawData !== 'string') {
          if (Array.isArray(rawData)) {
            data = rawData.map(patient => {
              if (!patient || typeof patient !== 'object') return patient;

              return {
                id: patient.id,
                name: patient.nomeCompleto || patient.nome || patient.name || '',
                cpf: patient.cpfNumero || patient.cpf || '',
                age: patient.idadePaciente || patient.idade || patient.age || 0,
                gender: patient.sexo || patient.genero || patient.gender || '',
                plan: patient.planoSaude || patient.plano || patient.plan || ''
              };
            });
          } else if (rawData.nome || rawData.idade || rawData.genero || rawData.plano) {
            data = {
              id: rawData.id,
              name: rawData.nomeCompleto || rawData.nome || rawData.name || '',
              cpf: rawData.cpfNumero || rawData.cpf || '',
              age: rawData.idadePaciente || rawData.idade || rawData.age || 0,
              gender: rawData.sexo || rawData.genero || rawData.gender || '',
              plan: rawData.planoSaude || rawData.plano || rawData.plan || ''
            };
          }
        }

        return {
          success: true,
          data,
          status,
          requestId,
          timestamp
        };
      }

      const errorInfo = await this.parseApiError(response);

      return {
        success: false,
        error: errorInfo.message,
        status,
        requestId,
        timestamp,
        details: {
          validationErrors: errorInfo.validationErrors,
          serverMessage: errorInfo.serverMessage,
          statusText: response.statusText
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 0,
        requestId,
        timestamp: new Date().toISOString()
      };
    }
  }

  static async getAllPatients(): Promise<ApiResponse<Patient[]>> {
    const context: ErrorContext = {
      operation: 'getAllPatients',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      networkStatus: NetworkUtils.isOnline() ? 'online' : 'offline',
      url: `${this.BASE_URL}/main/pacientes`,
      method: 'GET'
    };

    try {
      const response = await this.fetchWithRetry(`${this.BASE_URL}/main/pacientes`, {});
      const result = await this.handleResponse<Patient[]>(response);

      return result;
    } catch (error) {
      const userFriendlyError = ErrorHandler.handleApiError(error, context);

      return {
        success: false,
        error: userFriendlyError.message,
        status: (error as any)?.status || 0,
        requestId: `err_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestamp: new Date().toISOString(),
        details: {
          serverMessage: userFriendlyError.technicalMessage,
          statusText: (error as any)?.statusText
        }
      };
    }
  }

  static async createPatient(patient: PatientRequest): Promise<ApiResponse<Patient>> {
    const context: ErrorContext = {
      operation: 'createPatient',
      requestData: patient,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      networkStatus: NetworkUtils.isOnline() ? 'online' : 'offline',
      url: `${this.BASE_URL}/main/paciente`,
      method: 'POST'
    };

    try {
      const dataVariations = [
        {
          nomeCompleto: patient.name,
          cpfNumero: patient.cpf,
          idadePaciente: patient.age,
          sexo: patient.gender === 'MASCULINO' ? 'M' : patient.gender === 'FEMININO' ? 'F' : 
                patient.gender === 'M' ? 'M' : patient.gender === 'F' ? 'F' : 'M',
          planoSaude: patient.plan
        },
        {
          nomeCompleto: patient.name,
          cpfNumero: patient.cpf,
          idadePaciente: patient.age,
          sexo: patient.gender === 'MASCULINO' ? 'm' : patient.gender === 'FEMININO' ? 'f' : 
                patient.gender === 'M' ? 'm' : patient.gender === 'F' ? 'f' : 'm',
          planoSaude: patient.plan
        },
        {
          nomeCompleto: patient.name,
          cpfNumero: patient.cpf,
          idadePaciente: patient.age,
          sexo: patient.gender,
          planoSaude: patient.plan
        },
        {
          nome: patient.name,
          cpf: patient.cpf,
          idade: patient.age,
          sexo: patient.gender === 'MASCULINO' ? 'M' : patient.gender === 'FEMININO' ? 'F' : patient.gender,
          plano: patient.plan
        }
      ];

      let response: Response | null = null;
      let lastError: any = null;

      for (let i = 0; i < dataVariations.length; i++) {
        const variation = dataVariations[i];

        try {
          response = await this.fetchWithRetry(`${this.BASE_URL}/main/paciente`, {
            method: 'POST',
            body: JSON.stringify(variation),
          });

          if (response.status === 400 && i === dataVariations.length - 1) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

            try {
              response = await fetch(`${this.BASE_URL}/main/paciente`, {
                method: 'POST',
                body: JSON.stringify(variation),
                signal: controller.signal,
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              clearTimeout(timeoutId);
            } catch (fetchError) {
              clearTimeout(timeoutId);
              throw fetchError;
            }
          }

          if (response.status < 400 || response.status >= 500) {
            break;
          }

          if (response.status === 400 && i < dataVariations.length - 1) {
            continue;
          }

        } catch (error) {
          lastError = error;

          if (i === dataVariations.length - 1) {
            throw error;
          }
        }
      }

      if (!response) {
        throw lastError || new Error('All data variations failed');
      }

      const result = await this.handleResponse<Patient>(response);

      return result;
    } catch (error) {
      const userFriendlyError = ErrorHandler.handleApiError(error, context);

      return {
        success: false,
        error: userFriendlyError.message,
        status: (error as any)?.status || 0,
        requestId: `err_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestamp: new Date().toISOString(),
        details: {
          validationErrors: (error as any)?.validationErrors,
          serverMessage: userFriendlyError.technicalMessage,
          statusText: (error as any)?.statusText
        }
      };
    }
  }

  static async updatePatient(id: number, patient: PatientRequest): Promise<ApiResponse<Patient>> {
    const context: ErrorContext = {
      operation: 'updatePatient',
      requestData: { id, ...patient },
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      networkStatus: NetworkUtils.isOnline() ? 'online' : 'offline',
      url: `${this.BASE_URL}/main/paciente/${id}`,
      method: 'PUT'
    };

    try {
      const dataVariations = [
        {
          nome: patient.name,
          cpf: patient.cpf,
          idade: patient.age,
          sexo: patient.gender,
          plano: patient.plan
        },
        {
          nome: patient.name,
          cpf: patient.cpf,
          idade: patient.age,
          genero: patient.gender,
          plano: patient.plan
        },
        {
          name: patient.name,
          cpf: patient.cpf,
          age: patient.age,
          gender: patient.gender,
          plan: patient.plan
        }
      ];

      let response: Response | null = null;
      let lastError: any = null;

      for (let i = 0; i < dataVariations.length; i++) {
        const variation = dataVariations[i];

        try {
          response = await this.fetchWithRetry(`${this.BASE_URL}/main/paciente/${id}`, {
            method: 'PUT',
            body: JSON.stringify(variation),
          });

          if (response.status < 400 || response.status >= 500) {
            break;
          }

          if (response.status === 400 && i < dataVariations.length - 1) {
            continue;
          }

        } catch (error) {
          lastError = error;

          if (i === dataVariations.length - 1) {
            throw error;
          }
        }
      }

      if (!response) {
        throw lastError || new Error('All update data variations failed');
      }

      const result = await this.handleResponse<Patient>(response);

      return result;
    } catch (error) {
      const userFriendlyError = ErrorHandler.handleApiError(error, context);

      return {
        success: false,
        error: userFriendlyError.message,
        status: (error as any)?.status || 0,
        requestId: `err_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestamp: new Date().toISOString(),
        details: {
          validationErrors: (error as any)?.validationErrors,
          serverMessage: userFriendlyError.technicalMessage,
          statusText: (error as any)?.statusText
        }
      };
    }
  }

  static async deletePatient(id: number): Promise<ApiResponse<void>> {
    const context: ErrorContext = {
      operation: 'deletePatient',
      requestData: { id },
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      networkStatus: NetworkUtils.isOnline() ? 'online' : 'offline',
      url: `${this.BASE_URL}/main/paciente/${id}`,
      method: 'DELETE'
    };

    try {
      const response = await this.fetchWithRetry(`${this.BASE_URL}/main/paciente/${id}`, {
        method: 'DELETE',
      });

      const result = await this.handleResponse<void>(response);

      return result;
    } catch (error) {
      const userFriendlyError = ErrorHandler.handleApiError(error, context);

      return {
        success: false,
        error: userFriendlyError.message,
        status: (error as any)?.status || 0,
        requestId: `err_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        timestamp: new Date().toISOString(),
        details: {
          serverMessage: userFriendlyError.technicalMessage,
          statusText: (error as any)?.statusText
        }
      };
    }
  }
}