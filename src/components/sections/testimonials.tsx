
"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InstagramImage from "@/components/instagram-image";
import FacebookEmbed from "@/components/facebook-embed";
import Autoplay from "embla-carousel-autoplay";
import { ContentData } from "@/lib/content-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Facebook } from 'lucide-react';
import { cn } from "@/lib/utils";


type TestimonialsProps = {
  content: ContentData['testimonials'];
}


export default function Testimonials({ content }: TestimonialsProps) {
  const instagramPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const facebookPlugin = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  )

  const isInstagramVisible = content.instagram.enabled && content.instagram.posts && content.instagram.posts.length > 0;
  const isFacebookVisible = content.facebook.enabled && content.facebook.posts && content.facebook.posts.length > 0;

  if (!isInstagramVisible && !isFacebookVisible) {
    return null;
  }

  const defaultTab = isInstagramVisible ? "instagram" : "facebook";

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
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className={cn(
                "grid w-full max-w-sm mx-auto",
                isInstagramVisible && isFacebookVisible ? "grid-cols-2" : "grid-cols-1"
              )}>
                {isInstagramVisible && (
                  <TabsTrigger value="instagram">
                    <Instagram className="mr-2" /> Instagram
                  </TabsTrigger>
                )}
                {isFacebookVisible && (
                  <TabsTrigger value="facebook">
                    <Facebook className="mr-2" /> Facebook
                  </TabsTrigger>
                )}
              </TabsList>
              
              {isInstagramVisible && (
                <TabsContent value="instagram">
                    <Carousel
                    plugins={[instagramPlugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto mt-8"
                    onMouseEnter={instagramPlugin.current.stop}
                    onMouseLeave={instagramPlugin.current.reset}
                    >
                    <CarouselContent>
                        {content.instagram.posts.map((post, index) => (
                        <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center">
                            <div className="p-2 w-full max-w-sm">
                              <InstagramImage url={post.permalink} />
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4 hidden xl:flex" />
                    <CarouselNext className="-right-4 hidden xl:flex" />
                    </Carousel>
                </TabsContent>
              )}

              {isFacebookVisible && (
                <TabsContent value="facebook">
                    <Carousel
                    plugins={[facebookPlugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-2xl mx-auto mt-8"
                    onMouseEnter={facebookPlugin.current.stop}
                    onMouseLeave={facebookPlugin.current.reset}
                    >
                    <CarouselContent>
                        {content.facebook.posts.map((post, index) => (
                        <CarouselItem key={index} className="flex justify-center">
                            <div className="p-1">
                              <FacebookEmbed permalink={post.permalink} />
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4 hidden sm:flex" />
                    <CarouselNext className="-right-4 hidden sm:flex" />
                    </Carousel>
                </TabsContent>
              )}
            </Tabs>
        </div>
      </div>
    </section>
  );
}
