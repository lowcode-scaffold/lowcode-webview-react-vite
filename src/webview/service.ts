import { request } from './index';

export function runScript(data: {
  materialPath: string;
  script: string;
  params: string;
  clipboardImage: string;
  model: object;
  privateMaterials?: boolean;
  createBlockPath?: string;
}) {
  return request<object>({
    cmd: 'runScript',
    data,
  });
}
