import { useRef } from 'react';
import { ChatMessage, ProChatInstance } from '@ant-design/pro-chat';
import { useModel } from './model';
import Service from './service';
import { LowcodeResponse } from '../Tldraw/lib/lowcodeResponse';
import { emitter } from '@/utils/emitter';
import { askChatGPT } from '@/webview/service';
import { toLLMMessage } from '@/utils/markdown';

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  const proChatRef = useRef<ProChatInstance>();

  const handleNewMessage = (message: ChatMessage) => {
    const response = new LowcodeResponse();
    emitter.on('LLMChunk', (data) => {
      response.pushData(data.chunck);
    });
    askChatGPT({
      messages: toLLMMessage(message.content as string),
    }).finally(() => {
      emitter.off('LLMChunk');
      response.close();
    });
    return response;
  };

  return {
    model,
    service,
    proChatRef,
    handleNewMessage,
  };
};
