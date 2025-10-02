"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InstagramEmbed from "@/components/instagram-embed";

const instagramPosts = [
    {
        permalink: "https://www.instagram.com/p/C89o-3kRj2C/?utm_source=ig_embed&amp;utm_campaign=loading",
    },
    {
        permalink: "https://www.instagram.com/p/C8e5kZzxbpg/?utm_source=ig_embed&amp;utm_campaign=loading",
    },
    {
        permalink: "https://www.instagram.com/p/C75g8fARj9Z/?utm_source=ig_embed&amp;utm_campaign=loading",
    },
     {
        permalink: "https://www.instagram.com/reel/DO9k047iYWe/?utm_source=ig_embed&amp;utm_campaign=loading",
    },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Nossas Publicações
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Acompanhe nossas últimas postagens e novidades diretamente do nosso Instagram.
          </p>
        </div>
        
        <div className="mt-16">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-2xl mx-auto"
            >
              <CarouselContent>
                {instagramPosts.map((post, index) => (
                  <CarouselItem key={index} className="flex justify-center">
                    <div className="p-1">
                       <InstagramEmbed permalink={post.permalink} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 hidden sm:flex" />
              <CarouselNext className="-right-4 hidden sm:flex" />
            </Carousel>
        </div>
      </div>
    </section>
  );
}
