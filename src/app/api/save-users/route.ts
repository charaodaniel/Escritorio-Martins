
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// API route to save the users file
export async function POST(req: NextRequest) {
  const newUsersJSON = await req.json();

  if (process.env.NODE_ENV === 'development') {
    try {
      const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
      const newUsersString = JSON.stringify(newUsersJSON, null, 2);
      await fs.writeFile(filePath, newUsersString, 'utf-8');

      console.log("Usuários salvos localmente em src/data/users.json");

      return NextResponse.json({ message: 'Usuários salvos localmente com sucesso!' }, { status: 200 });

    } catch (error: any) {
      console.error('Erro ao salvar usuários localmente:', error);
      return NextResponse.json(
        { message: error.message || 'Ocorreu um erro ao salvar o arquivo de usuários localmente.' },
        { status: 500 }
      );
    }
  }

  // Production logic (save to GitHub)
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO;
  const FILE_PATH = 'src/data/users.json';
  const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return NextResponse.json(
      { message: 'Variáveis de ambiente GITHUB_TOKEN ou GITHUB_REPO não configuradas.' },
      { status: 500 }
    );
  }

  try {
    const currentFileResponse = await fetch(API_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!currentFileResponse.ok) {
       const errorData = await currentFileResponse.json();
      throw new Error(`Falha ao buscar o arquivo de usuários no GitHub: ${errorData.message}`);
    }

    const currentFileData = await currentFileResponse.json();
    const currentFileSha = currentFileData.sha;

    const newContentString = JSON.stringify(newUsersJSON, null, 2);
    const newContentBase64 = Buffer.from(newContentString).toString('base64');

    const updateResponse = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Atualização de usuários via painel administrativo',
        content: newContentBase64,
        sha: currentFileSha,
      }),
    });

    if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(`Falha ao fazer commit do arquivo de usuários no GitHub: ${errorData.message}`);
    }

    return NextResponse.json({ message: 'Usuários atualizados com sucesso no GitHub!' }, { status: 200 });

  } catch (error: any) {
    console.error('Erro na API /api/save-users (Produção):', error);
    return NextResponse.json(
      { message: error.message || 'Ocorreu um erro interno no servidor.' },
      { status: 500 }
    );
  }
}

    