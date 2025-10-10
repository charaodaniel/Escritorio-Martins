import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentData } from "@/lib/content-loader";
import { FileText, Users, Briefcase, Home, Shield, Scale } from "lucide-react";

const icons = {
  Scale,
  Users,
  Briefcase,
  Shield,
  Home,
  FileText,
};

const getIcon = (title: string) => {
    switch (title) {
        case "Direito Cível": return icons.Scale;
        case "Família e Sucessões": return icons.Users;
        case "Direito Trabalhista": return icons.Briefcase;
        case "Direito do Consumidor": return icons.Shield;
        case "Direito Imobiliário": return icons.Home;
        default: return icons.FileText;
    }
}

type PracticeAreasProps = {
  content: ContentData['practiceAreas'];
}

export default function PracticeAreas({ content }: PracticeAreasProps) {
  return (
    <section id="practice-areas" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.areas.map((area, index) => {
            const Icon = getIcon(area.title);
            return (
                <Card key={index} className="flex flex-col text-center items-center p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card rounded-xl">
                <CardHeader className="p-0">
                    <div className="bg-primary/10 rounded-full p-5 mb-5 inline-flex">
                    <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-3">
                    <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </CardContent>
                </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
