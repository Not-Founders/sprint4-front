import React from 'react';
import type { Patient } from '../types/patient';

interface PatientListProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (id: number) => void;
  loading: boolean;
  error?: string;
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  onEdit,
  onDelete,
  loading,
  error
}) => {
  // Loading state display
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-600 font-medium">Carregando pacientes...</p>
        </div>
      </div>
    );
  }

  // Error state display
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar pacientes</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state display
  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Nenhum paciente encontrado</h3>
            <p className="text-slate-500">Não há pacientes cadastrados no sistema.</p>
          </div>
        </div>
      </div>
    );
  }

  // Main table display
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Table Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-slate-800">Lista de Pacientes</h2>
        <p className="text-sm text-slate-600 mt-1">
          {patients.length} paciente{patients.length !== 1 ? 's' : ''} encontrado{patients.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                Nome
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                CPF
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                Idade
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                Gênero
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                Plano
              </th>
              <th className="text-center py-4 px-6 font-semibold text-slate-700 text-sm uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {patients.map((patient, index) => (
              <tr 
                key={patient.id} 
                className={`hover:bg-slate-50 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                }`}
              >
                <td className="py-4 px-6">
                  <div className="font-medium text-slate-900">{patient.name}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-slate-700 font-mono text-sm">{patient.cpf}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-slate-700">{patient.age} anos</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-slate-700">{patient.gender}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-slate-700">{patient.plan}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center space-x-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(patient)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                      title={`Editar ${patient.name}`}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => onDelete(patient.id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                      title={`Excluir ${patient.name}`}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;