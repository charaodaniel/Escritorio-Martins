"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRelevantTestimonials } from "@/app/actions";
import { Loader2, Quote } from "lucide-react";

const initialTestimonials = [
    "LexPage was instrumental in our corporate merger. Their attention to detail and legal expertise were second to none.",
    "After my accident, I was lost. The team at LexPage handled my personal injury case with such care and professionalism.",
    "As a startup, navigating intellectual property law was daunting. LexPage protected our assets and gave us peace of mind.",
];

export default function Testimonials() {
  const [legalNeed, setLegalNeed] = useState("");
  const [testimonials, setTestimonials] = useState<string[]>(initialTestimonials);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    startTransition(async () => {
      const result = await getRelevantTestimonials(legalNeed);
      setTestimonials(result);
    });
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell us your legal need, and we'll show you testimonials from clients we've helped in similar situations.
          </p>
        </div>
        
        <div className="mt-8 max-w-xl mx-auto flex gap-2">
            <Input 
                type="text"
                placeholder="e.g., 'personal injury' or 'business contract'"
                value={legalNeed}
                onChange={(e) => setLegalNeed(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isPending} style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Find"}
            </Button>
        </div>

        <div className="mt-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex-grow">
                          <Quote className="h-8 w-8 text-primary/30 mb-4" />
                          <p className="text-muted-foreground italic">"{testimonial}"</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
      </div>
    </section>
  );
}
