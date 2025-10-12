
import { NextResponse } from 'next/server';
import { loadUsers } from '@/lib/users-loader';

// This is a special route only used by the admin panel to get all user data
// including passwords, which is necessary to re-save the file without losing data.
// This route should be protected by the same middleware as the admin panel.
export async function GET() {
  try {
    const users = loadUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Erro ao ler o arquivo de usuários:", error);
    return NextResponse.json(
      { message: 'Não foi possível carregar os usuários.' },
      { status: 500 }
    );
  }
}
