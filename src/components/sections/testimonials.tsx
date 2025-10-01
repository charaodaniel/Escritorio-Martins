import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";

const testimonials = [
    "Excelente banca de advocacia. Profissionais competentes e atendimento personalizado que fizeram toda a diferença no meu caso.",
    "A equipe do Vieira & Martins foi incansável na defesa dos meus direitos. Sou muito grato pela agilidade e transparência.",
    "Recomendo o escritório a todos em Manoel Viana. Encontrei o suporte jurídico que precisava com um atendimento humano e eficiente.",
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A satisfação de nossos clientes é o nosso maior reconhecimento.
          </p>
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
