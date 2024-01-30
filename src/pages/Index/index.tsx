import { Spin, message as antdMessage } from 'antd';
import { useEffect } from 'react';
import { getTask } from '@/webview/service';
import { taskHandler } from '@/webview/handleTask';

function Index() {
  useEffect(() => {
    getTask().then((res) => {
      if (res && res.task) {
        if (taskHandler[res.task]) {
          taskHandler[res.task](res.data);
        } else {
          antdMessage.error(`未找到名为 ${res.task} 回调方法!`);
        }
      }
    });
  }, []);

  return (
    <Spin spinning>
      <div className="h-screen w-screen" />;
    </Spin>
  );
}

export default Index;
