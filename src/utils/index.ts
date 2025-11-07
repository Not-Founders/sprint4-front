export {
  ErrorHandler,
  NetworkUtils,
  ErrorType,
  type ErrorContext,
  type UserFriendlyError,
  type NetworkStatus
} from './errorHandler';

export {
  validateCPF,
  validateName,
  validateAge,
  validateGender,
  validatePlan,
  validatePatientForm,
  formatCPF,
  cleanCPF,
  type ValidationResult,
  type FormValidationResult
} from './validation';
