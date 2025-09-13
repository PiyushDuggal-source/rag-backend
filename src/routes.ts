import express from 'express';
import { pingServerRouter, uploadRouter } from '~/features';
import { authRouter } from '~/features/auth/route';
import { askRouter } from './features/ask/route';

export const router = express.Router();

router.use('/ping', pingServerRouter);
router.use('/auth', authRouter);
router.use('/upload', uploadRouter);
router.use('/ask', askRouter);
