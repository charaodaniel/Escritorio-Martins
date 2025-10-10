
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';

// Desabilita o body parser padrão do Next.js para que o formidable possa lidar com o stream do arquivo
export const config = {
  api: {
    bodyParser: false,
  },
};

// Função para sanitizar o nome do arquivo
const sanitizeFilename = (filename: string): string => {
    // Remove caracteres especiais, exceto ponto e hífen, e substitui espaços por hífens
    return filename.replace(/[^a-zA-Z0-9._-]/g, '').replace(/\s+/g, '-');
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { message: 'Nenhum arquivo enviado.' },
        { status: 400 }
      );
    }
    
    // Sanitiza o nome do arquivo
    const originalFilename = file.name;
    const sanitizedFilename = sanitizeFilename(originalFilename);
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;

    // Define o caminho para salvar o arquivo na pasta public
    const publicFolderPath = path.join(process.cwd(), 'public');
    const filePath = path.join(publicFolderPath, uniqueFilename);
    
    // Converte o arquivo para um buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Salva o arquivo no sistema de arquivos
    await fs.writeFile(filePath, fileBuffer);

    // Retorna o caminho público do arquivo
    const publicPath = `/${uniqueFilename}`;

    return NextResponse.json({ filePath: publicPath }, { status: 200 });

  } catch (error: any) {
    console.error('Erro no upload da imagem:', error);
    return NextResponse.json(
      { message: 'Erro ao processar o upload do arquivo.', error: error.message },
      { status: 500 }
    );
  }
}
