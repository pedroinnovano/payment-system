import { Request, Response } from 'express';
import PaymentService from '../services/paymentService';
import TokenGenerator from '../utils/tokenGenerator';
import { PaymentData } from '../types';

class PaymentController {
  async createPayment(req: Request, res: Response): Promise<Response> {
    try {
      const paymentData = req.body;
      
      const paymentId = await PaymentService.processPayment(paymentData);

      return res.status(201).json({ 
        message: 'Pagamento iniciado com sucesso', 
        paymentId 
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ 
          error: 'Erro ao processar pagamento', 
          details: error.message 
        });
      }
      return res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }

  async getPaymentStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const payment = await PaymentService.getPaymentStatus(id);

      return res.status(200).json(payment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ 
          error: 'Pagamento não encontrado', 
          details: error.message 
        });
      }
      return res.status(500).json({ 
        error: 'Erro interno do servidor' 
      });
    }
  }

  async generateToken(req: Request, res: Response): Promise<Response> {
    const token = TokenGenerator.generateToken();
    return res.status(200).json({ token });
  }
}

export default new PaymentController();