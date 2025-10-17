import { NextResponse } from 'next/server';
import { runScraper } from '@/lib/scraper';

export async function GET() {
  // A execução do scraper pode demorar um pouco.
  console.log('Iniciando scraper manualmente via API...');
  
  try {
    await runScraper();
    console.log('Scraper executado com sucesso via API.');
    return NextResponse.json({ message: 'Automação do Instagram executada com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao executar o scraper via API:', error);
    return NextResponse.json(
      { message: 'Falha ao executar a automação.', error: error.message },
      { status: 500 }
    );
  }
}
