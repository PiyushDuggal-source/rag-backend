import express from 'express';
import multer from 'multer';
import { uploadAndChunkDocument } from './controller';
import { authMiddleware } from '~/middleware/auth';

const upload = multer({ dest: 'uploads/' });

export const uploadRouter = express.Router();

uploadRouter.post(
  '/',
  authMiddleware,
  upload.single('file.txt'),
  uploadAndChunkDocument
);
