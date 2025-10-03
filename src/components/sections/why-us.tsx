import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Smile, ShieldCheck } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    icon: Smile,
    title: "Atendimento Personalizado",
    description: "Cada cliente é ouvido com empatia e as estratégias são feitas sob medida para cada caso.",
  },
  {
    icon: MapPin,
    title: "Experiência Local",
    description: "Conhecemos a realidade de Manoel Viana, as instituições e as particularidades das leis locais.",
  },
  {
    icon: ShieldCheck,
    title: "Suporte Ágil",
    description: "Oferecemos respostas rápidas e um acompanhamento próximo e dedicado a cada etapa do seu processo.",
  },
  {
    icon: Users,
    title: "Ética e Transparência",
    description: "Honorários claros e comunicação aberta e honesta durante todo o processo de atendimento.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Por que nos escolher?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Combinamos conhecimento técnico, atendimento dedicado e experiência local para defender seus direitos com excelência.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mt-16"
        >
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="text-center bg-transparent border-0 shadow-none flex flex-col h-full">
                    <CardHeader className="flex justify-center items-center mb-2">
                      <div className="bg-background rounded-full p-5">
                        <feature.icon className="h-10 w-10 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardTitle className="text-xl font-bold font-headline mb-3 text-primary">{feature.title}</CardTitle>
                      <p className="text-muted-foreground">{feature.description}</p>
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
    </section>
  );
}
