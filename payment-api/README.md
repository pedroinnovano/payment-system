# Payment API 💳

## 📝 Descrição do Projeto

Uma API robusta de processamento de pagamentos desenvolvida com Node.js, TypeScript, Express e Redis, seguindo as melhores práticas de desenvolvimento de software.

## ✨ Funcionalidades Principais

- 🚀 Criação de pagamentos
- 🔄 Processamento assíncrono de transações
- 🔒 Autenticação via JWT
- 📊 Gerenciamento de filas com Redis
- 🛡️ Validação de dados
- 🔍 Consulta de status de pagamento

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Backend**: Node.js, Express
- **Banco de Dados**: Redis
- **Autenticação**: JWT
- **Containerização**: Docker, Docker Compose

## 📦 Pré-requisitos

- Node.js (v18 ou superior)
- Docker
- Docker Compose

## 🚀 Instalação e Configuração

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/payment-api.git
cd payment-api
```

### Configuração de Ambiente

1. Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do Servidor
PORT=3000
HOST=0.0.0.0

# Configurações do Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Segurança
JWT_SECRET=sua_chave_secreta_jwt
```

### Instalação com Docker

```bash
# Construir e iniciar os serviços
docker-compose up -d --build

# Verificar logs
docker-compose logs payment-api
```

### Instalação Local (sem Docker)

```bash
# Instalar dependências
npm install

# Compilar o projeto
npm run build

# Iniciar o servidor
npm start
```

## 🔐 Autenticação

### Gerar Token JWT

```bash
# Endpoint para gerar token
POST /api/token
```

### Endpoints Protegidos

Todos os endpoints de pagamento requerem um token JWT válido no header de autorização.

## 📡 Endpoints da API

### Gerar Token
- `POST /api/token`
  - Gera um novo token JWT para autenticação

### Criar Pagamento
- `POST /api/payments`
  - **Requer autenticação**
  - Corpo da requisição:
    ```json
    {
      "amount": 100.00,
      "method": "credit",
      "payer": {
        "name": "João Silva",
        "document": "123.456.789-00",
        "email": "joao@exemplo.com"
      }
    }
    ```

### Consultar Status do Pagamento
- `GET /api/payments/:id`
  - **Requer autenticação**
  - Retorna detalhes do pagamento

## 🧪 Testes

```bash
# Executar testes
npm test
```

## 🐳 Comandos Docker Úteis

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Rebuild de serviços
docker-compose up -d --build

# Ver logs
docker-compose logs payment-api
```

## 🔒 Segurança

- Autenticação JWT
- Validação de dados de entrada
- Processamento assíncrono
- Uso de Redis para gerenciamento de filas

## 📈 Escalabilidade

- Arquitetura baseada em microsserviços
- Suporte a processamento distribuído
- Fácil integração com outros serviços

## 🚧 Próximos Passos

- [ ] Implementar testes unitários e de integração
- [ ] Adicionar mais métodos de pagamento
- [ ] Implementar sistema de retry para pagamentos
- [ ] Adicionar monitoramento e logging avançado

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um novo Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 📞 Contato

Seu Nome - seu-email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/payment-api](https://github.com/seu-usuario/payment-api)

---

🌟 Deixe uma estrela se este projeto te ajudou!