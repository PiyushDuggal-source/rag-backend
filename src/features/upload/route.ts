import express from 'express';
import multer from 'multer';
import { uploadAndChunkDocument } from './controller';

const upload = multer({ dest: 'uploads/' });

export const uploadRouter = express.Router();

uploadRouter.post('/', upload.single('file.txt'), uploadAndChunkDocument);
