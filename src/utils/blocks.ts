import type { BlocksContent } from '@strapi/blocks-react-renderer';

export function blockText(block: BlocksContent[number]): string {
  return 'children' in block
    ? ((block.children[0] as { text?: string }).text ?? '')
    : '';
}

export function splitAtHeading(
  blocks: BlocksContent,
  level: number,
): { before: BlocksContent; heading: BlocksContent[number] | null; after: BlocksContent } {
  const idx = blocks.findIndex(
    (b) => b.type === 'heading' && (b as { level: number }).level === level,
  );
  if (idx === -1) return { before: blocks, heading: null, after: [] };
  return { before: blocks.slice(0, idx), heading: blocks[idx], after: blocks.slice(idx + 1) };
}
