import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

class TokenGenerator {
  private readonly SECRET_KEY = process.env.JWT_SECRET || 'key_default';

  generateToken(): string {
    const payload = {
      id: uuidv4(),
      iat: Date.now(),
    };

    return jwt.sign(payload, this.SECRET_KEY, { 
      expiresIn: '1h' 
    });
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.SECRET_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new TokenGenerator();