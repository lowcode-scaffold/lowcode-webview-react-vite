import mitt from 'mitt';

type Events = {
  LLMChunk: {
    chunck: string;
  };
  askLLM: string;
};

export const emitter = mitt<Events>();
