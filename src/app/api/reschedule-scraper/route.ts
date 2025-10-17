
import { NextResponse } from 'next/server';
import { rescheduleScraper } from '@/lib/scheduler';

export async function GET() {
  try {
    await rescheduleScraper();
    return NextResponse.json({ message: 'Agendador da automação reiniciado com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao reiniciar o agendador:', error);
    return NextResponse.json(
      { message: 'Falha ao reiniciar o agendador.', error: error.message },
      { status: 500 }
    );
  }
}

    