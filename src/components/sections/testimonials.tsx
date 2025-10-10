
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
import FacebookEmbed from "@/components/facebook-embed";
import Autoplay from "embla-carousel-autoplay";
import { ContentData } from "@/lib/content-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Facebook } from 'lucide-react';


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

  const hasInstagramPosts = content.instagramPosts && content.instagramPosts.length > 0;
  const hasFacebookPosts = content.facebookPosts && content.facebookPosts.length > 0;


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
            <Tabs defaultValue="instagram" className="w-full">
              <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2">
                <TabsTrigger value="instagram" disabled={!hasInstagramPosts}>
                  <Instagram className="mr-2" /> Instagram
                </TabsTrigger>
                <TabsTrigger value="facebook" disabled={!hasFacebookPosts}>
                   <Facebook className="mr-2" /> Facebook
                </TabsTrigger>
              </TabsList>
              
              {hasInstagramPosts && (
                <TabsContent value="instagram">
                    <Carousel
                    plugins={[instagramPlugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-2xl mx-auto mt-8"
                    onMouseEnter={instagramPlugin.current.stop}
                    onMouseLeave={instagramPlugin.current.reset}
                    >
                    <CarouselContent>
                        {content.instagramPosts.map((post, index) => (
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
                </TabsContent>
              )}

              {hasFacebookPosts && (
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
                        {content.facebookPosts.map((post, index) => (
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
