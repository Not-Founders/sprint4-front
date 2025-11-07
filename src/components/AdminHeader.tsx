import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface AdminHeaderProps {
  onReturnToUser?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onReturnToUser }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleReturnToUser = (): void => {
    logout();
    
    if (onReturnToUser) {
      onReturnToUser();
    }
    
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <NavLink to="/admin" className="flex items-center space-x-2 group">
            <img 
              src="/hc.png" 
              alt="HC" 
              className="h-12 transition-transform duration-300 group-hover:scale-110" 
            />
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Hospital das Clínicas
              </span>
              <div className="text-sm text-slate-600 font-medium">
                Painel Administrativo
              </div>
            </div>
          </NavLink>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/admin" 
            className={({ isActive }) => `
              text-slate-700 font-medium py-2 px-3 relative transition-all duration-300 
              hover:text-blue-600 rounded-lg hover:bg-blue-50 
              after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 
              after:bg-gradient-to-r after:from-blue-500 after:to-purple-600 
              after:transition-all after:duration-300 after:-translate-x-1/2 
              hover:after:w-3/4
              ${isActive ? 'text-blue-600 bg-blue-50 after:w-3/4' : ''}
            `}
          >
            Gerenciar Pacientes
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Modo Administrador</span>
          </div>

          <button
            onClick={handleReturnToUser}
            className="relative overflow-hidden bg-slate-600 hover:bg-slate-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
            title="Retornar ao modo usuário"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Voltar ao Usuário</span>
            </span>
          </button>
        </div>
      </div>

      <div className="sm:hidden bg-blue-50 border-t border-blue-100 px-4 py-2">
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Modo Administrador Ativo</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;