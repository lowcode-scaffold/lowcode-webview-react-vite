import { useState } from 'react';
import { getMaterialPath, runScript } from './webview/service';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.less';

function App() {
  const [count, setCount] = useState(0);
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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      <div className="fw100 animate-bounce-alt animate-count-infinite animate-duration-1s text-5xl">
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
      {materialPath && <div className="mt-4">materialPath：{materialPath}</div>}
    </>
  );
}

export default App;
