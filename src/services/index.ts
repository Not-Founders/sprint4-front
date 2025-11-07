export { PatientApi } from './patientApi';
export type { Patient, PatientRequest, ApiResponse, ApiError } from '../types/patient';

export { ConsultaApi } from './consultaApi';
export type { Consulta, ConsultaRequest } from '../types/consulta';

export { ExameApi } from './exameApi';
export type { Exame, ExameRequest } from '../types/exame';

export { 
  validateAdminCredentials, 
  isAdminCredentials, 
  validateCredentials, 
  clearAuthData 
} from './authService';
export type { User, AuthState, LoginCredentials, AuthContextType } from '../types/auth';