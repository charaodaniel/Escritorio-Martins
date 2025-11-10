import contentData from '@/data/content.json';

// Define o tipo com base em uma importação estática para manter a segurança de tipo.
export type ContentData = typeof contentData;

export function loadContent(): ContentData {
  // Em um ambiente Next.js moderno, importar o JSON diretamente é a forma mais
  // eficiente e segura de carregar dados estáticos. O Next.js gerencia o
  // cache e o recarregamento em desenvolvimento automaticamente.
  return contentData;
}
