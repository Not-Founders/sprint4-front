import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/ProtectedRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Consultas from '../pages/Consultas';
import Exames from '../pages/Exames';
import Cadastro from '../pages/Cadastro';
import Contato from '../pages/Contato';
import Faq from '../pages/Faq';
import Sobre from '../pages/Sobre';
import Integrantes from '../pages/Integrantes';
import AdminPanel from '../pages/AdminPanel';
import AgendarConsulta from '../pages/AgendarConsulta';
import AgendarExame from '../pages/AgendarExame';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/consultas" element={<Consultas />} />
                <Route path="/exames" element={<Exames />} />
                <Route path="/agendar-consulta" element={<AgendarConsulta />} />
                <Route path="/agendar-exame" element={<AgendarExame />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/integrantes" element={<Integrantes />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
