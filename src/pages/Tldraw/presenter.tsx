import { ProChatInstance } from '@ant-design/pro-chat';
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

  const hanldeMakeReal = () => {
    proChatRef.current?.sendMessage('6666');
  };

  return {
    model,
    service,
    handleRunScript,
    handleGetMaterialPath,
    hanldeMakeReal,
    proChatRef,
  };
};
