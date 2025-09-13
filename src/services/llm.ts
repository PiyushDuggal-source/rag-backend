import ollama from 'ollama';
import { retrieveChunksByKeyword } from './reterival';

export async function generateLLMResponse(
  query: string,
  ownerId: string,
  topK: number = 5
): Promise<string> {
  // Retrieve chunks
  const contextChunks = retrieveChunksByKeyword(query, ownerId, topK);
  const contextText = contextChunks.map((chunk) => chunk.text).join('\n');
  const prompt = contextText
    ? `Context:\n${contextText}\n\nQuestion: ${query}`
    : query;

  // Call model
  const response = await ollama.generate({
    model: 'llama2-uncensored',
    prompt,
  });
  if (!response.response) {
    throw new Error('Failed to get response from LLM');
  }
  return response.response;
}
