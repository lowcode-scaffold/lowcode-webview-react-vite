import { ChatMessage } from '@ant-design/pro-chat';
import { LLMMessage } from '@/webview/service';

export const toChatGPTMessages = (massages: ChatMessage[]): LLMMessage => {
  const regex = /!\[.*?\]\((.*?)\)/g;
  const llmMessages: LLMMessage = [];
  massages.forEach((s) => {
    if (s.role !== 'user') {
      llmMessages.push({ role: 'assistant', content: s.content as string });
    } else {
      const images: string[] = [];

      const replacedMarkdown = (s.content! as string).replace(regex, (match, imageUrl) => {
        images.push(imageUrl);
        return ''; // 删除匹配到的图片标记
      });

      if (images.length > 0) {
        llmMessages.push({
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: images[0] } }, // 只取一张图片
            { type: 'text', text: replacedMarkdown as string },
          ],
        });
      } else {
        llmMessages.push({ role: 'user', content: replacedMarkdown as string });
      }
    }
  });
  return llmMessages;
};
