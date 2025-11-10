
import Image from 'next/image';
import Link from 'next/link';
import links from '@/data/useful-links.json';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { loadContent } from '@/lib/content-loader';
import Script from 'next/script';

export const metadata = {
    title: "Links Úteis | Vieira & Martins Advogados",
    description: "Uma coleção de links úteis para acesso rápido a serviços e informações importantes em Manoel Viana e região.",
};

const GoogleSearch = () => {
    return (
      <div 
        className="gcse-searchbox-only" 
        data-results-url="/uteis/resultados" 
        data-new-window="true" 
        data-query-parameter-name="search"
      ></div>
    );
};

const getFaviconUrl = (url: string) => {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (error) {
        // Retorna um ícone padrão em caso de URL inválida
        return 'https://www.google.com/s2/favicons?domain=google.com&sz=64';
    }
};

export default function UteisPage() {
    const content = loadContent();

    return (
        <>
            {/* O script do Google Custom Search Engine é carregado aqui */}
            <Script async src="https://cse.google.com/cse.js?cx=cda8cf135323a4c28" />
            <div className="flex min-h-screen flex-col bg-background">
                <Header content={content.contactInfo} />
                <main className="flex-1">
                    <section className="py-12 sm:py-16">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="text-center max-w-3xl mx-auto">
                                <h1 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                                    Links Úteis
                                </h1>
                                <p className="mt-4 text-base text-muted-foreground">
                                    Acesse rapidamente sites e serviços importantes. Utilize a barra de pesquisa ou navegue pelos links abaixo.
                                </p>
                            </div>

                            <div className="max-w-2xl mx-auto my-8">
                                <GoogleSearch />
                            </div>

                            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {links.map((link) => (
                                    <Link href={link.url} key={link.name} target="_blank" rel="noopener noreferrer" className="block group">
                                        <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 bg-card">
                                            <CardContent className="p-4 flex flex-col items-center justify-center gap-3 h-full">
                                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-border/50 p-2 bg-white">
                                                    <Image
                                                        src={getFaviconUrl(link.url)}
                                                        alt={`Logo do ${link.name}`}
                                                        fill
                                                        className="object-contain"
                                                        sizes="64px"
                                                        unoptimized // Favicons podem não ter os headers corretos para otimização do Next/Image
                                                    />
                                                </div>
                                                <p className="text-sm text-center font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                                    {link.name}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
                <Footer content={content.contactInfo} />
            </div>
        </>
    );
}
