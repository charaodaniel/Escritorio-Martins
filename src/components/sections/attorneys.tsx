import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const attorneys = [
  {
    name: "Jéssica Miller",
    title: "Sócia-Gerente",
    bio: "Com mais de 20 anos de experiência em direito societário, Jéssica é uma líder reconhecida em litígios de alto risco e fusões.",
    imageId: "attorney-1"
  },
  {
    name: "David Chen",
    title: "Sócio Sênior, Defesa Criminal",
    bio: "David é um defensor feroz de seus clientes, com um histórico comprovado de sucesso em casos complexos de defesa criminal.",
    imageId: "attorney-2"
  },
  {
    name: "Michael Rodriguez",
    title: "Associado, Direito de Família",
    bio: "Michael traz empatia e aguçada perspicácia jurídica para questões sensíveis de direito de família, sempre priorizando o bem-estar de seus clientes.",
    imageId: "attorney-3"
  },
];

export default function Attorneys() {
  return (
    <section id="attorneys" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Conheça Nossa Equipe Dedicada
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nossos advogados são talentosos, apaixonados e comprometidos em fornecer um serviço jurídico excepcional.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {attorneys.map((attorney) => {
            const image = PlaceHolderImages.find(img => img.id === attorney.imageId);
            return (
              <Card key={attorney.name} className="overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardHeader className="p-6 items-center bg-background">
                  {image && (
                     <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                        <AvatarImage src={image.imageUrl} alt={attorney.name} data-ai-hint={image.imageHint} />
                        <AvatarFallback>{attorney.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="mt-4">
                     <CardTitle className="font-headline text-xl">{attorney.name}</CardTitle>
                     <p className="text-sm text-primary">{attorney.title}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
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
