import { Tldraw } from '@tldraw/tldraw';
import { ProChat } from '@ant-design/pro-chat';
import { DraggablePanel } from '@ant-design/pro-editor';
import { usePresenter } from './presenter';
import '@tldraw/tldraw/tldraw.css';
import { useMakeReal } from './hooks/useMakeReal';

function MakeRealButton(props: {
  onClick: (data: { dataUrl: string; text?: string | undefined }) => void;
}) {
  const makeReal = useMakeReal();

  const handleClick = async () => {
    const res = await makeReal();
    if (res) {
      // eslint-disable-next-line react/destructuring-assignment
      props.onClick(res);
    }
  };

  return <a onClick={handleClick}>make real</a>;
}

function Draw() {
  const presenter = usePresenter();
  return (
    <>
      <div className="h-screen w-screen">
        <Tldraw persistenceKey="tldraw">
          <DraggablePanel
            mode="float"
            minHeight={400}
            style={{ background: '#F5F5F5', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ flex: '1' }}>
              <ProChat
                chatRef={presenter.proChatRef}
                helloMessage="欢迎使用，我是你的专属机器人"
                actions={{
                  render: (defaultDoms) => [
                    <MakeRealButton key="user" onClick={presenter.hanldeMakeReal} />,
                    ...defaultDoms,
                  ],
                  flexConfig: {
                    gap: 24,
                    direction: 'horizontal',
                    justify: 'space-between',
                  },
                }}
                request={async (messages) => {
                  return presenter.handleNewMessage(messages.pop()!).getResponse();
                }}
              />
            </div>
          </DraggablePanel>
        </Tldraw>
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

export default Draw;
