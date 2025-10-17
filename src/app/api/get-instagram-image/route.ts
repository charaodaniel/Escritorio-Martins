
import { NextRequest, NextResponse } from 'next/server';

// Rota da API para buscar a imagem de uma publicação do Instagram
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
  }

  try {
    // Adiciona um user-agent para simular um navegador e evitar bloqueios
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    });

    if (!response.ok) {
        throw new Error(`Falha ao buscar a URL: ${response.statusText}`);
    }

    const html = await response.text();
    
    // A regex busca pela propriedade "display_url" no JSON embutido na página do Instagram
    const match = html.match(/"display_url":"([^"]+)"/);

    if (!match || !match[1]) {
      throw new Error('Imagem não encontrada no HTML da página.');
    }

    // A URL pode conter caracteres de escape como \u0026 para &, então decodificamos
    const imageUrl = JSON.parse(`"${match[1]}"`);

    return NextResponse.json({ imageUrl });

  } catch (err: any) {
    console.error(`Erro na API /api/get-instagram-image para a URL: ${url}`, err);
    return NextResponse.json({ error: err.message || 'Erro desconhecido ao processar a URL.' }, { status: 500 });
  }
}
