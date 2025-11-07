import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6 animate-fade-in-up">
            <Link to="/" className="inline-block group">
              <div className="flex items-center space-x-3">
                <img
                  src="/hc.png"
                  alt="HC"
                  className="h-12 group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <div className="text-2xl font-bold text-white">
                    Hospital das <span className="text-blue-400">Clínicas</span>
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Cuidando da sua saúde com tecnologia de ponta, humanidade e
              excelência médica há mais de 50 anos.
            </p>
          </div>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h3 className="font-bold text-white mb-6 text-lg">Navegação</h3>
            <ul className="space-y-3">
              {[
                { to: "/consultas", label: "Consultas", icon: "🩺" },
                { to: "/exames", label: "Exames", icon: "🔬" },
                { to: "/integrantes", label: "Integrantes", icon: "👥" },
                { to: "/sobre", label: "Sobre Nós", icon: "🏥" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center space-x-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="font-bold text-white mb-6 text-lg">
              Ajuda & Suporte
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/faq", label: "FAQ", icon: "❓" },
                { to: "/contato", label: "Contato", icon: "📞" },
                { to: "#", label: "Termos de Serviço", icon: "📋" },
                { to: "#", label: "Política de Privacidade", icon: "🔒" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center space-x-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="font-bold text-white mb-6 text-lg">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center mt-1 group-hover:bg-blue-600 transition-colors duration-300">
                  <span className="text-sm">📍</span>
                </div>
                <div className="text-slate-400">
                  <div className="font-medium text-white">Endereço</div>
                  <div className="text-sm">
                    Av. Dr. Enéas de Carvalho Aguiar, 255
                  </div>
                  <div className="text-sm">São Paulo, SP - CEP: 05403-000</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                  <span className="text-sm">📞</span>
                </div>
                <div className="text-slate-400">
                  <div className="font-medium text-white">Telefone</div>
                  <div className="text-sm">(11) 2661-0000</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300">
                  <span className="text-sm">✉️</span>
                </div>
                <div className="text-slate-400">
                  <div className="font-medium text-white">Email</div>
                  <div className="text-sm">contato@hc.com.br</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-bold text-white mb-4">
              Receba nossas novidades
            </h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>
              &copy; {new Date().getFullYear()} Hospital das Clínicas. Todos os
              direitos reservados.
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <span>Desenvolvido com ❤️ para sua saúde</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
