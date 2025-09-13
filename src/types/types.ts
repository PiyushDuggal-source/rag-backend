export interface User {
  id: string;
  username: string;
  passwordHash: string;
  documentIds?: string[];
}

export interface DocumentMeta {
  id: string;
  ownerId: string;
  filename: string;
  createdAt: string;
}

export interface ChunkMetadata {
  docId: string;
  ownerId: string;
  text: string;
}
