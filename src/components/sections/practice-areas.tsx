import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Briefcase, Home, Shield, Scale } from "lucide-react";

const practiceAreas = [
  {
    icon: Scale,
    title: "Direito Cível",
    description: "Orientação em contratos, responsabilidade civil, obrigações e outros.",
  },
  {
    icon: Users,
    title: "Família e Sucessões",
    description: "Atuação em divórcios, inventários, testamentos, partilha de bens e pensão.",
  },
  {
    icon: Briefcase,
    title: "Direito Trabalhista",
    description: "Defesa em reclamações trabalhistas, rescisões, e orientações preventivas.",
  },
  {
    icon: Shield,
    title: "Direito do Consumidor",
    description: "Proteção dos seus direitos em relações de consumo contra práticas abusivas.",
  },
  {
    icon: Home,
    title: "Direito Imobiliário",
    description: "Assessoria em compra e venda, aluguel, usucapião e regularização de imóveis.",
  },
  {
    icon: FileText,
    title: "Outras Áreas",
    description: "Consulte-nos para outras demandas jurídicas. Estamos prontos para ajudar.",
  },
];

export default function PracticeAreas() {
  return (
    <section id="practice-areas" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Nossas Áreas de Atuação
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Oferecemos soluções jurídicas claras, seguras e sob medida para cada cliente em diversas áreas do direito.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Card key={index} className="flex flex-col text-center items-center p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card rounded-xl">
              <CardHeader className="p-0">
                <div className="bg-primary/10 rounded-full p-5 mb-5 inline-flex">
                   <area.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-3">
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
