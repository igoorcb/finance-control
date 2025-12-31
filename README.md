# Finance App - Sistema de Controle Financeiro Pessoal

Sistema completo de controle financeiro pessoal self-hosted, desenvolvido com Vue 3 + TypeScript + Node.js + Express + Prisma + SQLite, orquestrado com Docker Compose.

## Tecnologias Utilizadas

### Frontend
- **Vue 3** - Framework progressivo para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **TailwindCSS** - Framework CSS utility-first
- **Vue Router** - Roteamento oficial do Vue
- **@tanstack/vue-query** - Gerenciamento de estado assíncrono e cache
- **Axios** - Cliente HTTP
- **Pinia** - State management oficial do Vue
- **VeeValidate + Zod** - Validação de formulários
- **vue-chartjs** - Gráficos com Chart.js
- **lucide-vue-next** - Biblioteca de ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **TypeScript** - Tipagem estática
- **Prisma** - ORM moderno e type-safe
- **SQLite** - Banco de dados relacional leve e local
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## Pré-requisitos

- **Docker** >= 29.0
- **Docker Compose** >= 5.0
- **Node.js** >= 24.0 (opcional, para desenvolvimento local sem Docker)

## Instalação e Execução

### 1. Clone o repositório (ou navegue até o diretório)

```bash
cd finance-app
```

### 2. Inicie a aplicação com Docker Compose

```bash
# Primeira vez (com build)
npm run dev:build

# Execuções seguintes
npm run dev
```

### 3. Acesse a aplicação

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **API Health Check**: http://localhost:3001/api/health

## Scripts Disponíveis

```bash
npm run dev          # Iniciar aplicação (docker compose up)
npm run dev:build    # Iniciar com rebuild das imagens
npm run down         # Parar containers
npm run logs         # Ver logs de todos os serviços
npm run logs:backend # Ver logs apenas do backend
npm run logs:frontend# Ver logs apenas do frontend
npm run clean        # Parar containers e limpar banco de dados
```

## Estrutura do Projeto

```
finance-app/
├── backend/                # API Node.js + Express
│   ├── prisma/
│   │   ├── schema.prisma  # Schema do banco de dados
│   │   └── seed.ts        # Dados iniciais
│   ├── src/
│   │   ├── controllers/   # Camada de requisição/resposta
│   │   ├── services/      # Lógica de negócio
│   │   ├── routes/        # Definição de rotas
│   │   ├── middlewares/   # Middlewares customizados
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utilitários
│   │   └── index.ts       # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/              # SPA Vue 3
│   ├── src/
│   │   ├── components/    # Componentes Vue
│   │   │   ├── layout/   # Layout (Sidebar, Header)
│   │   │   └── ui/       # Componentes reutilizáveis
│   │   ├── views/        # Páginas/Views
│   │   ├── router/       # Configuração do Vue Router
│   │   ├── services/     # API client (Axios)
│   │   ├── types/        # TypeScript types
│   │   ├── lib/          # Utilitários
│   │   ├── styles/       # CSS global
│   │   └── main.ts       # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── database/              # SQLite database (persistido)
│   └── finance.db
│
├── docker-compose.yml     # Orquestração dos serviços
├── package.json           # Scripts raiz
└── README.md
```

## Funcionalidades Implementadas (MVP)

### Backend (Completo)
- API RESTful completa
- CRUD de Contas (accounts)
- CRUD de Categorias (categories)
- CRUD de Transações (transactions)
- Dashboard com agregações:
  - Resumo financeiro mensal
  - Despesas por categoria
  - Transações recentes
- Atualização automática de saldo das contas
- Validação de dados
- Tratamento de erros centralizado
- Seed com dados de exemplo

### Frontend (MVP Básico)
- Layout responsivo com Sidebar e Header
- Navegação entre páginas
- Dashboard funcional com:
  - Cards de resumo financeiro
  - Lista de transações recentes
- Integração com API via Axios e Vue Query
- Sistema de cache e refetch automático

### Docker
- Hot reload funcional em frontend e backend
- Persistência de banco de dados
- Migrations automáticas do Prisma
- Seed automático na primeira execução

## Dados de Exemplo

O sistema vem populado com dados de exemplo:
- **3 contas**: Conta Corrente, Poupança, Carteira
- **10 categorias**: 5 de despesas + 5 de receitas
- **~22 transações** dos últimos 2 meses

## API Endpoints

### Accounts
- `GET /api/accounts` - Listar todas as contas
- `GET /api/accounts/:id` - Buscar conta por ID
- `POST /api/accounts` - Criar nova conta
- `PUT /api/accounts/:id` - Atualizar conta
- `DELETE /api/accounts/:id` - Excluir conta

### Categories
- `GET /api/categories` - Listar todas as categorias
- `GET /api/categories/:id` - Buscar categoria por ID
- `POST /api/categories` - Criar nova categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Excluir categoria

### Transactions
- `GET /api/transactions` - Listar transações (com filtros opcionais)
- `GET /api/transactions/:id` - Buscar transação por ID
- `POST /api/transactions` - Criar nova transação
- `PUT /api/transactions/:id` - Atualizar transação
- `DELETE /api/transactions/:id` - Excluir transação

### Dashboard
- `GET /api/dashboard/summary?month=X&year=Y` - Resumo financeiro mensal
- `GET /api/dashboard/expenses-by-category?month=X&year=Y` - Despesas por categoria
- `GET /api/dashboard/recent-transactions?limit=N` - Transações recentes

## Próximas Funcionalidades (Roadmap)

### Fase 2 - CRUD Completo Frontend
- [ ] Gestão completa de Contas (criar, editar, excluir)
- [ ] Gestão completa de Categorias (criar, editar, excluir)
- [ ] Gestão completa de Transações (criar, editar, excluir, filtros)
- [ ] Modais e formulários com validação
- [ ] Feedback visual de ações (toasts/notifications)

### Fase 3 - Funcionalidades Avançadas
- [ ] Cartões de Crédito + Faturas
- [ ] Orçamento e Metas
- [ ] Contas a Pagar/Receber
- [ ] Parcelamentos
- [ ] Gráficos avançados (evolução temporal, comparativos)
- [ ] Relatórios exportáveis (CSV/PDF)

### Fase 4 - Recursos Adicionais
- [ ] Investimentos
- [ ] Dívidas e Empréstimos
- [ ] Importação de extratos CSV
- [ ] Backup e Restore
- [ ] Tema Dark/Light
- [ ] Tags customizáveis
- [ ] Busca avançada
- [ ] Autenticação multi-usuário (opcional)

## Desenvolvimento Local (Sem Docker)

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Portas já em uso

Se as portas 3001 ou 5173 estiverem em uso, você pode:
1. Parar os processos que as estão usando
2. Modificar as portas no `docker-compose.yml`

### Banco de dados corrompido

```bash
npm run clean
npm run dev:build
```

### Containers não iniciam

```bash
docker compose down
docker compose up --build
```

### Ver logs de erros

```bash
npm run logs
```

## Contribuindo

Este é um projeto pessoal, mas sugestões e melhorias são bem-vindas!

## Licença

MIT

---

**Versão**: 1.0.0 (MVP)
**Desenvolvido com**: Vue 3 + TypeScript + Node.js + Express + Prisma + SQLite + Docker
