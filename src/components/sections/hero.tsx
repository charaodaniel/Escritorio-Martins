import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto">
           <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Vieira & Martins Advogados
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200 sm:text-xl max-w-2xl mx-auto">
            Segurança Jurídica com Excelência em Manoel Viana
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
              <Link href="https://wa.me/5555999169181" target="_blank" rel="noopener noreferrer">Fale Conosco no WhatsApp</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white transform transition-transform hover:scale-105">
              <Link href="#practice-areas">Nossas Áreas</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link href="#practice-areas" aria-label="Rolar para a próxima seção">
          <ArrowDown className="h-8 w-8 text-white/70 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
