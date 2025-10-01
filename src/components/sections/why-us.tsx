import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Smile, ShieldCheck } from "lucide-react";

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
    <section id="why-us" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Por que nos escolher?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Combinamos conhecimento técnico, atendimento dedicado e experiência local para defender seus direitos com excelência.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
               <div className="flex justify-center items-center mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
