import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ChunkMetadata } from '~/types/types';

const chunksPath = path.join(__dirname, '../storage/chunks.json');

function loadChunks(): ChunkMetadata[] {
  if (!fs.existsSync(chunksPath)) return [];
  const fileData = fs.readFileSync(chunksPath, 'utf-8');
  try {
    return JSON.parse(fileData).chunks as ChunkMetadata[];
  } catch {
    return [];
  }
}

function saveChunks(chunks: ChunkMetadata[]) {
  fs.writeFileSync(chunksPath, JSON.stringify({ chunks }, null, 2));
}

export function createChunksFromFile(
  filePath: string,
  ownerId: string,
  chunkSize: number = 300
): ChunkMetadata[] {
  if (!fs.existsSync(filePath)) throw new Error('File not found');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const words = fileData.split(/\s+/);
  const chunks: ChunkMetadata[] = [];
  const docId = uuidv4();
  for (let i = 0; i < words.length; i += chunkSize) {
    const text = words.slice(i, i + chunkSize).join(' ');
    chunks.push({ docId, ownerId, text });
  }
  // Save to storage
  const existingChunks = loadChunks();
  saveChunks([...existingChunks, ...chunks]);
  return chunks;
}
