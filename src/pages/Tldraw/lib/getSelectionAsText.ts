import { Editor, TLGeoShape, TLTextShape } from '@tldraw/tldraw';

export function getSelectionAsText(editor: Editor) {
  const selectedShapeIds = editor.getSelectedShapeIds();
  const selectedShapeDescendantIds = editor.getShapeAndDescendantIds(selectedShapeIds);

  const texts = Array.from(selectedShapeDescendantIds)
    .map((id) => {
      const shape = editor.getShape(id)!;
      return shape;
    })
    .filter((shape) => {
      return (
        shape.type === 'text' ||
        shape.type === 'geo' ||
        shape.type === 'arrow' ||
        shape.type === 'note'
      );
    })
    .sort((a, b) => {
      // top first, then left, based on page position
      const pageBoundsA = editor.getShapePageBounds(a);
      const pageBoundsB = editor.getShapePageBounds(b);

      // eslint-disable-next-line no-nested-ternary
      return pageBoundsA?.y === pageBoundsB?.y
        ? pageBoundsA!.x < pageBoundsB!.x
          ? -1
          : 1
        : pageBoundsA!.y < pageBoundsB!.y
          ? -1
          : 1;
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .map((shape: TLTextShape | TLGeoShape) => {
      if (!shape) return null;
      const text = shape.props.text ?? null;
      if (shape.props.color === 'red') {
        return `Annotation: ${text}`;
      }
      return text;
    })
    .filter((v) => !!v);

  return texts.join('\n');
}
