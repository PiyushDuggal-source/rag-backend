import { Request, Response } from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createChunksFromFile } from '~/utils/upload';
import { DocumentMeta } from '~/types/types';
import * as fs from 'fs';

const documentsPath = path.join(__dirname, '../../storage/documents.json');

function loadDocuments(): DocumentMeta[] {
  if (!fs.existsSync(documentsPath)) return [];
  const fileData = fs.readFileSync(documentsPath, 'utf-8');
  try {
    return JSON.parse(fileData).documents as DocumentMeta[];
  } catch {
    return [];
  }
}

function saveDocuments(documents: DocumentMeta[]) {
  fs.writeFileSync(documentsPath, JSON.stringify({ documents }, null, 2));
}

export const uploadAndChunkDocument = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const ownerId = (req as any).user.userId;

    console.log('File:', file);
    console.log('Owner ID:', ownerId);
    if (!file || !ownerId) {
      return res.status(400).json({ message: 'File and ownerId are required' });
    }
    const filePath = file.path;
    const filename = file.originalname;
    const docId = uuidv4();
    // Create chunks
    createChunksFromFile(filePath, ownerId);
    // Save document metadata
    const newDoc: DocumentMeta = {
      id: docId,
      ownerId,
      filename,
      createdAt: new Date().toISOString(),
    };
    const existingDocs = loadDocuments();
    saveDocuments([...existingDocs, newDoc]);
    return res
      .status(201)
      .json({ message: 'Document uploaded and chunked', document: newDoc });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error uploading document', error: error.message });
  }
};
