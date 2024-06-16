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
    task: string;
    data?: unknown;
  }>({
    cmd: 'getTask',
  });
}

export type LLMMessage = (
  | {
      role: 'system' | 'assistant';
      content: string;
    }
  | {
      role: 'user';
      content:
        | string
        | (
            | {
                type: 'image_url';
                image_url: { url: string };
              }
            | { type: 'text'; text: string }
          )[];
    }
)[];

export function askGemini(data: { messages: LLMMessage }) {
  return request<{ content: string }>({
    cmd: 'askGemini',
    data,
  });
}

export function askChatGPT(data: { messages: LLMMessage }) {
  return request<{ content: string }>({
    cmd: 'askChatGPT',
    data,
  });
}

export function askLLM(data: { messages: LLMMessage; llm?: 'gemini' | 'geminiProxy' | string }) {
  return request<{ content: string }>({
    cmd: 'askLLM',
    data,
  });
}

export function getDynamicForm() {
  return request<{ schema: object; scripts: { method: string; remark: string }[] }>({
    cmd: 'getDynamicForm',
  });
}

export function runDynamicFormScript(data: { method: string; params: string; model: object }) {
  return request<{
    /** 立即更新 model */
    updateModelImmediately: boolean;
    /** 仅更新参数 */
    onlyUpdateParams: boolean;
    params?: string;
    model: object;
  }>({
    cmd: 'runDynamicFormScript',
    data,
  });
}
