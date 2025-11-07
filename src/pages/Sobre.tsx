import React from "react";
import { FaHeartbeat, FaEye, FaUsers, FaAward, FaGraduationCap, FaFlask } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sobre: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      
      {/* Hero */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              🏥 Sobre Nós
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Hospital das</span>
              <br />
              <span className="text-slate-800">Clínicas</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Referência em excelência médica há mais de 15 anos, combinamos tradição, inovação e humanização no cuidado à saúde. Nosso compromisso é oferecer o melhor atendimento com tecnologia de ponta e profissionais altamente qualificados.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl shadow-xl hover-lift text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FaHeartbeat className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Nossa Missão</h2>
              <p className="text-slate-600 leading-relaxed">
                Promover a saúde da população através de um tripé integrado: oferecer atendimento médico de alta complexidade, formar profissionais de saúde qualificados e gerar conhecimento científico inovador para o avanço da medicina.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl shadow-xl hover-lift text-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FaEye className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Nossa Visão</h2>
              <p className="text-slate-600 leading-relaxed">
                Ser reconhecido como um complexo hospitalar líder e referência de excelência nacional e internacional, destacando-se pela qualidade do atendimento, inovação e contribuição para a ciência e sociedade.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl shadow-xl hover-lift text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Nossos Valores</h2>
              <p className="text-slate-600 leading-relaxed">
                Integridade, transparência e respeito em todas as relações. Priorizamos o acolhimento, a dignidade humana e a responsabilidade social, buscando sempre a excelência e inovação no cuidado à saúde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos pilares */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Nossos <span className="gradient-text">Pilares</span>
            </h2>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto">
              Três atividades principais que sustentam nossa excelência e compromisso com a sociedade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl shadow-xl hover-lift animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <FaAward className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Assistência Médica</h3>
              <p className="text-slate-600 leading-relaxed">
                Atendimento médico de alta complexidade e excelência, oferecendo cuidados especializados com tecnologia de ponta e equipe multidisciplinar qualificada.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl shadow-xl hover-lift animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FaGraduationCap className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Ensino e Formação</h3>
              <p className="text-slate-600 leading-relaxed">
                Campo de aprendizado para estudantes da USP e outras instituições, formando e capacitando novos profissionais de saúde com excelência acadêmica.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl shadow-xl hover-lift animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="w-16 h-16 bg-blue-700 rounded-xl flex items-center justify-center mb-6">
                <FaFlask className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Pesquisa e Inovação</h3>
              <p className="text-slate-600 leading-relaxed">
                Geração e difusão de conhecimento científico, desenvolvendo pesquisas inovadoras que buscam novas curas, tratamentos e avanços na medicina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-20 bg-blue-600 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Nossos Números</h2>
            <p className="text-blue-100 text-xl">Dados que refletem nosso compromisso com a excelência</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-blue-100">Pacientes Atendidos</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Médicos Especialistas</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Anos de Experiência</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfação dos Pacientes</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Pronto para cuidar da sua <span className="gradient-text">saúde</span>?
            </h2>
            <p className="text-slate-600 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Nossa equipe está preparada para recebê-lo com o melhor atendimento. Agende sua consulta hoje mesmo e dê o primeiro passo para uma vida mais saudável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultas"
                className="btn-modern bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                🩺 Agendar Consulta
              </Link>
              <Link
                to="/contato"
                className="btn-modern bg-white text-blue-600 hover:text-blue-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                💬 Falar Conosco
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
