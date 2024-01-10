import { request } from './index';

export function runScript(data: { materialPath: string; script: string; params: string }) {
  return request<object>({
    cmd: 'runScript',
    data,
  });
}
