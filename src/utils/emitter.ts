import mitt from 'mitt';

type Events = {
  LLMChunk: {
    chunck: string;
    sessionId: number;
    messageId: number;
  };
  askLLM: string;
};

export const emitter = mitt<Events>();
