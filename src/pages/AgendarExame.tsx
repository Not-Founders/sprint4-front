import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExameApi } from '../services/exameApi';
import type { ExameRequest } from '../types/exame';

const AgendarExame: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [pacienteId, setPacienteId] = useState('');
  const [tipoExame, setTipoExame] = useState('');
  const [dataExame, setDataExame] = useState('');
  const [horaExame, setHoraExame] = useState('');
  const [resultado, setResultado] = useState('');

  const tiposExame = [
    'Hemograma Completo',
    'Glicemia',
    'Colesterol Total',
    'Triglicerídeos',
    'Ureia e Creatinina',
    'TSH e T4 Livre',
    'Raio-X',
    'Ultrassonografia',
    'Tomografia',
    'Ressonância Magnética',
    'Eletrocardiograma',
    'Ecocardiograma'
  ];

  const horarios = [
    '0700', '0730', '0800', '0830', '0900', '0930',
    '1000', '1030', '1100', '1130', '1400', '1430',
    '1500', '1530', '1600', '1630'
  ];

  const convertDateToInt = (dateStr: string): number => {
    // Converte "2024-11-07" para 20241107
    return parseInt(dateStr.replace(/-/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData: ExameRequest = {
        tipoExame,
        dataExame: convertDateToInt(dataExame),
        horaExame: parseInt(horaExame),
        resultado: resultado || 'Pendente',
        paciente: {
          id: parseInt(pacienteId)
        }
      };

      const response = await ExameApi.createExame(formData);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/exames');
        }, 2000);
      } else {
        setError(response.error || 'Erro ao agendar exame');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Agendar <span className="text-blue-600">Exame</span>
            </h1>
            <p className="text-slate-600">Preencha os dados para agendar seu exame laboratorial</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✓ Exame agendado com sucesso! Redirecionando...
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                ID do Paciente
              </label>
              <input
                type="number"
                value={pacienteId}
                onChange={(e) => {
                  setPacienteId(e.target.value);
                  setError(null);
                }}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o ID do paciente"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tipo de Exame
              </label>
              <select
                value={tipoExame}
                onChange={(e) => {
                  setTipoExame(e.target.value);
                  setError(null);
                }}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione o tipo de exame</option>
                {tiposExame.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Data do Exame
              </label>
              <input
                type="date"
                value={dataExame}
                onChange={(e) => {
                  setDataExame(e.target.value);
                  setError(null);
                }}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                Formato: AAAAMMDD (ex: 20241107)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Horário
              </label>
              <select
                value={horaExame}
                onChange={(e) => {
                  setHoraExame(e.target.value);
                  setError(null);
                }}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um horário</option>
                {horarios.map(h => (
                  <option key={h} value={h}>
                    {h.substring(0, 2)}:{h.substring(2, 4)}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1">
                Formato: HHMM (ex: 0830 = 08:30)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Resultado (Opcional)
              </label>
              <input
                type="text"
                value={resultado}
                onChange={(e) => {
                  setResultado(e.target.value);
                  setError(null);
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Deixe em branco se ainda não houver resultado"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/exames')}
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Agendando...' : 'Agendar Exame'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgendarExame;
