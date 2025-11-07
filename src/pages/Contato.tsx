import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp, FaComments } from 'react-icons/fa';

const Contato: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        
        // Simulação
        setTimeout(() => {
            setIsLoading(false);
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            event.currentTarget.reset();
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
            
            <div className="container mx-auto px-4 py-16 relative z-10">
                {/* "HEADER" */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                        💬 Fale Conosco
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="gradient-text">Entre em</span>
                        <br />
                        <span className="text-slate-800">Contato</span>
                    </h1>
                    <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
                        Tem alguma dúvida, sugestão ou precisa de ajuda? Nossa equipe está sempre pronta para atendê-lo da melhor forma possível.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* Informações de contato */}
                    <div className="space-y-8 animate-fade-in-left">
                        <div className="glass p-8 rounded-2xl shadow-xl">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Informações de Contato</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4 group">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                                        <FaMapMarkerAlt className="text-blue-600 group-hover:text-white transition-colors duration-300"/>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-1">Endereço</h4>
                                        <p className="text-slate-600">Av. Dr. Enéas de Carvalho Aguiar, 255</p>
                                        <p className="text-slate-600">São Paulo - SP, CEP: 05403-000</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-4 group">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                                        <FaPhone className="text-blue-600 group-hover:text-white transition-colors duration-300"/>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-1">Telefone</h4>
                                        <p className="text-slate-600">(11) 2661-0000</p>
                                        <p className="text-slate-500 text-sm">Atendimento 24 horas</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-4 group">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                                        <FaEnvelope className="text-blue-600 group-hover:text-white transition-colors duration-300"/>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-1">Email</h4>
                                        <p className="text-slate-600">contato@hc.com.br</p>
                                        <p className="text-slate-500 text-sm">Resposta em até 24h</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-4 group">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                                        <FaClock className="text-blue-600 group-hover:text-white transition-colors duration-300"/>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-1">Horário de Funcionamento</h4>
                                        <p className="text-slate-600">Ambulatórios: 7h às 18h</p>
                                        <p className="text-slate-600">Emergência: 24h por dia</p>
                                        <p className="text-slate-600">Visitas: 14h às 17h</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opções de contato (naõ funcional) */}
                        <div className="glass p-6 rounded-2xl shadow-xl">
                            <h4 className="font-bold text-slate-800 mb-4">Contato Rápido</h4>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="btn-modern flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                                    <FaWhatsapp />
                                    <span>WhatsApp</span>
                                </button>
                                <button className="btn-modern flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                                    <FaComments />
                                    <span>Chat Online</span>
                                </button>
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="glass rounded-2xl overflow-hidden shadow-xl hover-lift">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7314.592629757024!2d-46.66986!3d-23.557799!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b00d3aa487%3A0xfe715b43e354f823!2sHospital%20das%20Cl%C3%ADnicas%20FMUSP!5e0!3m2!1spt-BR!2sbr!4v1757284203851!5m2!1spt-BR!2sbr"
                                className="w-full h-80 border-0" 
                                allowFullScreen={true}
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="animate-fade-in-right">
                        <div className="glass p-8 rounded-2xl shadow-xl">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Envie uma Mensagem</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Nome Completo
                                        </label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            required 
                                            className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Seu nome completo"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Telefone
                                        </label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="(11) 99999-9999"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        required 
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Assunto
                                    </label>
                                    <select 
                                        id="subject" 
                                        required 
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    >
                                        <option value="">Selecione um assunto</option>
                                        <option value="consulta">Agendamento de Consulta</option>
                                        <option value="exame">Agendamento de Exame</option>
                                        <option value="resultado">Resultado de Exame</option>
                                        <option value="duvida">Dúvida Médica</option>
                                        <option value="sugestao">Sugestão</option>
                                        <option value="reclamacao">Reclamação</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Mensagem
                                    </label>
                                    <textarea 
                                        id="message" 
                                        rows={5} 
                                        required 
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="Descreva sua mensagem aqui..."
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="btn-modern w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando...
                                        </div>
                                    ) : (
                                        'Enviar Mensagem'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contato;
