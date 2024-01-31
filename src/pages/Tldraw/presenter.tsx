import { ChatMessage, ProChatInstance } from '@ant-design/pro-chat';
import { useRef } from 'react';
import { askGemini, getMaterialPath, runScript } from '@/webview/service';
import { useModel } from './model';
import Service from './service';
import { emitter } from '@/utils/emitter';
import { LowcodeResponse } from './lib/lowcodeResponse';

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  const proChatRef = useRef<ProChatInstance>();

  const handleRunScript = () => {
    runScript<string>({
      materialPath: localStorage.getItem('materialPath') || '',
      script: 'testScript',
      params: '',
    }).then((res) => {
      model.setScriptRes(res);
    });
  };

  const handleGetMaterialPath = () => {
    getMaterialPath().then((res) => {
      model.setMaterialPath(res);
    });
  };

  const hanldeMakeReal = (data: { dataUrl: string; text?: string | undefined }) => {
    proChatRef.current?.sendMessage(`![](${data.dataUrl})${data.text || ''}`);
  };

  const handleNewMessage = (message: ChatMessage) => {
    const response = new LowcodeResponse();
    emitter.on('LLMChunk', (data) => {
      response.pushData(data.chunck);
    });
    askGemini({
      messages: [{ role: 'user', content: message.content as string }],
    }).finally(() => {
      emitter.off('LLMChunk');
      response.close();
    });
    return response;
  };

  return {
    model,
    service,
    handleRunScript,
    handleGetMaterialPath,
    hanldeMakeReal,
    proChatRef,
    handleNewMessage,
  };
};
