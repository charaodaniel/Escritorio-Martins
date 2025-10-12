import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentData } from "@/lib/content-loader";
import { FileText, Users, Briefcase, Home, Shield, Scale } from "lucide-react";

type PracticeAreasProps = {
  content: ContentData['practiceAreas'];
}

const IconComponent = ({ title }: { title: string }) => {
  const className = "h-8 w-8 text-primary mr-4";
  if (title === "Direito Cível") {
    return <Scale className={className} />;
  }
  if (title === "Família e Sucessões") {
    return <Users className={className} />;
  }
  if (title === "Direito Trabalhista") {
    return <Briefcase className={className} />;
  }
  if (title === "Direito do Consumidor") {
    return <Shield className={className} />;
  }
  if (title === "Direito Imobiliário") {
    return <Home className={className} />;
  }
  return <FileText className={className} />;
};


export default function PracticeAreas({ content }: PracticeAreasProps) {
  return (
    <section id="practice-areas" className="py-20 sm:py-28 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {content.title}
          </h2>
           <div className="mt-6 text-lg text-muted-foreground prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content.subtitle }}
          />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {content.areas.map((area, index) => {
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-6 items-center">
                  <IconComponent title={area.title} />
                  <CardTitle className="font-headline text-2xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-muted-foreground prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: area.description }}/>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
