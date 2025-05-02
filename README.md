
# 💳 Payment System - API + Frontend

Uma aplicação completa de simulação de pagamentos com frontend em Vue 3 + Tailwind e backend em Node.js + TypeScript, com autenticação via JWT, fila Redis e processamento assíncrono de transações.

---

## 📂 Estrutura do Projeto

```bash
projetos_novo/
├── payment-api/         # Backend (Node.js, Express, TypeScript, Redis, JWT)
│   ├── src/
│   ├── Dockerfile
│   └── .env
├── payment-client/      # Frontend (Vue 3, Tailwind, Axios)
│   ├── src/
│   ├── Dockerfile
│   └── .env.production
├── docker-compose.yml   # Orquestra os serviços
└── README.md
```

---

## 🚀 Como subir o projeto com Docker

### ✅ Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 🔧 Passos

```bash
git clone https://github.com/pedroinnovano/payment-system.git
cd payment-system
```

### 1. Crie os arquivos `.env`

#### `payment-api/.env`

```env
PORT=3000
JWT_SECRET=sua_chave_super_secreta
REDIS_URL=redis://redis:6379
```

#### `payment-client/.env.production`

```env
VITE_API_BASE_URL=http://payment-api:3000/api
```

### 2. Suba os serviços

```bash
docker-compose up --build
```

### 3. Acesse no navegador

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend (Swagger): [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 🧪 Funcionalidades

- 🔐 Geração de token JWT
- 💳 Criação de pagamento com nome, valor, método (pix, crédito, débito)
- ⏳ Processamento assíncrono com fila Redis
- 🔍 Consulta de status com polling no frontend
- ✅ Feedback visual por status (⏳/✅/❌)

---

## 📦 Tecnologias Utilizadas

### Backend

- Node.js + TypeScript
- Express
- Redis (fila)
- JWT (autenticação)
- Docker

### Frontend

- Vue 3 (Composition API)
- Tailwind CSS
- Axios
- Docker

---

## 📈 Melhorias futuras

- [ ] Integração com banco de dados real
- [ ] Tela de histórico de pagamentos
- [ ] Testes unitários e E2E
- [ ] Dashboard de monitoramento
- [ ] WebSocket para atualização em tempo real

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para sua branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

---

## 📞 Contato

Pedro Santos - phmsanttos@gmail.com 

Projeto: [https://github.com/pedroinnovano/payment-system](https://github.com/pedroinnovano/payment-system)

---

## 📡 Fluxo de uso da API

Para utilizar os endpoints protegidos (pagamentos), é necessário obter um token JWT antes de qualquer outra requisição.

### 1. 🔐 Gerar Token JWT

```http
POST /api/token
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Guarde esse token. Use-o nos próximos endpoints no header:  
> `Authorization: Bearer <token>`

---

### 2. 💳 Criar Pagamento

```http
POST /api/payments
Authorization: Bearer <token>
Content-Type: application/json
```

**Corpo da requisição:**

```json
{
  "amount": 150.00,
  "method": "credit",
  "payer": {
    "name": "João Silva",
    "document": "123.456.789-00",
    "email": "joao@teste.com"
  }
}
```

**Resposta:**

```json
{
  "message": "Pagamento iniciado com sucesso",
  "paymentId": "b8f12f31-xxxx-4d5a-8ad2-xxxxxx"
}
```

---

### 3. 🔍 Consultar Status do Pagamento

```http
GET /api/payments/:id
Authorization: Bearer <token>
```

**Resposta:**

```json
{
  "id": "b8f12f31-xxxx-4d5a-8ad2-xxxxxx",
  "status": "approved", // ou pending, failed
  "amount": 150.00,
  "method": "credit",
  "payer": {
    "name": "João Silva",
    "document": "123.456.789-00",
    "email": "joao@teste.com"
  },
  "createdAt": "2025-05-02T15:33:21.000Z"
}
```

O status é atualizado de forma assíncrona, e o frontend pode fazer **polling a cada 2 segundos** para obter o status atualizado.
