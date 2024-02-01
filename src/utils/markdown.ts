import { LLMMessage } from '@/webview/service';
import { OPENAI_USER_PROMPT, OPEN_AI_SYSTEM_PROMPT } from './makeRealPrompt';

export const toLLMMessage = (markdownString: string): LLMMessage => {
  const regex = /!\[.*?\]\((.*?)\)/g;
  const images: string[] = [];

  const replacedMarkdown = markdownString.replace(regex, (match, imageUrl) => {
    images.push(imageUrl);
    return ''; // 删除匹配到的图片标记
  });
  if (images.length > 0) {
    return [
      { role: 'system', content: OPEN_AI_SYSTEM_PROMPT },
      {
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: images[0] } },
          { type: 'text', text: OPENAI_USER_PROMPT },
        ],
      },
    ];
  }
  return [{ role: 'user', content: replacedMarkdown }];
};
