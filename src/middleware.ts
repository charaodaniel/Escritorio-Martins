
import { NextRequest, NextResponse } from 'next/server';

// Este middleware protege a rota /admin com autenticação básica.
export function middleware(req: NextRequest) {
  // Temporariamente desabilitado para pular o login
  return NextResponse.next();
  
  /*
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    if (adminUser && adminPass) {
      if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        // O `atob` é uma função do browser. No Edge runtime, usamos Buffer.
        const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

        if (user === adminUser && pwd === adminPass) {
          return NextResponse.next();
        }
      }
    } else {
        // Se as variáveis de ambiente não estiverem configuradas, permite o acesso em ambiente de desenvolvimento
        if (process.env.NODE_ENV === 'development') {
             console.warn("Autenticação do painel desabilitada. Defina ADMIN_USER e ADMIN_PASS em .env para proteger o painel.");
             return NextResponse.next();
        }
    }


    const url = req.nextUrl;
    url.pathname = '/api/auth-required';

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: ['/admin/:path*'],
};
