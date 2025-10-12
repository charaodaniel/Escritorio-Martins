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
        case "Direito do Consumidor": return icons
    }
}

type PracticeAreasProps = {
  content: ContentData['practiceAreas'];
}

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
            const Icon = getIcon(area.title) || icons.FileText;

            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-6 items-center">
                  <Icon className="h-8 w-8 text-primary mr-4" />
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
