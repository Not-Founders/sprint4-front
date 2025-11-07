import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaFlask, FaXRay, FaHeartbeat, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Exam {
  name: string;
  description: string;
  preparation: string;
  icon: React.ReactNode;
  category: string;
  duration: string;
}

const exams: Exam[] = [
  { 
    name: 'Hemograma Completo', 
    description: 'Avalia a saúde geral e detecta uma ampla gama de distúrbios, incluindo anemia, infecção e leucemia. Este exame analisa os componentes do sangue como glóbulos vermelhos, brancos e plaquetas.', 
    preparation: 'Jejum de 4 horas recomendado. Evite exercícios físicos intensos 24h antes.',
    icon: <FaFlask className="text-2xl text-blue-600" />,
    category: 'Sangue',
    duration: '15 min'
  },
  { 
    name: 'Glicemia de Jejum', 
    description: 'Mede o nível de açúcar no sangue em jejum. Usado para diagnosticar e monitorar diabetes mellitus tipo 1 e 2, além de pré-diabetes.', 
    preparation: 'Jejum obrigatório de 8 a 12 horas. Apenas água é permitida durante o período de jejum.',
    icon: <FaFlask className="text-2xl text-blue-600" />,
    category: 'Sangue',
    duration: '10 min'
  },
  { 
    name: 'Colesterol Total e Frações', 
    description: 'Avalia os níveis de gordura no sangue, incluindo HDL (bom colesterol), LDL (mau colesterol) e triglicerídeos, para verificar o risco de doenças cardiovasculares.', 
    preparation: 'Jejum de 12 horas recomendado. Evite bebidas alcoólicas 72h antes do exame.',
    icon: <FaHeartbeat className="text-2xl text-blue-600" />,
    category: 'Sangue',
    duration: '15 min'
  },
  { 
    name: 'Raio-X de Tórax', 
    description: 'Imagem radiológica do tórax que mostra o coração, pulmões, vias aéreas, vasos sanguíneos e ossos da coluna e do tórax. Útil para detectar pneumonia, fraturas e outras condições.', 
    preparation: 'Remover joias, objetos de metal e roupas com botões ou zíperes. Informar sobre possível gravidez.',
    icon: <FaXRay className="text-2xl text-blue-600" />,
    category: 'Imagem',
    duration: '20 min'
  },
  { 
    name: 'Ultrassom Abdominal', 
    description: 'Exame de imagem que avalia órgãos abdominais como fígado, vesícula, pâncreas, rins e baço. Detecta cálculos, cistos, tumores e outras alterações.', 
    preparation: 'Jejum de 8 horas. Beber 4 copos de água 1 hora antes do exame e não urinar.',
    icon: <FaEye className="text-2xl text-blue-600" />,
    category: 'Imagem',
    duration: '30 min'
  },
];

const ExamItem: React.FC<{ exam: Exam; isOpen: boolean; onClick: () => void; index: number }> = ({ exam, isOpen, onClick, index }) => {
  return (
    <div className={`glass rounded-2xl shadow-lg hover-lift transition-all duration-300 animate-fade-in-up`} style={{animationDelay: `${0.1 * index}s`}}>
      <button onClick={onClick} className="w-full flex justify-between items-center text-left p-6 focus:outline-none">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            {exam.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800">{exam.name}</h3>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-sm text-blue-600 font-medium">{exam.category}</span>
              <span className="text-sm text-slate-500">⏱️ {exam.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link 
            to="/agendar-exame"
            className="btn-modern bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 mr-2"
            onClick={(e) => e.stopPropagation()}
          >
            Agendar
          </Link>
          {isOpen ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-slate-500" />}
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-slate-600 space-y-4 border-t border-slate-200 pt-4 animate-fade-in-up">
          <div>
            <h4 className="font-semibold text-slate-700 mb-2">📋 Descrição:</h4>
            <p className="leading-relaxed">{exam.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-2">⚠️ Preparo necessário:</h4>
            <p className="leading-relaxed">{exam.preparation}</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="text-sm text-slate-500">
              💡 Dúvidas sobre o preparo? Entre em contato conosco.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Exames: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = ['all', 'Sangue', 'Imagem'];
  const filteredExams = selectedCategory === 'all' 
    ? exams 
    : exams.filter(exam => exam.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* "HEADER" */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
            🔬 Exames Laboratoriais
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Exames</span> com
            <br />
            <span className="text-slate-800">Precisão</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Realizamos exames com equipamentos de última geração e profissionais altamente qualificados. Confira nossa lista completa e as instruções de preparo.
          </p>
        </div>

        {/* Filtro */}
        <div className="flex justify-center mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="glass rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {category === 'all' ? 'Todos os Exames' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista exames */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredExams.map((exam, index) => (
            <ExamItem
              key={exam.name}
              exam={exam}
              isOpen={openIndex === index}
              onClick={() => handleItemClick(index)}
              index={index}
            />
          ))}
        </div>

        {/* Ajuda */}
        <div className="text-center mt-20 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Precisa de ajuda para escolher o exame?
            </h2>
            <p className="text-slate-600 mb-6">
              Nossa equipe está pronta para orientá-lo sobre qual exame é mais adequado para seu caso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contato"
                className="btn-modern bg-white text-blue-600 hover:text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                💬 Falar com Especialista
              </Link>
              <Link 
                to="/agendar-exame"
                className="btn-modern bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                🩺 Agendar Exame
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exames;
