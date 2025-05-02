import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';
import { PaymentData } from '../types';

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
  });
  redisClient.connect();

const QUEUE_KEY = 'payment_queue';

class QueueService {
  async addToQueue(paymentData: Omit<PaymentData, 'id' | 'status' | 'createdAt'>): Promise<string> {
    const id = uuidv4();
    const payment: PaymentData = {
      id,
      amount: paymentData.amount,
      method: paymentData.method,
      payer: paymentData.payer,
      status: 'pending',
      createdAt: new Date()
    };

    
    await redisClient.set(`payment:${id}`, JSON.stringify(payment));
    await redisClient.rPush(QUEUE_KEY, id);

    setTimeout(async () => {
      const status = Math.random() > 0.5 ? 'approved' : 'failed';

      const stored = await redisClient.get(`payment:${id}`);
      if (stored) {
        const parsed: PaymentData = JSON.parse(stored);
        parsed.status = status;

        await redisClient.set(`payment:${id}`, JSON.stringify(parsed));
      }
    }, 5000);

    return id;
  }

  async getPaymentStatus(id: string): Promise<PaymentData | null> {
    const stored = await redisClient.get(`payment:${id}`);
    if (!stored) return null;

    const payment = JSON.parse(stored);
    payment.createdAt = new Date(payment.createdAt);

    return payment;
  }
}

export default new QueueService();
