
import Image from 'next/image';
import Link from 'next/link';
import links from '@/data/useful-links.json';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { loadContent } from '@/lib/content-loader';
import Script from 'next/script';

export const metadata = {
    title: "Links Úteis | Vieira & Martins Advogados",
    description: "Uma coleção de links úteis para acesso rápido a serviços e informações importantes.",
};

const GoogleSearch = () => {
    return (
      <div className="gcse-searchbox-only" data-resultsurl="/uteis/resultados"></div>
    );
};

export default function UteisPage() {
    const content = loadContent();
    
    return (
        <>
            <Script async src="https://cse.google.com/cse.js?cx=84751531899169668" />
            <div className="flex min-h-screen flex-col bg-background">
                <Header content={content.contactInfo} />
                <main className="flex-1">
                    <section className="py-12 sm:py-16">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="text-center max-w-3xl mx-auto">
                                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                                    Links Úteis
                                </h1>
                                <p className="mt-6 text-lg text-muted-foreground">
                                    Acesse rapidamente sites e serviços importantes.
                                </p>
                            </div>

                            <div className="max-w-2xl mx-auto my-8">
                                <GoogleSearch />
                            </div>

                            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                                {links.map((link) => (
                                    <Link href={link.url} key={link.name} target="_blank" rel="noopener noreferrer" className="block group">
                                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                                            <CardContent className="p-2 sm:p-4 flex flex-col items-center justify-center gap-2 h-full">
                                                <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                                                    <Image
                                                        src={link.logo}
                                                        alt={`${link.name} logo`}
                                                        fill
                                                        className="object-contain"
                                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 10vw"
                                                    />
                                                </div>
                                                <p className="text-xs sm:text-sm text-center text-muted-foreground group-hover:text-primary transition-colors truncate w-full">
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

    