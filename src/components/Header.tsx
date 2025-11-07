import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/consultas', label: 'Consultas' },
    { to: '/exames', label: 'Exames' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contato', label: 'Contato' },
    {to: '/integrantes', label: 'Integrantes'}
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = "text-slate-700 font-medium py-2 px-3 relative transition-all duration-300 hover:text-blue-600 rounded-lg hover:bg-blue-50 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-3/4";
  const activeLinkClass = "text-blue-600 bg-blue-50 after:w-3/4";

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg' 
        : 'bg-white/95 shadow-md'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2 group">
          <img 
            src="/hc.png" 
            alt="HC" 
            className="h-12 transition-transform duration-300 group-hover:scale-110" 
          />
          <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Hospital das Clínicas
          </span>
        </NavLink>
        
        <nav className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => (
            <NavLink 
              key={link.label} 
              to={link.to} 
              className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        <NavLink 
          to="/login" 
          className="hidden lg:inline-block relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
        >
          Login
        </NavLink>
        
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-900/90 backdrop-blur-md border-t border-blue-500/30">
          <nav className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map((link) => (
              <NavLink 
                key={link.label} 
                to={link.to} 
                onClick={() => setIsMenuOpen(false)} 
                className={({ isActive }) => `font-medium transition-all duration-200 px-4 py-2 rounded-lg ${
                  isActive 
                    ? 'text-blue-400 bg-blue-500/20' 
                    : 'text-white hover:text-blue-300 hover:bg-white/10'
                }`}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink 
              to="/login" 
              onClick={() => setIsMenuOpen(false)} 
              className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-11/12 text-center max-w-xs before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
            >
              Login
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
