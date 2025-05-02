import express from 'express';
import dotenv from 'dotenv';
import PaymentRoutes from './routes/paymentRoutes';
import ErrorMiddleware from './middlewares/errorMiddleware';
import { swaggerSpec } from './config/swaggerConfig';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';


class Server {
  public app: express.Application;

  constructor() {
    dotenv.config();
    this.app = express();
    console.log('➡️  Criando instância do servidor');
  
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddlewares(): void {
    // Middlewares básicos
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configureRoutes(): void {

    this.app.get('/api/docs/test', (req, res) => {
        res.send('Swagger está carregado.');
      });

    // rotas do swagger
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // Registra rotas de pagamento
    this.app.use('/api', PaymentRoutes);
  }

  private configureErrorHandling(): void {
    // Middleware de tratamento de erros global
    this.app.use(ErrorMiddleware.handleError);
  }
  

  public start(port: number = 3000): void {
    const routes = this.app._router.stack
      .map((r: any) => r.route?.path || r.name)
      .filter((r: any) => !!r && typeof r === 'string');
  
    console.log('🧭 Rotas registradas:');
    console.log(routes);
  
    this.app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  }
  
}

// Inicia o servidor
const server = new Server();
server.start(process.env.PORT ? parseInt(process.env.PORT) : 3000);