
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContentData } from "@/lib/content-loader";

type AttorneysProps = {
  content: ContentData['attorneys'];
}

export default function Attorneys({ content }: AttorneysProps) {
  return (
    <section id="attorneys" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 justify-center">
          {content.members.map((attorney) => {
            return (
              <Card key={attorney.id} className="overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 max-w-sm mx-auto">
                <CardHeader className="p-6 items-center bg-background">
                     <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                        <AvatarImage src={attorney.imageUrl} alt={attorney.name} className="object-cover" />
                        <AvatarFallback>{attorney.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  <div className="mt-4">
                     <CardTitle className="font-headline text-2xl">{attorney.name}</CardTitle>
                     <p className="text-md text-primary">{attorney.title}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-3">
                  <p className="text-muted-foreground whitespace-pre-line text-justify">{attorney.bio}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
