/* eslint-disable @typescript-eslint/no-explicit-any */

import { emitter } from '@/utils/emitter';
import router from '../router';

export const taskHandler: {
  [propName: string]: (data: any) => void;
} = {
  route: (data: { path: string; materialPath: string }) => {
    localStorage.setItem('materialPath', data.materialPath);
    router.navigate(data.path);
  },

  handleLLMChunk: (data: { sessionId: number; messageId: number; content: string }) => {
    emitter.emit('LLMChunk', {
      sessionId: data.sessionId,
      messageId: data.messageId,
      chunck: data.content,
    });
  },
};
