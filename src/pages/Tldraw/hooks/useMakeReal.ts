import { useEditor, useToasts } from '@tldraw/tldraw';
import { useCallback } from 'react';
import { makeReal } from '../lib/makeReal';

export function useMakeReal() {
  const editor = useEditor();
  const toast = useToasts();

  return useCallback(async () => {
    const input = document.getElementById('openai_key_risky_but_cool') as HTMLInputElement;
    const apiKey = input?.value ?? null;

    try {
      await makeReal(editor, apiKey);
    } catch (e) {
      console.error(e);

      // toast.addToast({
      //   title: 'Something went wrong',
      //   description: `${e.message.slice(0, 200)}`,
      //   actions: [
      //     {
      //       type: 'primary',
      //       label: 'Read the guide',
      //       onClick: () => {
      //         // open a new tab with the url...
      //         window.open(
      //           'https://tldraw.notion.site/Make-Real-FAQs-93be8b5273d14f7386e14eb142575e6e',
      //           '_blank'
      //         );
      //       },
      //     },
      //   ],
      // });
    }
  }, [editor, toast]);
}
