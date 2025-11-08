# Um sistema moderno e intuitivo para agendamento de consultas e exames médicos, desenvolvido com React, TypeScript e Tailwind CSS.

## Sobre o Projeto

O Hospital das Clínicas é uma plataforma web desenvolvida para facilitar o agendamento de consultas médicas e exames laboratoriais. O sistema oferece uma interface moderna, intuitiva e totalmente responsiva, proporcionando uma experiência excepcional aos usuários.

## Equipe

### Desenvolvedores
- **João Victor Veronesi** - Desenvolvedor Front End 
  - GitHub: [@Veronesi30](https://github.com/Veronesi30)
  - LinkedIn: [João Victor Veronesi](https://www.linkedin.com/in/jo%C3%A3o-victor-veronesi-734897276/)

- **Leonardo Herrera Sabbatini** - Desenvolvedor Back End  
  - GitHub: [@LeoSabbatini](https://github.com/LeoSabbatini)
  - LinkedIn: [Leonardo Sabbatini](https://www.linkedin.com/in/devsabbatini/)

- **Rafael de Freitas Moraes** - Desenvolvedor Front End
  - GitHub: [@devfreitas](https://github.com/devfreitas)
  - LinkedIn: [Rafael Freitas](https://www.linkedin.com/in/rafael-freitas-9345492b5/)

### Instituição
**FIAP - Faculdade de Informática e Administração Paulista**  
Curso: Análise e Desenvolvimento de Sistemas   
Equipe: **404-Not-Founders** - Turma: **1TDSPI**

## Links
- **Repositório:** https://github.com/Not-Founders/sprint4_front
- **Vídeo:** https://youtu.be/ws2C8NPmPCU

## Funcionalidades

### Autenticação
- Sistema de login administrativo
- Rotas protegidas
- Controle de acesso

### Gerenciamento de Pacientes
- Cadastro de novos pacientes
- Edição de dados existentes
- Exclusão de registros
- Listagem com busca e filtros
- Validação completa de dados (CPF, idade, etc.)

### Interface
- Design moderno com Tailwind CSS
- Totalmente responsivo
- Feedback visual para ações
- Tratamento de erros amigável

## Tecnologias

### Frontend
- **React 19+** - Biblioteca JavaScript
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **React Router DOM** - Roteamento
- **React Icons** - Ícones

### Backend Integration
- **API Java** - Integração com backend Java
- **Tratamento de Erros** - Sistema robusto de error handling
- **Validação** - Validação completa de formulários

### Ferramentas
- **Vite** - Build tool e dev server
- **ESLint** - Linter para código

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AdminHeader.tsx  # Cabeçalho administrativo
│   ├── Footer.tsx       # Rodapé
│   ├── Header.tsx       # Cabeçalho principal
│   ├── PatientForm.tsx  # Formulário de paciente
│   ├── PatientList.tsx  # Lista de pacientes
│   └── ProtectedRoute.tsx # Rota protegida
├── contexts/            # Contextos React
│   └── AuthContext.tsx  # Contexto de autenticação
├── pages/              # Páginas da aplicação
│   ├── AdminPanel.tsx   # Painel administrativo
│   ├── Home.tsx         # Página inicial
│   ├── Login.tsx        # Página de login
│   ├── AgendarConsulta.tsx # Agendamento de consultas
│   ├── AgendarExame.tsx # Agendamento de exames
│   └── ...              # Outras páginas
├── services/           # Serviços e APIs
│   ├── authService.ts   # Serviço de autenticação
│   └── patientApi.ts    # API de pacientes
├── types/              # Definições de tipos
│   ├── auth.ts          # Tipos de autenticação
│   └── patient.ts       # Tipos de paciente
├── utils/              # Utilitários
│   ├── errorHandler.ts  # Tratamento de erros
│   └── validation.ts    # Validações
└── routes/             # Configuração de rotas
│   └── index.tsx        # Definição das rotas
└── index.css
└── main.tsx
└── App.tsx
```

## Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

1. **Instale as dependências**
```bash
npm install tailwindcss @tailwindcss/vite
npm install react-router-dom
npm install react-icons
```

2. **Execute o projeto**
```bash
npm run dev
```

3. **Acesse no navegador**
```
http://localhost:5173
```

## Credenciais de Acesso

### Administrador
- **Usuário:** admin
- **Senha:** admin

## Funcionalidades Principais

### Cadastro de Pacientes
- Validação de CPF com algoritmo oficial
- Validação de idade (0-150 anos)
- Validação de nome completo
- Seleção de gênero
- Cadastro de plano de saúde

### Gerenciamento
- Listagem de todos os pacientes
- Edição de dados existentes
- Exclusão com confirmação
- Busca e filtros
- Feedback visual para todas as ações

### Tratamento de Erros
- Mensagens amigáveis ao usuário
- Sugestões para resolução de problemas
- Retry automático para erros de rede
- Logs detalhados para debugging

## Segurança

- Rotas protegidas por autenticação
- Validação de dados no frontend
- Sanitização de inputs
- Tratamento seguro de erros

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza build de produção
npm run lint     # Executa linter
```

## API Integration

O sistema integra com uma API Java hospedada em:
```
https://sprint4-java-av1f.onrender.com
```

### Endpoints utilizados:
- `GET /main/pacientes` - Lista pacientes
- `POST /main/paciente` - Cria paciente
- `PUT /main/paciente/{id}` - Atualiza paciente
- `DELETE /main/paciente/{id}` - Remove paciente


## Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de Análise e Desenvolvimento de Sistemas da FIAP.

---
