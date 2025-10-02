import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import InstagramEmbed from "@/components/instagram-embed";

const testimonials = [
    {
        quote: "Excelente banca de advocacia. Profissionais competentes e atendimento personalizado que fizeram toda a diferença no meu caso.",
        author: "Cliente Satisfeito",
    },
    {
        quote: "A equipe do Vieira & Martins foi incansável na defesa dos meus direitos. Sou muito grato pela agilidade e transparência.",
        author: "Pessoa Física",
    },
    {
        quote: "Recomendo o escritório a todos em Manoel Viana. Encontrei o suporte jurídico que precisava com um atendimento humano e eficiente.",
        author: "Empresa Local",
    },
     {
        quote: "Profissionalismo exemplar e resultados que superaram minhas expectativas. Confiança total na equipe.",
        author: "Cliente de Longa Data",
    },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Nossas Publicações
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Acompanhe nossas últimas postagens e novidades diretamente do nosso Instagram.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex items-center justify-center">
                <InstagramEmbed />
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-2xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 h-full">
                      <Card className="flex flex-col justify-center text-center h-full shadow-lg bg-card rounded-xl p-8">
                        <CardContent className="p-0 flex-grow flex flex-col items-center justify-center">
                          <Quote className="h-10 w-10 text-accent/50 mb-6" />
                          <p className="text-muted-foreground text-lg italic leading-relaxed">"{testimonial.quote}"</p>
                           <p className="mt-6 font-bold font-headline text-primary text-lg">- {testimonial.author}</p>
                        </CardContent>
                      </Card>
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
