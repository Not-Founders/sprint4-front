export const ErrorType = {
  NETWORK: 'NETWORK',
  API: 'API',
  VALIDATION: 'VALIDATION',
  AUTHENTICATION: 'AUTHENTICATION',
  AUTHORIZATION: 'AUTHORIZATION',
  TIMEOUT: 'TIMEOUT',
  CORS: 'CORS',
  UNKNOWN: 'UNKNOWN'
} as const;

export type ErrorType = typeof ErrorType[keyof typeof ErrorType];

export interface ErrorContext {
  operation: string;
  requestData?: any;
  timestamp: string;
  userAgent: string;
  networkStatus: 'online' | 'offline';
  url?: string;
  method?: string;
}

export interface UserFriendlyError {
  type: ErrorType;
  message: string;
  technicalMessage?: string;
  suggestions?: string[];
  retryable: boolean;
  context?: ErrorContext;
}

export interface NetworkStatus {
  isOnline: boolean;
  connectionType?: string;
  effectiveType?: string;
  rtt?: number;
  downlink?: number;
}

const ERROR_MESSAGES: Record<string, string> = {
  NETWORK_TIMEOUT: 'Tempo limite excedido. Verifique sua conexão e tente novamente.',
  NETWORK_OFFLINE: 'Você está offline. Verifique sua conexão com a internet.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  
  SERVER_ERROR: 'Erro interno do servidor. Tente novamente em alguns minutos.',
  BAD_REQUEST: 'Dados inválidos. Verifique os campos destacados.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para realizar esta ação.',
  NOT_FOUND: 'Recurso não encontrado.',
  CONFLICT: 'Conflito de dados. O recurso já existe ou está sendo usado.',
  UNPROCESSABLE_ENTITY: 'Dados não podem ser processados. Verifique as informações.',
  TOO_MANY_REQUESTS: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  SERVICE_UNAVAILABLE: 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.',
  
  VALIDATION_ERROR: 'Dados inválidos. Verifique os campos destacados.',
  INVALID_CPF: 'CPF inválido. Verifique o formato e os dígitos.',
  INVALID_AGE: 'Idade deve ser um número entre 0 e 150 anos.',
  INVALID_NAME: 'Nome deve ter pelo menos 2 caracteres.',
  REQUIRED_FIELD: 'Este campo é obrigatório.',
  
  CORS_ERROR: 'Erro de configuração do servidor. Contate o suporte técnico.',
  UNKNOWN_ERROR: 'Erro inesperado. Tente novamente ou contate o suporte.',
  
  CHECK_CONNECTION: 'Verifique sua conexão com a internet',
  TRY_AGAIN_LATER: 'Tente novamente em alguns minutos',
  CONTACT_SUPPORT: 'Entre em contato com o suporte técnico',
  CHECK_FORM_DATA: 'Verifique os dados do formulário',
  REFRESH_PAGE: 'Recarregue a página e tente novamente'
};

export class NetworkUtils {
  static getNetworkStatus(): NetworkStatus {
    const navigator = window.navigator as any;
    
    return {
      isOnline: navigator.onLine,
      connectionType: navigator.connection?.type,
      effectiveType: navigator.connection?.effectiveType,
      rtt: navigator.connection?.rtt,
      downlink: navigator.connection?.downlink
    };
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }

  static isCorsError(error: any): boolean {
    if (!error) {
      return false;
    }
    
    if (error instanceof TypeError && error.message && error.message.includes('Failed to fetch')) {
      return true;
    }
    
    if (error.name === 'TypeError' && error.message && error.message.toLowerCase().includes('cors')) {
      return true;
    }
    
    return false;
  }

  static isNetworkError(error: any): boolean {
    if (!this.isOnline()) {
      return true;
    }
    
    if (!error) {
      return false;
    }
    
    if (error instanceof TypeError && error.message && error.message.includes('Failed to fetch')) {
      return true;
    }
    
    if (error.name === 'AbortError') {
      return true;
    }
    
    return false;
  }
}

export class ErrorHandler {
  static handleApiError(error: any, context: ErrorContext): UserFriendlyError {
    const networkStatus = NetworkUtils.getNetworkStatus();
    const enhancedContext: ErrorContext = {
      ...context,
      networkStatus: networkStatus.isOnline ? 'online' as const : 'offline' as const,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    if (!networkStatus.isOnline) {
      return {
        type: ErrorType.NETWORK,
        message: ERROR_MESSAGES.NETWORK_OFFLINE,
        suggestions: [ERROR_MESSAGES.CHECK_CONNECTION],
        retryable: true,
        context: enhancedContext
      };
    }

    if (NetworkUtils.isCorsError(error)) {
      return {
        type: ErrorType.CORS,
        message: ERROR_MESSAGES.CORS_ERROR,
        technicalMessage: error.message,
        suggestions: [ERROR_MESSAGES.CONTACT_SUPPORT],
        retryable: false,
        context: enhancedContext
      };
    }

    if (NetworkUtils.isNetworkError(error)) {
      return {
        type: ErrorType.NETWORK,
        message: ERROR_MESSAGES.NETWORK_ERROR,
        technicalMessage: error.message,
        suggestions: [ERROR_MESSAGES.CHECK_CONNECTION, ERROR_MESSAGES.TRY_AGAIN_LATER],
        retryable: true,
        context: enhancedContext
      };
    }

    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return {
        type: ErrorType.TIMEOUT,
        message: ERROR_MESSAGES.NETWORK_TIMEOUT,
        suggestions: [ERROR_MESSAGES.CHECK_CONNECTION, ERROR_MESSAGES.TRY_AGAIN_LATER],
        retryable: true,
        context: enhancedContext
      };
    }

    if (error.status) {
      return this.handleHttpError(error.status, error.message, enhancedContext);
    }

    return {
      type: ErrorType.UNKNOWN,
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
      technicalMessage: error.message || String(error),
      suggestions: [ERROR_MESSAGES.TRY_AGAIN_LATER, ERROR_MESSAGES.CONTACT_SUPPORT],
      retryable: true,
      context: enhancedContext
    };
  }

  private static handleHttpError(status: number, message?: string, context?: ErrorContext): UserFriendlyError {
    switch (status) {
      case 400: {
        const isApiCompatibilityIssue = context?.operation?.includes('Patient') || 
                                       context?.url?.includes('/paciente');
        
        return {
          type: ErrorType.VALIDATION,
          message: isApiCompatibilityIssue 
            ? 'Formato de dados incompatível com a API. A API Java pode estar esperando campos diferentes.'
            : ERROR_MESSAGES.BAD_REQUEST,
          technicalMessage: message,
          suggestions: isApiCompatibilityIssue 
            ? [
                'Verifique se a API Java está configurada corretamente',
                'Os campos enviados podem não corresponder ao esperado pela API',
                'Contate o desenvolvedor da API Java para verificar o formato correto'
              ]
            : [ERROR_MESSAGES.CHECK_FORM_DATA],
          retryable: false,
          context
        };
      }

      case 401:
        return {
          type: ErrorType.AUTHENTICATION,
          message: ERROR_MESSAGES.UNAUTHORIZED,
          technicalMessage: message,
          suggestions: [ERROR_MESSAGES.REFRESH_PAGE],
          retryable: false,
          context
        };

      case 403:
        return {
          type: ErrorType.AUTHORIZATION,
          message: ERROR_MESSAGES.FORBIDDEN,
          technicalMessage: message,
          suggestions: [ERROR_MESSAGES.CONTACT_SUPPORT],
          retryable: false,
          context
        };

      case 404:
        return {
          type: ErrorType.API,
          message: ERROR_MESSAGES.NOT_FOUND,
          technicalMessage: message,
          suggestions: [ERROR_MESSAGES.REFRESH_PAGE],
          retryable: false,
          context
        };

      case 409:
        return {
          type: ErrorType.VALIDATION,
          message: ERROR_MESSAGES.CONFLICT,
          technicalMessage: message,
          suggestions: [ERROR_MESSAGES.CHECK_FORM_DATA],
          retryable: false,
          context
        };

      case 422:
        return {
          type: ErrorType.VALIDATION,
          message: ERROR_MESSAGES.UNPROCESSABLE_ENTITY,
          technicalMessage: message,
          suggestions: [ERROR_MESSAGES.CHECK_FORM_DATA],
          retryable: false,
          context
        };

      case 429:
        return {
          type: ErrorType.API,
          message: ERROR_MESSAGES.TOO_MANY_REQUESTS,
          technicalMessage: message,
          suggestions: [ERROR_MESSAGES.TRY_AGAIN_LATER],
          retryable: true,
          context
        };

      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: ErrorType.API,
          message: status === 503 ? ERROR_MESSAGES.SERVICE_UNAVAILABLE : ERROR_MESSAGES.SERVER_ERROR,
          technicalMessage: message,
          suggestions: [ERROR_MESSAGES.TRY_AGAIN_LATER],
          retryable: true,
          context
        };

      default:
        return {
          type: ErrorType.API,
          message: ERROR_MESSAGES.UNKNOWN_ERROR,
          technicalMessage: message || `HTTP ${status}`,
          suggestions: [ERROR_MESSAGES.TRY_AGAIN_LATER, ERROR_MESSAGES.CONTACT_SUPPORT],
          retryable: status >= 500,
          context
        };
    }
  }

  static handleValidationError(field: string, value: any, rule?: string): UserFriendlyError {
    const context: ErrorContext = {
      operation: 'validation',
      requestData: { field, value, rule },
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      networkStatus: 'online'
    };

    let message = ERROR_MESSAGES.VALIDATION_ERROR;
    
    switch (field) {
      case 'cpf':
        message = ERROR_MESSAGES.INVALID_CPF;
        break;
      case 'age':
        message = ERROR_MESSAGES.INVALID_AGE;
        break;
      case 'name':
        message = ERROR_MESSAGES.INVALID_NAME;
        break;
      default:
        if (rule === 'required') {
          message = ERROR_MESSAGES.REQUIRED_FIELD;
        }
    }

    return {
      type: ErrorType.VALIDATION,
      message,
      suggestions: [ERROR_MESSAGES.CHECK_FORM_DATA],
      retryable: false,
      context
    };
  }

  static shouldRetry(error: UserFriendlyError): boolean {
    return error.retryable && (
      error.type === ErrorType.NETWORK ||
      error.type === ErrorType.TIMEOUT ||
      (error.type === ErrorType.API && error.context?.requestData?.status >= 500)
    );
  }

  static getRetryDelay(attempt: number): number {
    return Math.min(1000 * Math.pow(2, attempt), 10000);
  }
}
