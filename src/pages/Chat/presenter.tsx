import { useRef } from 'react';
import { ChatMessage, ProChatInstance } from '@ant-design/pro-chat';
import { useModel } from './model';
import Service from './service';
import { LowcodeResponse } from '@/utils/lowcodeResponse';
import { emitter } from '@/utils/emitter';
import { askChatGPT } from '@/webview/service';
import { toLLMMessages } from '@/utils/markdown';

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  const proChatRef = useRef<ProChatInstance>();

  const handleNewMessage = (messages: ChatMessage[]) => {
    const response = new LowcodeResponse();
    emitter.on('LLMChunk', (data) => {
      response.pushData(data.chunck);
    });
    askChatGPT({
      messages: toLLMMessages(messages),
    }).finally(() => {
      setTimeout(() => {
        emitter.off('LLMChunk');
        response.close();
      }, 1000);
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
