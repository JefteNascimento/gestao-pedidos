# Gestão de Pedidos

Aplicação desenvolvida como teste técnico para gerenciamento de clientes, produtos e pedidos.

O projeto é dividido em uma API backend desenvolvida com AdonisJS e uma aplicação frontend desenvolvida com Angular.

## Tecnologias utilizadas

### Backend

- Node.js
- AdonisJS
- TypeScript
- Lucid ORM
- SQLite
- VineJS

### Frontend

- Angular
- TypeScript
- HTML
- CSS

## Funcionalidades

### Clientes

- Cadastro de clientes
- Edição de clientes
- Listagem de clientes

### Produtos

- Cadastro de produtos
- Edição de produtos
- Listagem de produtos
- Ativação e desativação de produtos

### Pedidos

- Cadastro de pedidos
- Listagem de pedidos
- Consulta dos detalhes de um pedido
- Alteração de status
- Cancelamento de pedidos

## Regras de negócio

- Todo pedido deve possuir um cliente.
- Todo pedido deve possuir pelo menos um produto.
- A quantidade de cada item deve ser maior ou igual a 1.
- Produtos inativos não podem ser adicionados a novos pedidos.
- O valor total do pedido é calculado pelo backend.
- O preço do produto é armazenado no item no momento da criação do pedido, preservando o valor histórico.
- O fluxo de status segue:
  - PENDENTE
  - EM_PREPARACAO
  - PRONTO
  - FINALIZADO
- Um pedido também pode ser cancelado.
- Pedidos cancelados não podem ter o status alterado novamente.

## Transações

A criação de pedidos utiliza transação no banco de dados.

Caso ocorra um erro durante a criação de um pedido ou de seus itens, a operação é revertida através de rollback, evitando que pedidos sejam armazenados parcialmente.

## Estrutura do projeto

```text
gestao_pedidos/
├── backend/
├── frontend/
└── README.md
```

## Como executar o projeto

### Pré-requisitos

É necessário possuir:

- Node.js
- npm

### Backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Execute as migrations:

```bash
node ace migration:run
```

Inicie o servidor:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3333
```

### Frontend

Em outro terminal, acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

## Banco de dados

O projeto utiliza SQLite através do Lucid ORM.

O banco é criado localmente a partir das migrations, portanto não é necessário instalar ou configurar um servidor de banco de dados externo.

## Build

Para gerar o build do backend:

```bash
cd backend
npm run build
```

Para gerar o build do frontend:

```bash
cd frontend
npm run build
```