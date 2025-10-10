import fs from 'fs';
import path from 'path';
import contentData from '@/data/content.json';

// Define o tipo com base em uma importação estática para manter a segurança de tipo.
export type ContentData = typeof contentData;

export function loadContent(): ContentData {
  // Em produção ou quando o arquivo não pode ser lido dinamicamente, usa o import estático.
  try {
    // Lê o arquivo dinamicamente para obter o conteúdo mais recente, especialmente em desenvolvimento.
    const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');
    const jsonText = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Não foi possível ler o content.json dinamicamente, usando fallback estático.", error);
    // Fallback para os dados importados estaticamente se a leitura dinâmica falhar.
    return contentData;
  }
}
