
import { NextResponse } from 'next/server';
import { runScraper } from '@/lib/scraper';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Este endpoint está disponível apenas em ambiente de desenvolvimento por segurança.' }, { status: 403 });
  }

  try {
    const result = await runScraper();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Erro ao executar o scraper via API:', error);
    return NextResponse.json(
      { message: 'Falha ao executar o scraper.', error: error.message },
      { status: 500 }
    );
  }
}
