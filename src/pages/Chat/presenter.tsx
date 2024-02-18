import { useEffect, useRef } from 'react';
import { ChatMessage, ProChatInstance } from '@ant-design/pro-chat';
import { useModel } from './model';
import Service from './service';
import { LowcodeResponse } from '@/utils/lowcodeResponse';
import { emitter } from '@/utils/emitter';
import { askLLM } from '@/webview/service';
import { toChatGPTMessages } from '@/utils/llm';

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  const proChatRef = useRef<ProChatInstance>();

  useEffect(() => {
    let initPrompt = localStorage.getItem('askLLM');
    const askPrompt = '';
    if (initPrompt && initPrompt !== askPrompt) {
      proChatRef.current?.sendMessage(initPrompt);
    }
    localStorage.removeItem('askLLM');
    initPrompt = '';

    return () => {
      emitter.off('askLLM');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewMessage = (messages: ChatMessage[]) => {
    const response = new LowcodeResponse();
    emitter.on('LLMChunk', (data) => {
      response.pushData(data.chunck);
    });
    askLLM({
      messages: toChatGPTMessages(messages),
      llm: localStorage.getItem('llm') || undefined,
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
