import ollama from 'ollama';
import { retrieveChunksByKeyword } from './reterival';
import { ChunkMetadata } from '~/types/types';

export async function generateLLMResponse(
  query: string,
  ownerId: string,
  topK: number = 5
): Promise<{
  response: string;
  contextChunks: ChunkMetadata[];
}> {
  // Retrieve chunks
  const contextChunks = retrieveChunksByKeyword(query, ownerId, topK);
  console.log('Context Chunks:', contextChunks, contextChunks.length);
  const contextText = contextChunks.map((chunk) => chunk.text).join('\n');
  const prompt = contextText
    ? `Context:\n${contextText}\n\nQuestion: ${query}`
    : query;

  const systemPrompt = `You are a helpful assistant. Use the provided context to answer the question. If the context does not contain the answer, respond with "I don't know." Be concise and to the point.`;

  // Call model
  const response = await ollama.generate({
    model: 'llama2-uncensored',
    prompt,
    system: systemPrompt,
    keep_alive: '15m',
  });
  if (!response.response) {
    throw new Error('Failed to get response from LLM');
  }
  return {
    response: response.response,
    contextChunks: contextChunks,
  };
}
