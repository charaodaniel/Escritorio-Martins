
import { NextRequest, NextResponse } from 'next/server';

// Este middleware protege a rota /admin com autenticação básica.
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    // As variáveis de ambiente no Edge Runtime da Vercel são acessadas via process.env.
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    // Se as credenciais ESTÃO configuradas no ambiente
    if (adminUser && adminPass) {
      if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

        if (user === adminUser && pwd === adminPass) {
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

    // Se as credenciais NÃO ESTÃO configuradas no ambiente.
    // Em desenvolvimento, permite o acesso com um aviso no console.
    if (process.env.NODE_ENV === 'development') {
         console.warn("Autenticação do painel desabilitada. Defina ADMIN_USER e ADMIN_PASS em .env para proteger o painel.");
         return NextResponse.next();
    }

    // Em produção, se as variáveis não estiverem configuradas, o acesso é negado e as credenciais são solicitadas.
    // Isso evita o erro 404 e torna o comportamento mais seguro.
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
  matcher: ['/admin/:path*'],
};
