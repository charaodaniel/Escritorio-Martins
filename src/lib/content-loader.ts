import content from '@/data/content.json';

export type ContentData = typeof content;

export function loadContent(): ContentData {
  return content;
}
