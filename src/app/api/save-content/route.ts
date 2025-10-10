
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Rota da API para salvar o conteúdo
export async function POST(req: NextRequest) {
  const newContentJSON = await req.json();

  // Se estiver em ambiente de desenvolvimento, salva o arquivo localmente
  if (process.env.NODE_ENV === 'development') {
    try {
      const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');
      const newContentString = JSON.stringify(newContentJSON, null, 2);
      await fs.writeFile(filePath, newContentString, 'utf-8');

      console.log("Conteúdo salvo localmente em src/data/content.json");

      return NextResponse.json({ message: 'Conteúdo salvo localmente com sucesso!' }, { status: 200 });

    } catch (error: any) {
      console.error('Erro ao salvar localmente:', error);
      return NextResponse.json(
        { message: error.message || 'Ocorreu um erro ao salvar o arquivo localmente.' },
        { status: 500 }
      );
    }
  }

  // Lógica para produção (salvar no GitHub)
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO; // Ex: 'seu-usuario/seu-repositorio'
  const FILE_PATH = 'src/data/content.json';
  const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return NextResponse.json(
      { message: 'Variáveis de ambiente GITHUB_TOKEN ou GITHUB_REPO não configuradas.' },
      { status: 500 }
    );
  }

  try {
    // 1. Obter o SHA do arquivo atual no GitHub
    const currentFileResponse = await fetch(API_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!currentFileResponse.ok) {
       const errorData = await currentFileResponse.json();
      throw new Error(`Falha ao buscar o arquivo no GitHub: ${errorData.message}`);
    }

    const currentFileData = await currentFileResponse.json();
    const currentFileSha = currentFileData.sha;

    // 2. Codificar o novo conteúdo para Base64
    const newContentString = JSON.stringify(newContentJSON, null, 2);
    const newContentBase64 = Buffer.from(newContentString).toString('base64');

    // 3. Enviar a atualização via API do GitHub
    const updateResponse = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Atualização de conteúdo via painel administrativo',
        content: newContentBase64,
        sha: currentFileSha, // SHA é obrigatório para atualizar um arquivo existente
      }),
    });

    if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(`Falha ao fazer commit no GitHub: ${errorData.message}`);
    }

    return NextResponse.json({ message: 'Conteúdo atualizado com sucesso no GitHub!' }, { status: 200 });

  } catch (error: any) {
    console.error('Erro na API /api/save-content (Produção):', error);
    return NextResponse.json(
      { message: error.message || 'Ocorreu um erro interno no servidor.' },
      { status: 500 }
    );
  }
}
