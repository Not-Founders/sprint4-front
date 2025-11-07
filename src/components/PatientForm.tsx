import React, { useState, useEffect } from 'react';
import type { Patient, PatientRequest } from '../types/patient';
import { 
  validateName, 
  validateCPF, 
  validateAge, 
  validateGender, 
  validatePlan,
  validatePatientForm,
  formatCPF,
  cleanCPF,
  type ValidationResult 
} from '../utils/validation';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (patient: PatientRequest) => void;
  onCancel: () => void;
  loading: boolean;
  mode: 'create' | 'edit';
  serverValidationErrors?: Record<string, string[]>;
  serverError?: string;
}

interface FormData {
  name: string;
  cpf: string;
  age: string;
  gender: string;
  plan: string;
}

interface FormErrors {
  name?: string;
  cpf?: string;
  age?: string;
  gender?: string;
  plan?: string;
}

interface FormWarnings {
  name?: string;
  cpf?: string;
  age?: string;
  gender?: string;
  plan?: string;
}

interface FormSuggestions {
  name?: string[];
  cpf?: string[];
  age?: string[];
  gender?: string[];
  plan?: string[];
}

const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSubmit,
  onCancel,
  loading,
  mode,
  serverValidationErrors,
  serverError
}) => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '',
    age: '',
    gender: '',
    plan: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [warnings, setWarnings] = useState<FormWarnings>({});
  const [suggestions, setSuggestions] = useState<FormSuggestions>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [realTimeValidation, setRealTimeValidation] = useState<Record<string, boolean>>({});
  const [serverErrors, setServerErrors] = useState<FormErrors>({});

  // Pre-populate form with existing patient data for editing
  useEffect(() => {
    if (patient && mode === 'edit') {
      setFormData({
        name: patient.name,
        cpf: patient.cpf,
        age: patient.age.toString(),
        gender: patient.gender,
        plan: patient.plan
      });
    }
  }, [patient, mode]);

  // Handle server validation errors
  useEffect(() => {
    if (serverValidationErrors) {
      const mappedErrors: FormErrors = {};
      
      // Map server validation errors to form fields
      Object.entries(serverValidationErrors).forEach(([field, messages]) => {
        // Map common server field names to form field names
        const fieldMapping: Record<string, keyof FormErrors> = {
          'name': 'name',
          'nome': 'name',
          'cpf': 'cpf',
          'age': 'age',
          'idade': 'age',
          'gender': 'gender',
          'genero': 'gender',
          'sexo': 'gender',
          'plan': 'plan',
          'plano': 'plan',
          'planoSaude': 'plan'
        };

        const mappedField = fieldMapping[field.toLowerCase()] || field as keyof FormErrors;
        
        if (messages && messages.length > 0) {
          mappedErrors[mappedField] = messages[0]; // Use first error message
        }
      });

      setServerErrors(mappedErrors);
      
      // Mark fields with server errors as touched so they display
      const touchedFields: Record<string, boolean> = {};
      Object.keys(mappedErrors).forEach(field => {
        touchedFields[field] = true;
      });
      setTouched(prev => ({ ...prev, ...touchedFields }));
    } else {
      setServerErrors({});
    }
  }, [serverValidationErrors]);

  /**
   * Validate individual field with enhanced validation
   */
  const validateField = (name: string, value: string): ValidationResult => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'cpf':
        return validateCPF(value);
      case 'age':
        return validateAge(value);
      case 'gender':
        return validateGender(value);
      case 'plan':
        return validatePlan(value);
      default:
        return { isValid: true };
    }
  };

  /**
   * Update field validation state
   */
  const updateFieldValidation = (fieldName: string, result: ValidationResult) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: result.error
    }));

    setWarnings(prev => ({
      ...prev,
      [fieldName]: result.warning
    }));

    setSuggestions(prev => ({
      ...prev,
      [fieldName]: result.suggestions
    }));

    // Clear server error for this field when client validation passes
    if (result.isValid && serverErrors[fieldName as keyof FormErrors]) {
      setServerErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }));
    }
  };

  /**
   * Get the effective error for a field (client error takes precedence over server error)
   */
  const getFieldError = (fieldName: keyof FormErrors): string | undefined => {
    return errors[fieldName] || serverErrors[fieldName];
  };

  /**
   * Check if a field has any error (client or server)
   */
  const hasFieldError = (fieldName: keyof FormErrors): boolean => {
    return !!(errors[fieldName] || serverErrors[fieldName]);
  };

  /**
   * Validate all form fields
   */
  const validateForm = (): boolean => {
    const validationResult = validatePatientForm(formData);
    
    setErrors(validationResult.errors);
    setWarnings(validationResult.warnings || {});
    setSuggestions(validationResult.suggestions || {});
    
    return validationResult.isValid;
  };

  /**
   * Handle input change with real-time validation
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Format CPF as user types
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Enable real-time validation for this field after first interaction
    setRealTimeValidation(prev => ({
      ...prev,
      [name]: true
    }));

    // Perform real-time validation if field has been touched or has real-time validation enabled
    if (touched[name] || realTimeValidation[name]) {
      const validationResult = validateField(name, formattedValue);
      updateFieldValidation(name, validationResult);
    } else {
      // Clear previous errors when user starts typing for the first time
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
      setWarnings(prev => ({
        ...prev,
        [name]: undefined
      }));
      setSuggestions(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  /**
   * Handle field blur for validation
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Always validate on blur
    const validationResult = validateField(name, value);
    updateFieldValidation(name, validationResult);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    if (validateForm()) {
      const patientData: PatientRequest = {
        name: formData.name.trim(),
        cpf: cleanCPF(formData.cpf), // Remove formatting for API
        age: parseInt(formData.age),
        gender: formData.gender,
        plan: formData.plan.trim()
      };
      
      onSubmit(patientData);
    }
  };

  const hasErrors = Object.values(errors).some(error => error !== undefined);
  const hasServerErrors = Object.values(serverErrors).some(error => error !== undefined);
  const hasEmptyFields = Object.values(formData).some(value => value.trim() === '');
  
  const isFormValid = !hasErrors && !hasServerErrors && !hasEmptyFields;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-slate-800">
          {mode === 'create' ? 'Cadastrar Novo Paciente' : 'Editar Paciente'}
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          {mode === 'create' 
            ? 'Preencha os dados do novo paciente' 
            : 'Modifique os dados do paciente'
          }
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* General Server Error */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-red-800">Erro do Servidor</h4>
                <p className="text-sm text-red-700 mt-1">{serverError}</p>
              </div>
            </div>
          </div>
        )}
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={loading}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              hasFieldError('name') && touched.name
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400'
            } ${loading ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}`}
            placeholder="Digite o nome completo do paciente"
            maxLength={100}
          />
          {/* Error Message */}
          {getFieldError('name') && touched.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('name')}
              {serverErrors.name && (
                <span className="ml-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  Servidor
                </span>
              )}
            </p>
          )}
          
          {/* Warning Message */}
          {warnings.name && touched.name && !getFieldError('name') && (
            <p className="mt-1 text-sm text-amber-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {warnings.name}
            </p>
          )}
          
          {/* Suggestions */}
          {suggestions.name && touched.name && (
            <div className="mt-1 text-xs text-slate-500">
              {suggestions.name.map((suggestion, index) => (
                <p key={index} className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {suggestion}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* CPF Field */}
        <div>
          <label htmlFor="cpf" className="block text-sm font-semibold text-slate-700 mb-2">
            CPF *
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={loading}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 font-mono ${
              hasFieldError('cpf') && touched.cpf
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400'
            } ${loading ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}`}
            placeholder="000.000.000-00"
            maxLength={14}
          />
          {/* Error Message */}
          {getFieldError('cpf') && touched.cpf && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('cpf')}
              {serverErrors.cpf && (
                <span className="ml-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  Servidor
                </span>
              )}
            </p>
          )}
          
          {/* Warning Message */}
          {warnings.cpf && touched.cpf && !getFieldError('cpf') && (
            <p className="mt-1 text-sm text-amber-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {warnings.cpf}
            </p>
          )}
          
          {/* Suggestions */}
          {suggestions.cpf && touched.cpf && (
            <div className="mt-1 text-xs text-slate-500">
              {suggestions.cpf.map((suggestion, index) => (
                <p key={index} className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {suggestion}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Age and Gender Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-semibold text-slate-700 mb-2">
              Idade *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={loading}
              min="0"
              max="150"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                hasFieldError('age') && touched.age
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400'
              } ${loading ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}`}
              placeholder="Digite a idade"
            />
            {/* Error Message */}
            {getFieldError('age') && touched.age && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('age')}
                {serverErrors.age && (
                  <span className="ml-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    Servidor
                  </span>
                )}
              </p>
            )}
            
            {/* Warning Message */}
            {warnings.age && touched.age && !getFieldError('age') && (
              <p className="mt-1 text-sm text-amber-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {warnings.age}
              </p>
            )}
            
            {/* Suggestions */}
            {suggestions.age && touched.age && (
              <div className="mt-1 text-xs text-slate-500">
                {suggestions.age.map((suggestion, index) => (
                  <p key={index} className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {suggestion}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Gender Field */}
          <div>
            <label htmlFor="gender" className="block text-sm font-semibold text-slate-700 mb-2">
              Gênero *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                hasFieldError('gender') && touched.gender
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400'
              } ${loading ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}`}
            >
              <option value="">Selecione o gênero</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="Other">Outro</option>
            </select>
            {/* Error Message */}
            {getFieldError('gender') && touched.gender && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('gender')}
                {serverErrors.gender && (
                  <span className="ml-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    Servidor
                  </span>
                )}
              </p>
            )}
            
            {/* Warning Message */}
            {warnings.gender && touched.gender && !getFieldError('gender') && (
              <p className="mt-1 text-sm text-amber-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {warnings.gender}
              </p>
            )}
            
            {/* Suggestions */}
            {suggestions.gender && touched.gender && (
              <div className="mt-1 text-xs text-slate-500">
                {suggestions.gender.map((suggestion, index) => (
                  <p key={index} className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {suggestion}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Plan Field */}
        <div>
          <label htmlFor="plan" className="block text-sm font-semibold text-slate-700 mb-2">
            Plano de Saúde *
          </label>
          <input
            type="text"
            id="plan"
            name="plan"
            value={formData.plan}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={loading}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              hasFieldError('plan') && touched.plan
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400'
            } ${loading ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}`}
            placeholder="Digite o plano de saúde"
          />
          {/* Error Message */}
          {getFieldError('plan') && touched.plan && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('plan')}
              {serverErrors.plan && (
                <span className="ml-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  Servidor
                </span>
              )}
            </p>
          )}
          
          {/* Warning Message */}
          {warnings.plan && touched.plan && !getFieldError('plan') && (
            <p className="mt-1 text-sm text-amber-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {warnings.plan}
            </p>
          )}
          
          {/* Suggestions */}
          {suggestions.plan && touched.plan && (
            <div className="mt-1 text-xs text-slate-500">
              {suggestions.plan.map((suggestion, index) => (
                <p key={index} className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {suggestion}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 sm:flex-none px-6 py-3 text-slate-700 bg-slate-100 border border-slate-300 rounded-lg font-medium hover:bg-slate-200 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            title={!isFormValid ? `Botão desabilitado - Erros: ${hasErrors}, Servidor: ${hasServerErrors}, Campos vazios: ${hasEmptyFields}` : 'Clique para cadastrar'}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>
                  {mode === 'create' ? 'Cadastrando...' : 'Salvando...'}
                </span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>
                  {mode === 'create' ? 'Cadastrar Paciente' : 'Salvar Alterações'}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;