import { useEditor, useToasts } from '@tldraw/tldraw';
import { useCallback } from 'react';
import { makeReal } from '../lib/makeReal';

export function useMakeReal() {
  const editor = useEditor();
  const toast = useToasts();

  return useCallback(async () => {
    let res: { dataUrl: string; text?: string } | undefined;
    try {
      res = await makeReal(editor);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.addToast({
        title: 'Something went wrong',
        description: `${e.message.slice(0, 200)}`,
      });
    }
    return res;
  }, [editor, toast]);
}
