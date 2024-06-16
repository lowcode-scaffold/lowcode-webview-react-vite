import { Button, Form, Input, Modal, Select, Space } from 'antd';
import AmisComponent from '@/components/AmisComponent';
import { usePresenter } from './presenter';

const DynamicForm = () => {
  const presenter = usePresenter();
  const { model } = presenter;
  return (
    <div style={{ padding: '20px', boxSizing: 'border-box' }}>
      <AmisComponent
        schema={model.schema}
        renderFooter={(getValues, setValues) => {
          return (
            <>
              <Space>
                <Button
                  className="mb-2"
                  type="primary"
                  onClick={() => {
                    model.setScriptModal((s) => {
                      s.visible = true;
                    });
                  }}
                >
                  执行脚本
                </Button>
                <Button
                  className="mb-2"
                  type="primary"
                  onClick={() => {
                    model.setUpdateModelModal((s) => {
                      s.model = JSON.stringify(getValues(), null, 2);
                      s.visible = true;
                    });
                  }}
                >
                  修改数据
                </Button>
              </Space>
              <Modal
                title="执行脚本"
                open={model.scriptModal.visible}
                cancelText="取消"
                okText="确定"
                okButtonProps={{
                  disabled: !model.scriptModal.method,
                  loading: model.scriptModal.loading,
                }}
                onCancel={presenter.handleCloseScriptModal}
                onOk={() => {
                  presenter.handleScriptModalOk(getValues, setValues);
                }}
              >
                <Form layout="vertical">
                  <Form.Item label="方法">
                    <Select
                      placeholder="请选择"
                      value={model.scriptModal.method}
                      onChange={(value) => {
                        model.setScriptModal((s) => {
                          s.method = value;
                        });
                      }}
                    >
                      {model.scriptModal.scripts.map((item) => (
                        <Select.Option value={item.method} key={item.method}>
                          {`${item.method}${item.remark ? `（${item.remark}）` : ''}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="参数">
                    <Input.TextArea
                      value={model.scriptModal.params}
                      rows={8}
                      onChange={(e) => {
                        const { value } = e.target;
                        model.setScriptModal((s) => {
                          s.params = value;
                        });
                      }}
                    />
                  </Form.Item>
                </Form>
              </Modal>
              <Modal
                title="修改数据"
                open={model.updateModelModal.visible}
                cancelText="取消"
                okText="确定"
                onCancel={() => {
                  model.setUpdateModelModal((s) => {
                    s.visible = false;
                  });
                }}
                onOk={() => {
                  setValues(JSON.parse(model.updateModelModal.model));
                  model.setUpdateModelModal((s) => {
                    s.visible = false;
                  });
                }}
              >
                <Form layout="vertical">
                  <Form.Item>
                    <Input.TextArea
                      value={model.updateModelModal.model}
                      rows={8}
                      onChange={(e) => {
                        const { value } = e.target;
                        model.setUpdateModelModal((s) => {
                          s.model = value;
                        });
                      }}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </>
          );
        }}
      />
    </div>
  );
};

export default DynamicForm;
