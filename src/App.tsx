import { useState } from 'react';
import { runScript } from './webview/service';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.less';

function App() {
  const [count, setCount] = useState(0);

  const handleRunScript = () => {
    runScript({
      materialPath: localStorage.getItem('materialPath') || '',
      script: 'testScript',
      params: '',
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
        className=" rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        执行脚本
      </button>
    </>
  );
}

export default App;
