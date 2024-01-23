import { useState } from 'react';
import { Tldraw } from '@tldraw/tldraw';
import { getMaterialPath, runScript } from './webview/service';
import './App.less';
import '@tldraw/tldraw/tldraw.css';

function App() {
  const [scriptRes, setScriptRes] = useState('');
  const [materialPath, setMaterialPath] = useState('');

  const handleRunScript = () => {
    runScript<string>({
      materialPath: localStorage.getItem('materialPath') || '',
      script: 'testScript',
      params: '',
    }).then((res) => {
      setScriptRes(res);
    });
  };

  const handleGetMaterialPath = () => {
    getMaterialPath().then((res) => {
      setMaterialPath(res);
    });
  };

  return (
    <>
      <div className="h-screen w-screen">
        <Tldraw />
      </div>
      {/* <div className="fw100 animate-bounce-alt animate-count-infinite animate-duration-1s text-5xl">
        UnoCSS
      </div>
      <button
        onClick={handleRunScript}
        className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        执行脚本
      </button>
      {scriptRes && <div className="mt-4">脚本结果：{scriptRes}</div>}
      <button
        onClick={handleGetMaterialPath}
        className="mt-4 flex rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        getMaterialPath
      </button>
      {materialPath && <div className="mt-4">materialPath：{materialPath}</div>} */}
    </>
  );
}

export default App;
