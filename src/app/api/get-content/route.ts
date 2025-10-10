
import { NextResponse } from 'next/server';
import { loadContent } from '@/lib/content-loader';

export async function GET() {
  try {
    const content = loadContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Erro ao ler o arquivo de conteúdo:", error);
    return NextResponse.json(
      { message: 'Não foi possível carregar o conteúdo.' },
      { status: 500 }
    );
  }
}

    