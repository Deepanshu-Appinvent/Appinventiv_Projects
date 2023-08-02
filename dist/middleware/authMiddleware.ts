import jwt from 'jsonwebtoken';

const secretKey = '123456789'; 

function generateToken(payload: any): string {
  const token = jwt.sign(payload, secretKey, { expiresIn: '10s' });
  return token;
}

function verifyToken(token: string): any {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export { generateToken, verifyToken };












//"use strict";
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../database/models/user';
// export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) {
//       res.status(401).json({ error: 'No token provided' });
//       return;
//     }
//     const decodedToken = jwt.verify(token, 'your_secret_key') as { userId: string };
//     const userId = decodedToken.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       res.status(401).json({ error: 'Invalid token' });
//       return;
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };
// // import jwt, { JwtPayload } from 'jsonwebtoken';
// // import { Request, Response, NextFunction } from 'express';
// // interface RequestWithUser extends Request {
// //   user?: {
// //     userId: string;
// //   };
// // }
// // export function authenticateJWT(req: RequestWithUser, res: Response, next: NextFunction) {
// //   const token = req.header('Authorization')?.replace('Bearer ', '');
// //   if (!token) {
// //     return res.status(401).json({ message: 'Authentication failed. No token provided.' });
// //   }
// //   try {
// //     const decodedToken = jwt.verify(token, 'your_secret_key') as string | JwtPayload;
// //     if (typeof decodedToken === 'string') {
// //       throw new Error('Invalid token');
// //     }
// //     req.user = { userId: decodedToken.userId };
// //     next();
// //   } catch (error) {
// //     return res.status(403).json({ message: 'Authentication failed. Invalid token.' });
// //   }
// // }



