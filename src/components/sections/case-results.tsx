import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, Target } from "lucide-react";

const caseResults = [
  {
    title: "Multi-Million Dollar Corporate Merger",
    description: "Successfully navigated complex negotiations and regulatory hurdles to facilitate a landmark merger for a leading tech firm, resulting in a $250M valuation.",
    outcome: "$250M Merger",
    imageId: "case-result-1"
  },
  {
    title: "Complex Personal Injury Settlement",
    description: "Secured a seven-figure settlement for a client in a challenging personal injury case, ensuring long-term financial security and covering all medical expenses.",
    outcome: "$1.2M Settlement",
    imageId: "case-result-2"
  },
];

export default function CaseResults() {
  return (
    <section id="results" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Proven Track Record of Success
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our results speak for themselves. We are dedicated to achieving favorable outcomes for our clients through strategic and relentless advocacy.
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
