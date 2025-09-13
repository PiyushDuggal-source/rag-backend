import { Request, Response } from 'express';
import { generateLLMResponse } from '~/services/llm';

export const askController = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    const ownerId = (req as any).user.userId;
    console.log('Query:', query);
    console.log('Owner ID:', ownerId);
    if (!query || !ownerId) {
      return res
        .status(400)
        .json({ message: 'Query and ownerId are required' });
    }
    const answer = await generateLLMResponse(query, ownerId);
    return res.status(200).json({ answer });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error processing request', error: error });
  }
};
