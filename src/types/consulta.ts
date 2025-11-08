export interface Consulta {
  id: number;
  tipoConsulta: string;
  dataConsulta: number;
  horaConsulta: number;
}

export interface ConsultaRequest {
  tipoConsulta: string;
  dataConsulta: number;
  horaConsulta: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
  requestId?: string;
  timestamp?: string;
  details?: {
    validationErrors?: Record<string, string[]>;
    serverMessage?: string;
    statusText?: string;
  };
}
