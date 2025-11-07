import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const success = await login({
                username: formData.username,
                password: formData.password
            });

            if (success) {
                if (formData.username === 'admin' && formData.password === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                setError('Credenciais inválidas. Verifique seu usuário e senha.');
            }
        } catch {
            setError('Erro ao fazer login. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
            {/* Animação Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float [animation-delay:2s]"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float [animation-delay:4s]"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden max-w-5xl w-full relative z-10 animate-fade-in-up">
                {/* Lado esquerdo */}
                <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 text-center text-white">
                        <div className="mb-8 animate-pulse-soft">
                            <img src="/hc.png" alt="Hospital das Clínicas" className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl" />
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Bem-vindo de volta!</h2>
                        <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
                            Acesse sua conta e continue cuidando da sua saúde com a melhor tecnologia médica.
                        </p>
                        <div className="mt-8 flex justify-center space-x-4">
                            <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                            <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                            <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Lado direito */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 animate-fade-in-right">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                                Fazer <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Login</span>
                            </h1>
                            <p className="text-slate-600">Entre na sua conta para continuar</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-semibold text-slate-700">
                                    Usuário
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Digite seu usuário"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                                    Senha
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 pl-12 pr-12 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <svg className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {showPassword ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                                    <span className="ml-2 text-sm text-slate-600">Lembrar de mim</span>
                                </label>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    Esqueceu a senha?
                                </a>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="relative overflow-hidden w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Entrando...
                                    </div>
                                ) : (
                                    'Entrar na Conta'
                                )}
                            </button>
                        </form>

                        <div className="relative flex py-6 items-center">
                            <div className="flex-grow border-t border-slate-300"></div>
                            <span className="flex-shrink mx-4 text-slate-500 text-sm font-medium">ou continue com</span>
                            <div className="flex-grow border-t border-slate-300"></div>
                        </div>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center py-3 px-4 border border-slate-300 rounded-xl shadow-sm text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Entrar com GOV.BR
                        </button>

                        <p className="mt-8 text-center text-sm text-slate-600">
                            Não tem uma conta?{' '}
                            <Link to="/cadastro" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                Cadastre-se gratuitamente
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
