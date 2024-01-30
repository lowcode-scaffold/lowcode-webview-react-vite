import { request } from './index';

export function runScript<T = unknown>(data: {
  materialPath: string;
  script: string;
  params: string;
}) {
  return request<T>({
    cmd: 'runScript',
    data,
  });
}

export function getMaterialPath() {
  return request<string>({
    cmd: 'getMaterialPath',
  });
}

export function getTask() {
  return request<{
    task: 'route';
    data?: unknown;
  }>({
    cmd: 'getTask',
  });
}
