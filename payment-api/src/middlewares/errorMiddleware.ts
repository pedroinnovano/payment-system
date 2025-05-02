import { Request, Response, NextFunction } from 'express';

class ErrorMiddleware {
  handleError(
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Response {
    console.error(err);

    switch (true) {
      case err.name === 'ValidationError':
        return res.status(400).json({ 
          error: 'Erro de validação', 
          details: err.message 
        });
      
      case err.name === 'UnauthorizedError':
        return res.status(401).json({ 
          error: 'Não autorizado', 
          details: err.message 
        });
      
      case err.name === 'NotFoundError':
        return res.status(404).json({ 
          error: 'Recurso não encontrado', 
          details: err.message 
        });
      
      default:
        return res.status(500).json({ 
          error: 'Erro interno do servidor', 
          details: err.message 
        });
    }
  }
}

export default new ErrorMiddleware();