
import { NextRequest, NextResponse } from 'next/server';
import { loadUsers } from '@/lib/users-loader';

// Rotas que exigem autenticação
const protectedRoutes = ['/admin', '/api/get-all-users-for-update', '/api/run-scraper', '/api/reschedule-scraper'];

// Este middleware protege as rotas administrativas com autenticação básica.
export function middleware(req: NextRequest) {
  const isProtectedPath = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  if (isProtectedPath) {
    const users = loadUsers();
    
    // Em ambiente de desenvolvimento, se o array de usuários estiver vazio, permite o acesso.
    if (process.env.NODE_ENV === 'development' && users.length === 0) {
      console.warn("Autenticação do painel desabilitada. Nenhum usuário encontrado em src/data/users.json.");
      return NextResponse.next();
    }
    
    // Se não houver usuários configurados em produção, nega o acesso.
    if (users.length === 0) {
        return new NextResponse('Configuration error: No admin users defined.', { status: 500 });
    }

    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

      // Verifica se as credenciais correspondem a algum usuário no arquivo JSON
      const isValid = users.some(
        (u) => u.username === user && u.password === pwd
      );

      if (isValid) {
        return NextResponse.next(); // Acesso permitido
      }
    }

    // Se a autenticação falhar ou não for fornecida, solicita as credenciais.
    return new NextResponse('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  // O matcher precisa cobrir todas as rotas protegidas
  matcher: ['/admin/:path*', '/api/get-all-users-for-update/:path*', '/api/run-scraper/:path*', '/api/reschedule-scraper/:path*'],
};
