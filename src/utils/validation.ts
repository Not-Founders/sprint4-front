export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
  suggestions?: string[];
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings?: Record<string, string>;
  suggestions?: Record<string, string[]>;
}

export const validateCPF = (cpf: string): ValidationResult => {
  if (!cpf) {
    return {
      isValid: false,
      error: 'CPF é obrigatório',
      suggestions: ['Digite um CPF válido no formato 000.000.000-00']
    };
  }

  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11) {
    return {
      isValid: false,
      error: 'CPF deve ter exatamente 11 dígitos',
      suggestions: ['Verifique se todos os dígitos foram digitados']
    };
  }

  // Verifica se todos os dígitos são iguais (ex: 111.111.111-11, 999.999.999-99)
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return {
      isValid: false,
      error: 'CPF inválido - todos os dígitos não podem ser iguais',
      suggestions: ['CPF não pode ter todos os dígitos iguais (ex: 111.111.111-11)']
    };
  }

  // Se chegou até aqui, o CPF é válido (tem 11 dígitos e não são todos iguais)
  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name || !name.trim()) {
    return {
      isValid: false,
      error: 'Nome é obrigatório',
      suggestions: ['Digite o nome completo do paciente']
    };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return {
      isValid: false,
      error: 'Nome deve ter pelo menos 2 caracteres',
      suggestions: ['Digite o nome completo']
    };
  }

  if (trimmedName.length > 100) {
    return {
      isValid: false,
      error: 'Nome deve ter no máximo 100 caracteres',
      suggestions: ['Use abreviações se necessário']
    };
  }

  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmedName)) {
    return {
      isValid: false,
      error: 'Nome contém caracteres inválidos',
      suggestions: ['Use apenas letras, espaços, hífens e apostrofes']
    };
  }

  if (!/[a-zA-ZÀ-ÿ]/.test(trimmedName)) {
    return {
      isValid: false,
      error: 'Nome deve conter pelo menos uma letra',
      suggestions: ['Digite um nome válido']
    };
  }

  if (!trimmedName.includes(' ')) {
    return {
      isValid: true,
      warning: 'Considere incluir o sobrenome',
      suggestions: ['Nome completo ajuda na identificação do paciente']
    };
  }

  return { isValid: true };
};

export const validateAge = (age: string | number): ValidationResult => {
  const ageStr = typeof age === 'number' ? age.toString() : age;

  if (!ageStr || !ageStr.trim()) {
    return {
      isValid: false,
      error: 'Idade é obrigatória',
      suggestions: ['Digite a idade do paciente']
    };
  }

  const ageNum = parseInt(ageStr.trim());

  if (isNaN(ageNum)) {
    return {
      isValid: false,
      error: 'Idade deve ser um número válido',
      suggestions: ['Digite apenas números']
    };
  }

  if (ageNum < 0) {
    return {
      isValid: false,
      error: 'Idade não pode ser negativa',
      suggestions: ['Digite uma idade válida']
    };
  }

  if (ageNum > 150) {
    return {
      isValid: false,
      error: 'Idade deve ser menor que 150 anos',
      suggestions: ['Verifique se a idade foi digitada corretamente']
    };
  }

  if (ageNum === 0) {
    return {
      isValid: true,
      warning: 'Paciente recém-nascido',
      suggestions: ['Confirme se a idade está correta']
    };
  }

  if (ageNum > 120) {
    return {
      isValid: true,
      warning: 'Idade muito avançada',
      suggestions: ['Confirme se a idade está correta']
    };
  }

  return { isValid: true };
};

export const validateGender = (gender: string): ValidationResult => {
  if (!gender || !gender.trim()) {
    return {
      isValid: false,
      error: 'Gênero é obrigatório',
      suggestions: ['Selecione uma opção de gênero']
    };
  }

  const validGenders = ['M', 'F', 'Other', 'MASCULINO', 'FEMININO', 'Masculino', 'Feminino'];
  if (!validGenders.includes(gender)) {
    return {
      isValid: false,
      error: 'Gênero inválido',
      suggestions: ['Selecione uma das opções disponíveis']
    };
  }

  return { isValid: true };
};

export const validatePlan = (plan: string): ValidationResult => {
  if (!plan || !plan.trim()) {
    return {
      isValid: false,
      error: 'Plano de saúde é obrigatório',
      suggestions: ['Digite o nome do plano de saúde']
    };
  }

  const trimmedPlan = plan.trim();

  if (trimmedPlan.length < 2) {
    return {
      isValid: false,
      error: 'Nome do plano deve ter pelo menos 2 caracteres',
      suggestions: ['Digite o nome completo do plano']
    };
  }

  if (trimmedPlan.length > 100) {
    return {
      isValid: false,
      error: 'Nome do plano deve ter no máximo 100 caracteres',
      suggestions: ['Use abreviações se necessário']
    };
  }

  if (!/^[a-zA-ZÀ-ÿ0-9\s\-_.()&]+$/.test(trimmedPlan)) {
    return {
      isValid: false,
      error: 'Nome do plano contém caracteres inválidos',
      suggestions: ['Use apenas letras, números e pontuação básica']
    };
  }

  return { isValid: true };
};

export const validatePatientForm = (formData: {
  name: string;
  cpf: string;
  age: string;
  gender: string;
  plan: string;
}): FormValidationResult => {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};
  const suggestions: Record<string, string[]> = {};

  const nameResult = validateName(formData.name);
  if (!nameResult.isValid && nameResult.error) {
    errors.name = nameResult.error;
  }
  if (nameResult.warning) {
    warnings.name = nameResult.warning;
  }
  if (nameResult.suggestions) {
    suggestions.name = nameResult.suggestions;
  }

  const cpfResult = validateCPF(formData.cpf);
  if (!cpfResult.isValid && cpfResult.error) {
    errors.cpf = cpfResult.error;
  }
  if (cpfResult.warning) {
    warnings.cpf = cpfResult.warning;
  }
  if (cpfResult.suggestions) {
    suggestions.cpf = cpfResult.suggestions;
  }

  const ageResult = validateAge(formData.age);
  if (!ageResult.isValid && ageResult.error) {
    errors.age = ageResult.error;
  }
  if (ageResult.warning) {
    warnings.age = ageResult.warning;
  }
  if (ageResult.suggestions) {
    suggestions.age = ageResult.suggestions;
  }

  const genderResult = validateGender(formData.gender);
  if (!genderResult.isValid && genderResult.error) {
    errors.gender = genderResult.error;
  }
  if (genderResult.warning) {
    warnings.gender = genderResult.warning;
  }
  if (genderResult.suggestions) {
    suggestions.gender = genderResult.suggestions;
  }

  const planResult = validatePlan(formData.plan);
  if (!planResult.isValid && planResult.error) {
    errors.plan = planResult.error;
  }
  if (planResult.warning) {
    warnings.plan = planResult.warning;
  }
  if (planResult.suggestions) {
    suggestions.plan = planResult.suggestions;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings: Object.keys(warnings).length > 0 ? warnings : undefined,
    suggestions: Object.keys(suggestions).length > 0 ? suggestions : undefined
  };
};

export const formatCPF = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length <= 11) {
    return cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return value;
};

export const cleanCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '');
};
