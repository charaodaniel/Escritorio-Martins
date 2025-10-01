import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
             <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Vieira & Martins Advogados
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200 sm:text-xl">
              Segurança Jurídica com Excelência em Manoel Viana
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}} className="shadow-lg transform transition-transform hover:scale-105">
                <Link href="https://wa.me/5555999169181" target="_blank" rel="noopener noreferrer">Fale Conosco no WhatsApp</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
