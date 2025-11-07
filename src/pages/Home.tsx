import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float [animation-delay:2s]"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float [animation-delay:4s]"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row items-center relative z-10">
          <div className="lg:w-1/2 text-center lg:text-left animate-fade-in-left">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              ✨ Cuidado de excelência para você
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Sua saúde
              </span>
              <br />
              <span className="text-slate-800">em primeiro lugar,</span>
              <br />
              <span className="text-slate-600">sempre.</span>
            </h1>
            <p className="text-slate-600 text-xl mb-8 leading-relaxed max-w-lg">
              Agende suas consultas e exames de forma rápida, fácil e segura.
              Tenha acesso aos melhores profissionais de saúde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/consultas"
                className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
              >
                🩺 Agendar Consulta
              </Link>
              <Link
                to="/exames"
                className="relative overflow-hidden bg-white text-blue-600 hover:text-blue-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-blue-100/50 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
              >
                🔬 Agendar Exame
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center animate-fade-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-400 rounded-2xl blur opacity-20 animate-pulse-soft"></div>
              <img
                src="/entrada.webp"
                alt="Médica sorrindo com tablet"
                className="relative max-w-lg w-full h-auto rounded-2xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Nossos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Serviços
              </span>
            </h2>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Oferecemos uma gama completa de serviços médicos com tecnologia de
              ponta e profissionais altamente qualificados para garantir o seu
              bem-estar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-blue animate-fade-in-up [animation-delay:0.2s]">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/consultas.png"
                    alt="Consultas"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Consultas Médicas
                </h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Agende consultas com especialistas de diversas áreas médicas,
                todos prontos para oferecer atendimento de excelência e cuidado
                personalizado.
              </p>
              <Link
                to="/consultas"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
              >
                Agendar agora
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-blue animate-fade-in-up [animation-delay:0.4s]">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/exames.png"
                    alt="Exames"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Exames Laboratoriais
                </h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Realize seus exames em laboratórios parceiros equipados com
                tecnologia de ponta, garantindo resultados precisos e rápidos.
              </p>
              <Link
                to="/exames"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
              >
                Agendar exame
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up [animation-delay:0.1s]">
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-blue-100">Pacientes Atendidos</div>
            </div>
            <div className="animate-fade-in-up [animation-delay:0.2s]">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Médicos Especialistas</div>
            </div>
            <div className="animate-fade-in-up [animation-delay:0.3s]">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Anos de Experiência</div>
            </div>
            <div className="animate-fade-in-up [animation-delay:0.4s]">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Atendimento</div>
            </div>
          </div>
        </div>
      </section>

      {/* Localização*/}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Nossa{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Localização
              </span>
            </h2>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Estamos estrategicamente localizados no coração de São Paulo, com
              fácil acesso por transporte público e amplo estacionamento para
              sua comodidade.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue animate-fade-in-up [animation-delay:0.2s]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7314.592629757024!2d-46.66986!3d-23.557799!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b00d3aa487%3A0xfe715b43e354f823!2sHospital%20das%20Cl%C3%ADnicas%20FMUSP!5e0!3m2!1spt-BR!2sbr!4v1757284203851!5m2!1spt-BR!2sbr"
                className="w-full h-[500px] border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue animate-fade-in-up [animation-delay:0.3s]">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Endereço</h3>
                <p className="text-slate-600 text-sm">
                  Av. Dr. Enéas de Carvalho Aguiar, 255
                  <br />
                  São Paulo, SP
                </p>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue animate-fade-in-up [animation-delay:0.4s]">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Telefone</h3>
                <p className="text-slate-600 text-sm">(11) 2661-0000</p>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue animate-fade-in-up [animation-delay:0.5s]">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🕒</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Horário</h3>
                <p className="text-slate-600 text-sm">
                  24 horas por dia
                  <br />7 dias por semana
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
