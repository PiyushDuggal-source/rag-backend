import express from 'express';
import { askController } from './controller';
import { authMiddleware } from '~/middleware/auth';

export const askRouter = express.Router();

askRouter.post('/', authMiddleware, askController);
