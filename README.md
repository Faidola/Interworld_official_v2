# Sistema de Intercâmbio - Troca Mobile Plus

Sistema completo para auxiliar estudantes a encontrarem programas de intercâmbio, com cadastro de escolas, senhorios e gerenciamento de propostas.

## 🚀 Funcionalidades

- **Cadastro de Estudantes**: Formulário completo para cadastro de estudantes
- **Cadastro de Escolas**: Sistema para escolas se registrarem
- **Cadastro de Senhorios**: Novo sistema para senhorios oferecerem hospedagem
- **Página de Preços**: Interface moderna para comparação de preços de intercâmbio
- **Backend Completo**: API REST em Java com Spring Boot
- **Banco de Dados**: SQL Server com esquema completo

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- React Hook Form
- Zod (validação)

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- SQL Server
- Maven

## 📋 Pré-requisitos

- Node.js 18+ e npm
- Java 17+
- Maven 3.6+
- SQL Server

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd troca-mobile-plus-49
```

### 2. Configurar o Banco de Dados
Execute o script SQL em `cria-db.sql` no seu SQL Server para criar o banco de dados.

### 3. Configurar e Executar o Backend
```bash
cd backend
# Configure as credenciais do banco em src/main/resources/application.properties
mvn clean compile
mvn spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

### 4. Executar o Frontend
```bash
# Na pasta raiz do projeto
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
troca-mobile-plus-49/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/             # Páginas da aplicação
│   ├── hooks/             # Custom hooks
│   └── lib/               # Utilitários
├── backend/               # Backend Java Spring Boot
│   ├── src/main/java/     # Código fonte Java
│   ├── src/main/resources/ # Configurações
│   └── pom.xml           # Dependências Maven
├── cria-db.sql           # Script do banco de dados
└── package.json          # Dependências Node.js
```

## 🔧 Configurações

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=bd_intercambio
spring.datasource.username=sa
spring.datasource.password=YourPassword123
server.port=8080
```

### Frontend
O frontend está configurado para se conectar ao backend na porta 8080.

## 📱 Páginas Principais

- **Home** (`/`): Página inicial com informações sobre intercâmbio
- **Cadastro de Estudante** (`/cadastro-estudante`): Formulário para estudantes
- **Cadastro de Escola** (`/cadastro-escola`): Formulário para escolas
- **Cadastro de Senhorio** (`/cadastro-senhorio`): Novo formulário para senhorios
- **Preços** (`/precos`): Página de comparação de preços
- **Login** (`/login`): Sistema de autenticação
- **Dashboard** (`/dashboard`): Painel do usuário

## 🔌 API Endpoints

### Usuários
- `GET /api/usuarios` - Listar usuários
- `POST /api/usuarios` - Criar usuário
- `PUT /api/usuarios/{id}` - Atualizar usuário

### Senhorios
- `GET /api/senhorios` - Listar senhorios
- `POST /api/senhorios` - Criar senhorio
- `GET /api/senhorios/ativos` - Senhorios ativos

## 🎨 Design System

O projeto utiliza:
- **shadcn/ui**: Componentes base
- **Tailwind CSS**: Estilização
- **Lucide React**: Ícones
- **Design responsivo**: Funciona em desktop e mobile

## 📊 Banco de Dados

O banco inclui as seguintes tabelas:
- `Usuario`: Usuários do sistema
- `Escola`: Escolas de idiomas
- `Senhorio`: Senhorios oferecendo hospedagem
- `Idioma`: Idiomas disponíveis
- `EscolaIdioma`: Relacionamento escola-idioma
- `Mensagem`: Sistema de mensagens

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

Para suporte, entre em contato através do sistema de issues do GitHub.
