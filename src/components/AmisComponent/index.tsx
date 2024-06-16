/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { useRef } from 'react';
import { message } from 'antd';
import { render } from 'amis';
import './cxd.css';
import './helper.css';
import 'amis/sdk/iconfont.css';
import axios from 'axios';
import { MessageType } from 'antd/es/message/interface';

const request: { count: number; hideLoading?: MessageType } = {
  count: 0,
  hideLoading: undefined,
};

interface IProps {
  schema: object;
  renderFooter: (getValues: () => object, setValues: (values: object) => void) => React.ReactNode;
}

const AmisComponent = (props: IProps) => {
  const amisScoped = useRef<any>();
  const env = {
    // 下面三个接口必须实现
    fetcher: ({
      url, // 接口地址
      method, // 请求方法 get、post、put、delete
      data, // 请求数据
      responseType,
      config, // 其他配置
      headers, // 请求头
    }: any) => {
      config = config || {};
      config.withCredentials = true;
      responseType && (config.responseType = responseType);

      if (config.cancelExecutor) {
        config.cancelToken = new axios.CancelToken(config.cancelExecutor);
      }

      config.headers = headers || {};
      if (request.count === 0) {
        request.count += 1;
        request.hideLoading = message.loading('loading...', 0);
      }
      if (method !== 'post' && method !== 'put' && method !== 'patch') {
        if (data) {
          config.params = data;
        }
        // (axios as any)[method](url, config)
        return axios
          .request({
            ...config,
            url,
            method,
          })
          .then((res) => {
            if (res.data?.code !== 0 || res.data?.code !== 200) {
              message.error(res.data?.msg || res.data?.message || '请求异常');
            }
            return res;
          })
          .catch((err) => {
            message.error(err?.response?.data?.msg || err?.response?.data?.message || err.message);
            return Promise.reject(err);
          })
          .finally(() => {
            if (request.count > 0) {
              request.count -= 1;
            }
            if (request.count <= 0 && request.hideLoading) {
              request.hideLoading();
            }
          });
      }
      if (data && data instanceof FormData) {
        config.headers = config.headers || {};
        config.headers['Content-Type'] = 'multipart/form-data';
      } else if (
        data &&
        typeof data !== 'string' &&
        !(data instanceof Blob) &&
        !(data instanceof ArrayBuffer)
      ) {
        data = JSON.stringify(data);
        config.headers = config.headers || {};
        config.headers['Content-Type'] = 'application/json';
      }

      return axios
        .request({
          ...config,
          url,
          method,
          data,
        })
        .then((res) => {
          if (res.data?.code !== 0 || res.data?.code !== 200) {
            message.error(res.data?.msg || res.data?.message || '请求异常');
          }
          return res;
        })
        .catch((err) => {
          message.error(err?.response?.data?.msg || err?.response?.data?.message || err.message);
          return Promise.reject(err);
        })
        .finally(() => {
          if (request.count > 0) {
            request.count -= 1;
          }
          if (request.count <= 0 && request.hideLoading) {
            request.hideLoading();
          }
        });
    },
    isCancel: (value: any) => axios.isCancel(value),
    useMobileUI: false,
    copy: (contents: string, options?: any) => {
      navigator.clipboard.writeText(contents);
      message.success('已复制到剪贴板');
    },
  };

  const getValues = () => {
    if (!amisScoped.current.getComponentByName('page.form')) {
      message.info('表单不存在');
      return {};
    }
    return amisScoped.current.getComponentByName('page.form').getValues();
  };

  const setValues = (values: object) => {
    if (!amisScoped.current.getComponentByName('page.form')) {
      message.info('表单不存在');
      return;
    }
    amisScoped.current.getComponentByName('page.form').setValues(values);
  };

  return (
    <div>
      <div className="pb-2">
        {render(
          props.schema as any,
          {
            scopeRef: (ref: any) => {
              amisScoped.current = ref;
            },
            useMobileUI: false,
          },
          env
        )}
      </div>
      <br />
      <div className="flex-center position-fixed bottom-0  w-full bg-white">
        {props.renderFooter(getValues, setValues)}
      </div>
    </div>
  );
};

export default AmisComponent;
