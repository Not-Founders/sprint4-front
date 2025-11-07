import React, { useState } from 'react';
import { FaStethoscope, FaHeartbeat, FaBrain, FaBone, FaBaby, FaEye, FaUserMd, FaTooth } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { type IconType } from 'react-icons';

interface Specialty {
  name: string;
  description: string;
  icon: IconType;
  color: string;
  gradient: string;
  available: number;
  nextAvailable: string;
}

const specialties: Specialty[] = [
  { 
    name: 'Clínica Geral', 
    description: 'Atendimento primário e cuidados contínuos para sua saúde geral com médicos experientes.', 
    icon: FaStethoscope,
    color: 'blue',
    gradient: 'bg-blue-600',
    available: 12,
    nextAvailable: 'Hoje às 14:30'
  },
  { 
    name: 'Cardiologia', 
    description: 'Cuidados especializados para o coração e sistema circulatório com tecnologia avançada.', 
    icon: FaHeartbeat,
    color: 'blue',
    gradient: 'bg-blue-500',
    available: 8,
    nextAvailable: 'Amanhã às 09:00'
  },
  { 
    name: 'Neurologia', 
    description: 'Diagnóstico e tratamento de doenças do sistema nervoso com equipamentos de ponta.', 
    icon: FaBrain,
    color: 'blue',
    gradient: 'bg-blue-700',
    available: 5,
    nextAvailable: 'Amanhã às 15:45'
  },
  { 
    name: 'Ortopedia', 
    description: 'Tratamento de lesões e doenças do sistema musculoesquelético com técnicas modernas.', 
    icon: FaBone,
    color: 'blue',
    gradient: 'bg-blue-600',
    available: 7,
    nextAvailable: 'Hoje às 16:20'
  },
  { 
    name: 'Pediatria', 
    description: 'Cuidado completo e especializado para a saúde de bebês, crianças e adolescentes.', 
    icon: FaBaby,
    color: 'blue',
    gradient: 'bg-blue-500',
    available: 10,
    nextAvailable: 'Hoje às 11:15'
  },
  { 
    name: 'Oftalmologia', 
    description: 'Cuidados especializados para os olhos e sistema visual com tecnologia de última geração.', 
    icon: FaEye,
    color: 'blue',
    gradient: 'bg-blue-700',
    available: 6,
    nextAvailable: 'Amanhã às 10:30'
  },
  { 
    name: 'Dermatologia', 
    description: 'Tratamento especializado para pele, cabelos e unhas com procedimentos modernos.', 
    icon: FaUserMd,
    color: 'blue',
    gradient: 'bg-blue-600',
    available: 4,
    nextAvailable: 'Amanhã às 13:00'
  },
  { 
    name: 'Odontologia', 
    description: 'Cuidados completos para sua saúde bucal com equipamentos de última geração.', 
    icon: FaTooth,
    color: 'blue',
    gradient: 'bg-blue-500',
    available: 9,
    nextAvailable: 'Hoje às 17:00'
  },
];

const Consultas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredSpecialties = specialties.filter(specialty => {
    const matchesSearch = specialty.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'available-today' && specialty.nextAvailable.includes('Hoje')) ||
      (selectedFilter === 'high-availability' && specialty.available >= 8);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* "HEADER" */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
            🩺 Agendamento Online
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Agende</span> sua
            <br />
            <span className="text-slate-800">Consulta</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Encontre o especialista ideal para suas necessidades. Nossos médicos estão prontos para oferecer o melhor atendimento com tecnologia de ponta.
          </p>
        </div>

        {/* Procurar */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="glass rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Buscar por especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-6 py-4 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">Todas as especialidades</option>
                <option value="available-today">Disponível hoje</option>
                <option value="high-availability">Alta disponibilidade</option>
              </select>
            </div>
          </div>
        </div>

        {/* Especialidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredSpecialties.map((specialty, index) => (
            <div 
              key={specialty.name} 
              className="group glass rounded-2xl p-6 shadow-xl hover-lift transition-all duration-300 animate-fade-in-up"
              style={{animationDelay: `${0.1 * (index + 1)}s`}}
            >
              {/* Icon and Availability Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 ${specialty.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <specialty.icon className="text-2xl text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 mb-1">Disponível</div>
                  <div className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {specialty.available} horários
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {specialty.name}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                {specialty.description}
              </p>
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Próximo disponível:</div>
                <div className="text-sm font-semibold text-slate-700">{specialty.nextAvailable}</div>
              </div>
              <Link 
                to="/agendar-consulta"
                className="btn-modern w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center block"
              >
                Agendar Consulta
              </Link>
            </div>
          ))}
        </div>

        {/* Sem resultados */}
        {filteredSpecialties.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Nenhuma especialidade encontrada</h3>
            <p className="text-slate-500 text-lg mb-6">
              Não encontramos especialidades para "{searchTerm}" com os filtros selecionados.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="btn-modern bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Infos */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="bg-blue-200 text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">50+</div>
            <div className="text-slate-600 text-sm">Especialistas</div>
          </div>
          <div className="bg-blue-100 text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-slate-600 text-sm">Atendimento</div>
          </div>
          <div className="bg-blue-200 text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">15min</div>
            <div className="text-slate-600 text-sm">Agendamento</div>
          </div>
          <div className="bg-blue-100 text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">98%</div>
            <div className="text-slate-600 text-sm">Satisfação</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultas;
