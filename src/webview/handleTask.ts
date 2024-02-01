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

  handleLLMChunk: (data: { content: string }) => {
    emitter.emit('LLMChunk', {
      chunck: data.content,
    });
  },
};
