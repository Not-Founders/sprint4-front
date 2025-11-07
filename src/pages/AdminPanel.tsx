import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminHeader from '../components/AdminHeader';
import PatientList from '../components/PatientList';
import PatientForm from '../components/PatientForm';
import { PatientApi } from '../services/patientApi';
import { ErrorHandler, type ErrorContext } from '../utils/errorHandler';
import type { Patient, PatientRequest } from '../types/patient';

type ModalMode = 'create' | 'edit' | null;

interface Message {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  details?: string;
  suggestions?: string[];
  retryable?: boolean;
  technicalMessage?: string;
}

const AdminPanel: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // State management
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; patient?: Patient }>({ show: false });
  const [formServerError, setFormServerError] = useState<string | undefined>();
  const [formValidationErrors, setFormValidationErrors] = useState<Record<string, string[]> | undefined>();

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const showMessage = useCallback((
    type: 'success' | 'error' | 'warning' | 'info',
    text: string,
    details?: {
      technicalMessage?: string;
      suggestions?: string[];
      retryable?: boolean;
    }
  ) => {
    const message: Message = {
      type,
      text,
      details: details?.technicalMessage,
      suggestions: details?.suggestions,
      retryable: details?.retryable,
      technicalMessage: details?.technicalMessage
    };

    setMessage(message);

    const hideDelay = type === 'error' && (details?.suggestions || details?.technicalMessage) ? 10000 : 6000;
    setTimeout(() => setMessage(null), hideDelay);
  }, []);

  const handleApiError = useCallback((error: unknown, operation: string, context?: Record<string, unknown>) => {
    const errorContext: ErrorContext = {
      operation,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      networkStatus: navigator.onLine ? 'online' : 'offline',
      ...context
    };

    const userFriendlyError = ErrorHandler.handleApiError(error, errorContext);
    
    showMessage('error', userFriendlyError.message, {
      technicalMessage: userFriendlyError.technicalMessage,
      suggestions: userFriendlyError.suggestions,
      retryable: userFriendlyError.retryable
    });

    return userFriendlyError;
  }, [showMessage]);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    
    try {
      const response = await PatientApi.getAllPatients();
      
      if (response.success && response.data) {
        const validPatients = Array.isArray(response.data) 
          ? response.data.filter(patient => patient && typeof patient === 'object' && patient.name)
          : [];
        
        setPatients(validPatients);
      } else {
        const errorMessage = response.error || 'Failed to load patients';
        setError(errorMessage);

        handleApiError(
          { message: response.error, status: response.status },
          'fetch_patients',
          { responseDetails: response.details }
        );
      }
    } catch (err) {
      const errorMessage = 'Network error. Please check your connection.';
      setError(errorMessage);
      handleApiError(err, 'fetch_patients');
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleRefresh = () => {
    fetchPatients();
  };

  const handleCreatePatient = () => {
    setSelectedPatient(undefined);
    setModalMode('create');
    setFormServerError(undefined);
    setFormValidationErrors(undefined);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalMode('edit');
    setFormServerError(undefined);
    setFormValidationErrors(undefined);
  };

  const handleDeletePatient = (patientId: number) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setDeleteConfirm({ show: true, patient });
    }
  };

  const confirmDeletePatient = async () => {
    if (!deleteConfirm.patient) return;

    setFormLoading(true);
    
    try {
      const response = await PatientApi.deletePatient(deleteConfirm.patient.id);
      
      if (response.success) {
        showMessage('success', `Paciente ${deleteConfirm.patient.name} excluído com sucesso!`);
        await fetchPatients();
      } else {
        handleApiError(
          { message: response.error, status: response.status },
          'delete_patient',
          { 
            patientId: deleteConfirm.patient.id,
            patientName: deleteConfirm.patient.name,
            responseDetails: response.details
          }
        );
      }
    } catch (err) {
      handleApiError(err, 'delete_patient', {
        patientId: deleteConfirm.patient.id,
        patientName: deleteConfirm.patient.name
      });
    } finally {
      setFormLoading(false);
      setDeleteConfirm({ show: false });
    }
  };


  const cancelDeletePatient = () => {
    setDeleteConfirm({ show: false });
  };

  const handlePatientSubmit = async (patientData: PatientRequest) => {
    setFormLoading(true);
    
    const operation = modalMode === 'create' ? 'create_patient' : 'update_patient';
    const patientId = selectedPatient?.id;
    
    try {
      let response;
      
      if (modalMode === 'create') {
        response = await PatientApi.createPatient(patientData);
        if (response.success) {
          showMessage('success', 'Paciente cadastrado com sucesso!');
        }
      } else if (modalMode === 'edit' && selectedPatient) {
        response = await PatientApi.updatePatient(selectedPatient.id, patientData);
        if (response.success) {
          showMessage('success', 'Paciente atualizado com sucesso!');
        }
      }
      
      if (response?.success) {
        setModalMode(null);
        setSelectedPatient(undefined);
        setFormServerError(undefined);
        setFormValidationErrors(undefined);
        await fetchPatients(); 
      } else {
        if (response?.details?.validationErrors) {
          setFormValidationErrors(response.details.validationErrors);
          setFormServerError(undefined);
          
          showMessage('error', 'Dados inválidos. Verifique os campos destacados.', {
            suggestions: ['Corrija os campos com erro e tente novamente'],
            retryable: true
          });
        } else {
          setFormServerError(response?.error || 'Erro ao salvar paciente');
          setFormValidationErrors(undefined);
          
          handleApiError(
            { message: response?.error, status: response?.status },
            operation,
            { 
              patientName: patientData.name,
              patientId,
              responseDetails: response?.details
            }
          );
        }
      }
    } catch (err) {
      handleApiError(err, operation, {
        patientName: patientData.name,
        patientId
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handlePatientCancel = () => {
    setModalMode(null);
    setSelectedPatient(undefined);
    setFormServerError(undefined);
    setFormValidationErrors(undefined);
  };

  const handleReturnToUser = () => {
    navigate('/');
  };

  if (!isAuthenticated() || !isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <AdminHeader onReturnToUser={handleReturnToUser} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Gerenciamento de Pacientes
              </h1>
              <p className="text-slate-600">
                Gerencie os pacientes cadastrados no sistema
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Atualizar lista de pacientes"
              >
                <svg 
                  className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Atualizar
              </button>

              {/* Create Patient Button */}
              <button
                onClick={handleCreatePatient}
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Novo Paciente
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Success/Error Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : message.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
              : message.type === 'info'
              ? 'bg-blue-50 border-blue-200 text-blue-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-start">
              <svg 
                className={`w-5 h-5 mr-3 mt-0.5 shrink-0 ${
                  message.type === 'success' ? 'text-green-600' 
                  : message.type === 'warning' ? 'text-yellow-600'
                  : message.type === 'info' ? 'text-blue-600'
                  : 'text-red-600'
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                {message.type === 'success' ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                ) : message.type === 'warning' ? (
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                ) : message.type === 'info' ? (
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                )}
              </svg>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{message.text}</p>
                    
                    {/* Technical details for administrators */}
                    {message.details && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm opacity-75 hover:opacity-100">
                          Detalhes técnicos
                        </summary>
                        <p className="mt-1 text-sm font-mono bg-black bg-opacity-10 p-2 rounded">
                          {message.details}
                        </p>
                      </details>
                    )}
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Sugestões:</p>
                        <ul className="text-sm space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Retry indicator */}
                    {message.retryable && (
                      <div className="mt-2 flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="opacity-75">Esta operação pode ser tentada novamente</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setMessage(null)}
                    className="ml-4 text-current hover:opacity-75 shrink-0"
                    title="Fechar mensagem"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* Patient List */}
        <PatientList
          patients={patients}
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
          loading={loading}
          error={error}
        />
      </div>

      {/* Patient Form Modal */}
      {modalMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <PatientForm
              patient={selectedPatient}
              onSubmit={handlePatientSubmit}
              onCancel={handlePatientCancel}
              loading={formLoading}
              mode={modalMode}
              serverValidationErrors={formValidationErrors}
              serverError={formServerError}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && deleteConfirm.patient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Confirmar Exclusão</h3>
                  <p className="text-sm text-slate-600">Esta ação não pode ser desfeita</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="mb-6">
                <p className="text-slate-700">
                  Tem certeza que deseja excluir o paciente{' '}
                  <span className="font-semibold">{deleteConfirm.patient.name}</span>?
                </p>
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600">
                    <div><strong>CPF:</strong> {deleteConfirm.patient.cpf}</div>
                    <div><strong>Idade:</strong> {deleteConfirm.patient.age} anos</div>
                    <div><strong>Plano:</strong> {deleteConfirm.patient.plan}</div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={cancelDeletePatient}
                  disabled={formLoading}
                  className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 border border-slate-300 rounded-lg font-medium hover:bg-slate-200 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeletePatient}
                  disabled={formLoading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {formLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Confirmar Exclusão
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;