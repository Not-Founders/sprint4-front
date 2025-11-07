import type { Consulta, ConsultaRequest, ApiResponse } from '../types/consulta';

export class ConsultaApi {
  private static readonly BASE_URL = 'https://sprint4-java-av1f.onrender.com';
  private static readonly TIMEOUT = 30000;

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

  private static async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const requestId = `resp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const timestamp = new Date().toISOString();
    const status = response.status;

    try {
      if (status === 200 || status === 201) {
        const responseText = await response.text();
        let data;
        
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { message: responseText, success: true };
        }

        return {
          success: true,
          data,
          status,
          requestId,
          timestamp
        };
      }

      const errorText = await response.text();
      return {
        success: false,
        error: errorText || `HTTP ${status}`,
        status,
        requestId,
        timestamp
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        status: 0,
        requestId,
        timestamp
      };
    }
  }

  static async getAllConsultas(): Promise<ApiResponse<Consulta[]>> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}/main/consultas`);
      return await this.handleResponse<Consulta[]>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar consultas',
        status: 0,
        requestId: `err_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  static async createConsulta(consulta: ConsultaRequest): Promise<ApiResponse<Consulta>> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}/main/consulta`, {
        method: 'POST',
        body: JSON.stringify(consulta),
      });
      return await this.handleResponse<Consulta>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar consulta',
        status: 0,
        requestId: `err_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  static async deleteConsulta(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}/main/consultas/${id}`, {
        method: 'DELETE',
      });
      return await this.handleResponse<void>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao deletar consulta',
        status: 0,
        requestId: `err_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
  }
}
