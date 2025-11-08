export interface Patient {
  id: number;
  name: string;
  cpf: string;
  age: number;
  gender: string;
  plan: string;
}

export interface PatientRequest {
  name: string;
  cpf: string;
  age: number;
  gender: string;
  plan: string;
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

export interface ApiError {
  message: string;
  status: number;
  timestamp?: string;
  requestId?: string;
  details?: {
    code?: string;
    field?: string;
    validationErrors?: Record<string, string[]>;
    serverMessage?: string;
  };
}
