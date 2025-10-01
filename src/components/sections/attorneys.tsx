import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const attorneys = [
  {
    name: "Jessica Miller",
    title: "Managing Partner",
    bio: "With over 20 years of experience in corporate law, Jessica is a recognized leader in high-stakes litigation and mergers.",
    imageId: "attorney-1"
  },
  {
    name: "David Chen",
    title: "Senior Partner, Criminal Defense",
    bio: "David is a fierce advocate for his clients, with a proven track record of success in complex criminal defense cases.",
    imageId: "attorney-2"
  },
  {
    name: "Michael Rodriguez",
    title: "Associate, Family Law",
    bio: "Michael brings empathy and sharp legal acumen to sensitive family law matters, always prioritizing his clients' well-being.",
    imageId: "attorney-3"
  },
];

export default function Attorneys() {
  return (
    <section id="attorneys" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Meet Our Dedicated Team
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our attorneys are accomplished, passionate, and committed to delivering exceptional legal service.
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
