import contentData from '@/data/content.json';

// Define o tipo com base em uma importação estática para manter a segurança de tipo.
export type ContentData = typeof contentData;

export function loadContent(): ContentData {
  // Importar o JSON diretamente é a forma mais eficiente e segura de carregar 
  // dados estáticos no Next.js, funcionando tanto no servidor quanto no cliente.
  return contentData;
}
