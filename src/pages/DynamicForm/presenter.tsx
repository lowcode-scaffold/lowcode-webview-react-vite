import { useEffect } from 'react';
import { message } from 'antd';
import { useModel } from './model';
import Service from './service';

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  useEffect(() => {
    service.getDynamicForm();
  }, []);

  const handleCloseScriptModal = () => {
    model.setScriptModal((s) => {
      s.visible = false;
      s.loading = false;
    });
  };

  const handleScriptModalOk = (getValues: () => object, updateValues: (values: object) => void) => {
    service.runScript(getValues()).then((res) => {
      if (!res.updateModelImmediately && !res.onlyUpdateParams) {
        model.setUpdateModelModal((s) => {
          s.visible = true;
          s.model = JSON.stringify(res.model, null, 2);
        });
      }
      if (res.updateModelImmediately) {
        message.success('执行成功');
        updateValues(res.model);
      }
      if (res.onlyUpdateParams) {
        model.setScriptModal((s) => {
          s.params = res.params || '';
        });
      } else {
        model.setScriptModal((s) => {
          s.visible = false;
        });
      }
    });
  };

  return {
    model,
    service,
    handleCloseScriptModal,
    handleScriptModalOk,
  };
};
