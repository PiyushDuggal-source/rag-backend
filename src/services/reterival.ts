import * as fs from 'fs';
import * as path from 'path';
import { ChunkMetadata } from '~/types/types';

const chunksDoc = path.join(__dirname, '../storage/chunks.json');

function loadDocuments(): ChunkMetadata[] {
  if (!fs.existsSync(chunksDoc)) return [];
  const fileData = fs.readFileSync(chunksDoc, 'utf-8');
  try {
    return JSON.parse(fileData).chunks as ChunkMetadata[];
  } catch {
    return [];
  }
}

export function retrieveChunksByKeyword(
  query: string,
  ownerId: string,
  topK: number = 5
): ChunkMetadata[] {
  const documents = loadDocuments();
  const keywords = query.toLowerCase().split(/\s+/);
  const filtered = documents.filter(
    (doc) =>
      doc.ownerId === ownerId &&
      keywords.some((kw) => doc.text.toLowerCase().includes(kw))
  );

  console.log('Filtered Chunks:', filtered, filtered.length);
  const scored = filtered.map((doc) => ({
    doc,
    score: keywords.reduce(
      (acc, kw) => acc + (doc.text.toLowerCase().includes(kw) ? 1 : 0),
      0
    ),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((s) => s.doc);
}
