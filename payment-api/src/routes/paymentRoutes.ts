import { Router } from 'express';
import PaymentController from '../controllers/paymentController';
import AuthMiddleware from '../middlewares/authMiddleware';

class PaymentRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    

    /**
 * @swagger
 * /token:
 *   post:
 *     summary: Gera um token JWT
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 */
    this.router.post('/token', PaymentController.generateToken);


    /**
 * @swagger
 * /payments:
 *   post:
 *     summary: Cria um novo pagamento
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentData'
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 *       400:
 *         description: Erro de validação
 */

    this.router.post(
      '/payments', 
      AuthMiddleware.authenticate, 
      PaymentController.createPayment
    );


    /**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Retorna status de um pagamento
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pagamento
 *     responses:
 *       200:
 *         description: Status retornado
 *       404:
 *         description: Pagamento não encontrado
 */
    this.router.get(
      '/payments/:id', 
      AuthMiddleware.authenticate, 
      PaymentController.getPaymentStatus
    );
  }
}

export default new PaymentRoutes().router;