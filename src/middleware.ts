
import { NextRequest, NextResponse } from 'next/server';

// Este middleware protege a rota /admin com autenticação básica.
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    // As variáveis de ambiente no Edge Runtime da Vercel não são as mesmas do Node.js.
    // Usaremos as variáveis sem o prefixo NEXT_PUBLIC_ aqui, pois elas são configuradas no ambiente do projeto.
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    // Se as variáveis de ambiente ESTÃO configuradas, checa a autenticação.
    if (adminUser && adminPass) {
      if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

        if (user === adminUser && pwd === adminPass) {
          return NextResponse.next();
        }
      }
      // Se a autenticação falhar, pede as credenciais.
      return new NextResponse('Authentication Required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      });
    }
    
    // Se as variáveis de ambiente NÃO ESTÃO configuradas.
    // Em desenvolvimento, permite o acesso com um aviso.
    if (process.env.NODE_ENV === 'development') {
         console.warn("Autenticação do painel desabilitada. Defina ADMIN_USER e ADMIN_PASS em .env para proteger o painel.");
         return NextResponse.next();
    }

    // Em produção, se as variáveis não estiverem setadas, bloqueia o acesso e pede autenticação
    // em vez de dar 404.
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
