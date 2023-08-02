import { Request, Response, NextFunction } from 'express';
import { Redis } from 'ioredis';
import User from '../database/models/user';
import redisClient from '../index';
import { cachedDataVersionTag } from 'v8';

const cacheMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { user_id } = req.body as { user_id: string };

    const cachedData = await redisClient.get(`user:${user_id}`);
    if (cachedData) {
      console.log(cachedData);
      console.log('Cache hit');
      const user = JSON.parse(cachedData);
      req.body.user = user;
    } else {
      console.log('Cache miss');
      const user = await User.findOne({ user_id });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      await redisClient.set(`user:${user_id}`, JSON.stringify(user), 'EX', 60);
      req.body.user = user;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default cacheMiddleware;
