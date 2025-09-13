import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const generateToken = (userId: string): string =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string): any =>
  jwt.verify(token, JWT_SECRET);
