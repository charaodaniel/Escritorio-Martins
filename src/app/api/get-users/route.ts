
import { NextResponse } from 'next/server';
import { loadUsers } from '@/lib/users-loader';

export async function GET() {
  try {
    const users = loadUsers();
    // Omit passwords for security, although this is an admin-only endpoint.
    const safeUsers = users.map(({ password, ...user }) => user);
    return NextResponse.json(safeUsers);
  } catch (error) {
    console.error("Erro ao ler o arquivo de usuários:", error);
    return NextResponse.json(
      { message: 'Não foi possível carregar os usuários.' },
      { status: 500 }
    );
  }
}

    