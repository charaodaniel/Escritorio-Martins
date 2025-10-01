import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, Users, Briefcase, Landmark, Shield, Scale } from "lucide-react";

const practiceAreas = [
  {
    icon: Gavel,
    title: "Direito Societário",
    description: "Orientação especializada em constituição de empresas, fusões, aquisições e governança corporativa.",
  },
  {
    icon: Shield,
    title: "Defesa Criminal",
    description: "Defesa vigorosa para indivíduos enfrentando acusações criminais, protegendo seus direitos em cada etapa.",
  },
  {
    icon: Users,
    title: "Direito de Família",
    description: "Condução compassiva de divórcios, guarda de filhos e outras questões familiares sensíveis.",
  },
  {
    icon: Landmark,
    title: "Direito Imobiliário",
    description: "Serviços jurídicos abrangentes para transações imobiliárias residenciais e comerciais.",
  },
  {
    icon: Briefcase,
    title: "Propriedade Intelectual",
    description: "Protegendo suas inovações com expertise em patentes, marcas registradas e direitos autorais.",
  },
  {
    icon: Scale,
    title: "Contencioso Cível",
    description: "Representação estratégica em disputas cíveis para alcançar os melhores resultados possíveis.",
  },
];

export default function PracticeAreas() {
  return (
    <section id="practice-areas" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Nossas Áreas de Especialização
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oferecemos serviços jurídicos especializados em uma ampla gama de áreas de atuação para atender às suas necessidades únicas.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Card key={index} className="flex flex-col text-center items-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="bg-primary/10 rounded-full p-4 mb-4 inline-flex">
                   <area.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-muted-foreground">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
