
"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InstagramEmbed from "@/components/instagram-embed";
import Autoplay from "embla-carousel-autoplay";
import { ContentData } from "@/lib/content-loader";

type TestimonialsProps = {
  content: ContentData['testimonials'];
}


export default function Testimonials({ content }: TestimonialsProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        <div className="mt-16">
            <Carousel
              plugins={[plugin.current]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-2xl mx-auto"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {content.posts.map((post, index) => (
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
