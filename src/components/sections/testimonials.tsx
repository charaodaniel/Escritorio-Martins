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
    "A LexPage foi fundamental em nossa fusão corporativa. A atenção aos detalhes e a expertise jurídica foram inigualáveis.",
    "Após meu acidente, eu estava perdido. A equipe da LexPage cuidou do meu caso de lesão corporal com tanto cuidado e profissionalismo.",
    "Como startup, navegar pela lei de propriedade intelectual era assustador. A LexPage protegeu nossos ativos e nos deu tranquilidade.",
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
            O Que Nossos Clientes Dizem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Diga-nos sua necessidade jurídica e mostraremos depoimentos de clientes que ajudamos em situações semelhantes.
          </p>
        </div>
        
        <div className="mt-8 max-w-xl mx-auto flex gap-2">
            <Input 
                type="text"
                placeholder="ex: 'lesão corporal' ou 'contrato comercial'"
                value={legalNeed}
                onChange={(e) => setLegalNeed(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isPending} style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
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
