export interface Exame {
  id: number;
  tipoExame: string;
  dataExame: number;
  horaExame: number;
  resultado: string;
  paciente: {
    id: number;
    name: string;
    cpf: string;
    age: number;
    gender: string;
    plan: string;
  };
}

export interface ExameRequest {
  tipoExame: string;
  dataExame: number;
  horaExame: number;
  resultado: string;
  paciente: {
    id: number;
  };
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
