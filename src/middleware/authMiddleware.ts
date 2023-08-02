import { NextFunction, Request, Response } from 'express';
import jwt,{JwtPayload} from 'jsonwebtoken';

const secretKey = 'deep';

function generateToken(payload: any): string {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1000s' });
  return token;
}

function verifyToken(req: Request, res: Response, next: NextFunction): any {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new Error('Authorization token not found');
    }
    const decoded = <JwtPayload>jwt.verify(token, secretKey);
    console.log(decoded)
    req.body.userId=decoded?.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Invalid token' });
  }
}

export { generateToken, verifyToken };