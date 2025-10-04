import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const attorneys = [
  {
    id: "gilberto-martins",
    name: "Gilberto Martins",
    title: "Sócio Fundador",
    bio: "Com vasta experiência em direito cível e empresarial, Gilberto é reconhecido por sua abordagem estratégica e dedicação incansável aos seus clientes.",
    imageId: "attorney-1"
  },
  {
    id: "eduardo-martins",
    name: "Eduardo Martins",
    title: "Sócio",
    bio: "Especialista em direito de família e sucessões, Eduardo combina conhecimento técnico com uma abordagem humana para resolver questões complexas.",
    imageId: "attorney-2"
  },
];

export default function Attorneys() {
  return (
    <section id="attorneys" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Conheça Nossa Equipe
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Profissionais dedicados e apaixonados pelo direito, comprometidos em oferecer a melhor solução jurídica para você.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 justify-center">
          {attorneys.map((attorney) => {
            const image = PlaceHolderImages.find(img => img.id === attorney.imageId);
            if (!image) return null;
            return (
              <Card key={attorney.id} className="overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 max-w-sm mx-auto">
                <CardHeader className="p-6 items-center bg-background">
                     <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                        <AvatarImage src={image.imageUrl} alt={attorney.name} data-ai-hint={image.imageHint} className="object-cover" />
                        <AvatarFallback>{attorney.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  <div className="mt-4">
                     <CardTitle className="font-headline text-2xl">{attorney.name}</CardTitle>
                     <p className="text-md text-primary">{attorney.title}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-3">
                  <p className="text-muted-foreground">{attorney.bio}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
