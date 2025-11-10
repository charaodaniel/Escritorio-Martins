
import Image from 'next/image';
import Link from 'next/link';
import links from '@/data/useful-links.json';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { loadContent } from '@/lib/content-loader';
import Script from 'next/script';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const metadata = {
    title: "Links Úteis | Vieira & Martins Advogados",
    description: "Uma coleção de links úteis para acesso rápido a serviços e informações importantes em Manoel Viana e região.",
};

const GoogleSearch = () => {
    return (
      <div className="relative w-full">
        <div 
          className="gcse-searchbox-only"
          data-results-url="/uteis/resultados"
          data-new-window="true"
          data-query-parameter-name="search"
        ></div>
        <style jsx global>{`
          .gsc-control-cse {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          .gsc-search-box-tools .gsc-search-box .gsc-input {
            padding-left: 2.5rem !important; 
            height: 40px !important;
          }
          form.gsc-search-box {
            margin-bottom: 0 !important;
          }
          .gsc-input-box {
            border: 1px solid hsl(var(--input)) !important;
            background-color: hsl(var(--background)) !important;
            border-radius: var(--radius) !important;
            height: 40px !important;
            display: flex;
            align-items: center;
          }
          .gsc-search-button-v2 {
            border-radius: var(--radius) !important;
            background-color: hsl(var(--primary)) !important;
            border-color: hsl(var(--primary)) !important;
            width: 80px !important;
            cursor: pointer !important;
          }
          .gsc-search-button-v2:hover {
            background-color: hsl(var(--primary) / 0.9) !important;
          }
           .gsc-search-button-v2 svg {
            width: 16px !important;
            height: 16px !important;
          }
        `}</style>
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>
    );
};

const getFaviconUrl = (url: string) => {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (error) {
        return 'https://www.google.com/s2/favicons?domain=google.com&sz=64';
    }
};

export default function UteisPage() {
    const content = loadContent();

    return (
        <>
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
                                                        unoptimized
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
