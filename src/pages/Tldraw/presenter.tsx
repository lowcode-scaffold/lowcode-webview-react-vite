import { ChatMessage, ProChatInstance } from '@ant-design/pro-chat';
import { useRef } from 'react';
import { getMaterialPath, runScript } from '@/webview/service';
import { useModel } from './model';
import Service from './service';

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

  const handleNewMessage = (message: ChatMessage) => {};

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
