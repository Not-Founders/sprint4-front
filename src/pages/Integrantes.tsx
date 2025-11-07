import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaCode, FaGraduationCap } from "react-icons/fa";

interface StaffMember {
  id: number;
  name: string;
  specialty: string;
  image: string;
  linkedin: string;
  github: string;
  role: string;
  skills: string[];
}

const Integrantes: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStaff([
        {
          id: 1,
          name: "João Victor Veronesi",
          specialty: "1TDSPI",
          role: "Desenvolvedor Full Stack",
          image: "/joao.jpg",
          github: "https://github.com/Veronesi30",
          linkedin:
            "https://www.linkedin.com/in/jo%C3%A3o-victor-veronesi-734897276/",
          skills: [ "Data Base", "Java", "Python", "CSS"],
        },
        {
          id: 2,
          name: "Leonardo Herrera Sabbatini",
          specialty: "1TDSPI",
          role: "Desenvolvedor Backend",
          image: "/leonardo.jpg",
          github: "https://github.com/LeoSabbatini",
          linkedin: "https://www.linkedin.com/in/devsabbatini/",
          skills: ["Python", "Java", "CSS", "UI/UX"],
        },
        {
          id: 3,
          name: "Rafael de Freitas Moraes",
          specialty: "1TDSPI",
          role: "Desenvolvedor Frontend",
          image: "/rafael.jpg",
          github: "https://github.com/devfreitas",
          linkedin: "https://www.linkedin.com/in/rafael-freitas-9345492b5/",
          skills: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-800 mb-4">
              Conheça a Equipe
            </h1>
            <p className="text-slate-600 text-xl">Carregando integrantes...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="glass rounded-2xl shadow-xl overflow-hidden animate-pulse"
              >
                <div className="h-32 bg-blue-200 rounded-t-2xl"></div>
                <div className="relative -mt-16 flex justify-center">
                  <div className="w-32 h-32 bg-slate-300 rounded-full border-4 border-white"></div>
                </div>
                <div className="p-8 text-center">
                  <div className="h-6 bg-slate-200 rounded-md w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-1/2 mx-auto mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-1/4 mx-auto mb-6"></div>
                  <div className="flex justify-center space-x-4">
                    <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
                    <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div
        className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* "HEADER" */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
            👥 Nossa Equipe
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Conheça</span> a
            <br />
            <span className="text-slate-800">Equipe</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Os desenvolvedores talentosos por trás deste projeto. Estudantes
            dedicados da FIAP, apaixonados por tecnologia e inovação na área da
            saúde.
          </p>
        </div>

        {/* Integrantes */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">3</div>
            <div className="text-slate-600 text-sm">Desenvolvedores</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">1TDSPI</div>
            <div className="text-slate-600 text-sm">Turma FIAP</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">100%</div>
            <div className="text-slate-600 text-sm">Dedicação</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">2025</div>
            <div className="text-slate-600 text-sm">Projeto</div>
          </div>
        </div>

        {/* Membros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {staff.map((member, index) => (
            <div
              key={member.id}
              className="glass rounded-2xl shadow-xl text-center hover-lift animate-fade-in-up"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4">
                  <FaGraduationCap className="text-white/80 text-xl" />
                </div>
              </div>
              <div className="relative -mt-16 mb-4">
                <div className="relative inline-block">
                  <img
                    className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-white shadow-lg"
                    src={member.image}
                    alt={`Foto de perfil de ${member.name}`}
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                    <FaCode className="text-white text-sm" />
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  {member.role}
                </p>
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {member.specialty}
                </div>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Tecnologias:
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modern flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <FaLinkedin className="text-sm" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modern flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <FaGithub className="text-sm" />
                    <span className="text-sm">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Projeto */}
        <div
          className="text-center mt-20 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Sobre o <span className="gradient-text">Projeto</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Este projeto foi desenvolvido como parte do curso de Tecnologia em
              Desenvolvimento de Sistemas para Internet da FIAP. Nosso objetivo
              é criar uma plataforma moderna e intuitiva para agendamento de
              consultas e exames médicos, aplicando as melhores práticas de
              desenvolvimento web e design de interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrantes;
