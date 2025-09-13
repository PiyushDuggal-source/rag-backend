import express from 'express';
import { pingServerRouter } from '~/features';
import { authRouter } from '~/features/auth/route';

export const router = express.Router();

router.use('/ping', pingServerRouter);
router.use('/auth', authRouter);
