import { PaymentData } from '../types';
import QueueService from './queueService';

class PaymentService {
  validatePayment(paymentData: Omit<PaymentData, 'id' | 'status' | 'createdAt'>): boolean {
    if (!paymentData.amount || paymentData.amount <= 0) {
      throw new Error('Valor de pagamento inválido');
    }

    if (!['credit', 'debit', 'pix'].includes(paymentData.method)) {
      throw new Error('Método de pagamento inválido');
    }

    if (!paymentData.payer.name || !paymentData.payer.document || !paymentData.payer.email) {
      throw new Error('Dados do pagador incompletos');
    }

    return true;
  }

  async processPayment(paymentData: Omit<PaymentData, 'id' | 'status' | 'createdAt'>): Promise<string> {
    this.validatePayment(paymentData);

    return await QueueService.addToQueue(paymentData);
  }

  async getPaymentStatus(id: string) {
    const payment = await QueueService.getPaymentStatus(id);
    
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    return payment;
  }
}

export default new PaymentService();