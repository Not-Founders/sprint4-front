import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface FaqItemData {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItemData[] = [
  { 
    question: 'Como posso agendar uma consulta?', 
    answer: 'Você pode agendar uma consulta de várias formas: através da nossa página de "Consultas" online, ligando para (11) 2661-0000, ou presencialmente na recepção. Selecione a especialidade desejada e escolha o horário mais conveniente para você.',
    category: 'Agendamento'
  },
  { 
    question: 'Quais convênios médicos vocês aceitam?', 
    answer: 'Aceitamos uma ampla variedade de convênios médicos. Alguns exemplos: Allianz Saúde, Amil, Bradesco Saúde, Golden Cross, SulAmérica, Unimed, Porto Seguro Saúde, entre outros. Para confirmar se seu convênio é aceito, entre em contato conosco ou consulte nossa lista completa no site.',
    category: 'Convênios'
  },
  { 
    question: 'Preciso de jejum para fazer exames de sangue?', 
    answer: 'Depende do tipo de exame. Exames como Glicemia de Jejum e Colesterol Total exigem jejum de 8-12 horas. Já o Hemograma Completo não requer jejum. Sempre verifique as instruções específicas na página de "Exames" ou consulte nossa equipe.',
    category: 'Exames'
  },
  { 
    question: 'Qual o horário de funcionamento?', 
    answer: 'Nossos horários são: Ambulatórios de 7h às 18h (segunda a sexta), Emergência 24 horas por dia (todos os dias), Visitas aos pacientes internados das 14h às 17h (máximo 2 pessoas maiores de 18 anos). Aos finais de semana, funcionamento reduzido.',
    category: 'Funcionamento'
  },
  { 
    question: 'Como obter resultados de exames?', 
    answer: 'Os resultados ficam disponíveis em nosso portal online, onde você pode acessar com seu CPF e data de nascimento. Também enviamos por email quando solicitado. Exames urgentes são entregues no mesmo dia, outros em 24-48 horas úteis.',
    category: 'Exames'
  },
  { 
    question: 'Posso remarcar ou cancelar uma consulta?', 
    answer: 'Sim! Você pode remarcar ou cancelar consultas até 24 horas antes do horário agendado. Isso pode ser feito pelo telefone (11) 2661-0000, pelo site ou presencialmente. Cancelamentos em cima da hora podem gerar taxa.',
    category: 'Agendamento'
  },
  { 
    question: 'Vocês atendem emergências?', 
    answer: 'Sim, temos pronto-socorro 24 horas para emergências médicas. Nossa equipe está preparada para atender casos urgentes com equipamentos modernos e profissionais especializados em medicina de emergência.',
    category: 'Emergência'
  },
  { 
    question: 'Como funciona o atendimento particular?', 
    answer: 'Oferecemos atendimento particular com valores diferenciados. Os pagamentos podem ser feitos em dinheiro, cartão ou PIX. Consulte nossa tabela de preços na recepção ou pelo telefone. Pacientes particulares têm prioridade no agendamento.',
    category: 'Pagamento'
  }
];

const FaqItem: React.FC<{ faq: FaqItemData; isOpen: boolean; onClick: () => void; index: number }> = ({ faq, isOpen, onClick, index }) => {
  return (
    <div className={`glass rounded-2xl shadow-lg hover-lift transition-all duration-300 animate-fade-in-up`} style={{animationDelay: `${0.1 * index}s`}}>
      <button onClick={onClick} className="w-full flex justify-between items-center text-left p-6 focus:outline-none">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mt-1">
            <FaQuestionCircle className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{faq.question}</h3>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {faq.category}
            </span>
          </div>
        </div>
        <div className="ml-4">
          {isOpen ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-slate-500" />}
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-slate-600 border-t border-slate-200 pt-4 animate-fade-in-up">
          <p className="leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = ['all', 'Agendamento', 'Convênios', 'Exames', 'Funcionamento', 'Emergência', 'Pagamento'];
  
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
            ❓ Perguntas Frequentes
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Dúvidas</span>
            <br />
            <span className="text-slate-800">Frequentes</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Encontre respostas rápidas para as perguntas mais comuns dos nossos pacientes. Se não encontrar o que procura, entre em contato conosco.
          </p>
        </div>

        {/* Filtro e Pesquisa */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="glass rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Buscar por pergunta ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="h-6 w-6 text-slate-400" />
                </div>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas as categorias' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredFaqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleItemClick(index)}
              index={index}
            />
          ))}
        </div>

        {/* Sem resultados */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaQuestionCircle className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Nenhuma pergunta encontrada</h3>
            <p className="text-slate-500 text-lg mb-6">
              Não encontramos perguntas que correspondam à sua busca.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-modern bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Duvidas */}
        <div className="text-center mt-20 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Não encontrou sua resposta?
            </h2>
            <p className="text-slate-600 mb-6">
              Nossa equipe está pronta para esclarecer todas as suas dúvidas pessoalmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contato"
                className="btn-modern bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                💬 Falar Conosco
              </Link>
              <a 
                href="tel:1126610000"
                className="btn-modern bg-white text-blue-600 hover:text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                📞 Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
