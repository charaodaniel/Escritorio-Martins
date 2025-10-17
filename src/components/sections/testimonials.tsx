
"use client";

import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ContentData } from "@/lib/content-loader";
import { Instagram } from 'lucide-react';


type TestimonialsProps = {
  content: ContentData['testimonials'];
}


export default function Testimonials({ content }: TestimonialsProps) {
  const instagramPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  useEffect(() => {
    // Carrega o script do Instagram se ele ainda não estiver na página
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // O Instagram `embed.js` tem uma função `window.instgrm.Embeds.process()`
    // que podemos chamar para renderizar novos embeds que foram adicionados dinamicamente.
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

    return () => {
      // Limpa o script se o componente for desmontado, opcional
      // document.body.removeChild(script);
    };
  }, [content.instagram.posts]);

  const isInstagramVisible = content.instagram.enabled && content.instagram.posts && content.instagram.posts.length > 0;

  if (!isInstagramVisible) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {content.title}
          </h2>
          <div className="mt-6 text-lg text-muted-foreground prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content.subtitle }}
          />
        </div>
        
        <div className="mt-16">
            <div className="flex justify-center mb-8">
              <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background bg-background text-foreground shadow-sm">
                    <Instagram className="mr-2" /> Instagram
                </div>
              </div>
            </div>
            <Carousel
              plugins={[instagramPlugin.current]}
              opts={{
                  align: "start",
                  loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
              onMouseEnter={instagramPlugin.current.stop}
              onMouseLeave={instagramPlugin.current.reset}
            >
            <CarouselContent>
                {content.instagram.posts.map((post, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 flex justify-center">
                    <div 
                      className="p-2 w-full max-w-sm"
                      dangerouslySetInnerHTML={{ __html: post.embedCode }}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 hidden xl:flex" />
            <CarouselNext className="-right-4 hidden xl:flex" />
            </Carousel>
        </div>
      </div>
    </section>
  );
}

// Declaração para o objeto global do Instagram para o TypeScript
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
