import { Request, Response, NextFunction } from 'express';
import TokenGenerator from '../utils/tokenGenerator';

class AuthMiddleware {
  authenticate(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const isValidToken = TokenGenerator.verifyToken(token);

    if (!isValidToken) {
      res.status(401).json({ error: 'Token inválido' });
      return;
    }

    next();
  }
}

export default new AuthMiddleware();