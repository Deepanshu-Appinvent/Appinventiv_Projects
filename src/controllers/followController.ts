import { Request, Response } from 'express';
import { getAcceptedReceivers } from '../services/followService';

export async function getAcceptedReceiversController(req: Request, res: Response): Promise<any> {
  const { userId } = req.body;

  try {
    const result = await getAcceptedReceivers(userId);
    res.json(result);
  } catch (err) {
    console.error('Error in controller:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
