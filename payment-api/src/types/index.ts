/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentData:
 *       type: object
 *       required:
 *         - amount
 *         - method
 *         - payer
 *       properties:
 *         amount:
 *           type: number
 *         method:
 *           type: string
 *           enum: [credit, debit, pix]
 *         payer:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             document:
 *               type: string
 *             email:
 *               type: string
 */


export interface PaymentData {
    id?: string;
    amount: number;
    method: 'credit' | 'debit' | 'pix';
    payer: {
      name: string;
      document: string;
      email: string;
    };
    status: 'pending' | 'approved' | 'failed';
    createdAt: Date;  
  }
  
  
  export interface JwtPayload {
    id: string;
    iat: number;
    exp: number;
  }