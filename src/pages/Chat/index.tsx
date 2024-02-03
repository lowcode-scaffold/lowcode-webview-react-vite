import { ProChat } from '@ant-design/pro-chat';
import { usePresenter } from './presenter';

const Chat = () => {
  const presenter = usePresenter();
  // const { model } = presenter
  return (
    <div className="h-screen w-screen" style={{ backgroundColor: '#f5f5f5' }}>
      <ProChat
        chatRef={presenter.proChatRef}
        helloMessage="欢迎使用，我是你的专属机器人"
        actions={{
          render: (defaultDoms) => [...defaultDoms],
          flexConfig: {
            gap: 24,
            direction: 'horizontal',
            justify: 'space-between',
          },
        }}
        request={async (messages) => {
          return presenter.handleNewMessage(messages).getResponse();
        }}
      />
    </div>
  );
};
export default Chat;
