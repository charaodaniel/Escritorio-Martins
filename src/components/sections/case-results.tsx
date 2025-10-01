import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, Target } from "lucide-react";

const caseResults = [
  {
    title: "Fusão Corporativa Multimilionária",
    description: "Navegamos com sucesso por negociações complexas e barreiras regulatórias para facilitar uma fusão histórica para uma empresa de tecnologia líder, resultando em uma avaliação de R$250M.",
    outcome: "Fusão de R$250M",
    imageId: "case-result-1"
  },
  {
    title: "Acordo Complexo de Lesão Corporal",
    description: "Garantimos um acordo de sete dígitos para um cliente em um caso desafiador de lesão corporal, assegurando segurança financeira a longo prazo e cobrindo todas as despesas médicas.",
    outcome: "Acordo de R$1.2M",
    imageId: "case-result-2"
  },
];

export default function CaseResults() {
  return (
    <section id="results" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Histórico Comprovado de Sucesso
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nossos resultados falam por si. Estamos dedicados a alcançar resultados favoráveis para nossos clientes através de uma advocacia estratégica e incansável.
          </p>
        </div>
        <div className="mt-12 space-y-12">
          {caseResults.map((result, index) => {
            const image = PlaceHolderImages.find(img => img.id === result.imageId);
            return (
              <Card key={index} className="overflow-hidden transition-shadow hover:shadow-xl">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <CardContent className="p-0">
                      <h3 className="font-headline text-2xl font-bold">{result.title}</h3>
                      <p className="mt-4 text-muted-foreground">{result.description}</p>
                      <div className="mt-6 flex items-center gap-4 text-primary font-semibold">
                        <Award className="h-6 w-6" />
                        <span className="font-headline text-xl">{result.outcome}</span>
                      </div>
                    </CardContent>
                  </div>
                  {image && (
                    <div className="relative min-h-[250px] md:min-h-0">
                      <Image
                        src={image.imageUrl}
                        alt={result.title}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
