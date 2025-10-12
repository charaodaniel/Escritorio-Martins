
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContentData } from "@/lib/content-loader";
import { cn } from "@/lib/utils";

type AttorneysProps = {
  content: ContentData['attorneys'];
}

const getBioFormatClass = (format?: string) => {
  switch (format) {
    case 'justify':
      return 'text-justify';
    case 'pre-line':
      return 'whitespace-pre-line';
    default:
      return '';
  }
};

export default function Attorneys({ content }: AttorneysProps) {
  return (
    <section id="attorneys" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {content.title}
          </h2>
           <div className="mt-6 text-lg text-muted-foreground prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content.subtitle }}
          />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 justify-center">
          {content.members.map((attorney) => {
            const bioClass = getBioFormatClass(attorney.bioFormat);
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
                  <div className={cn("text-muted-foreground prose dark:prose-invert max-w-none text-left", bioClass)} dangerouslySetInnerHTML={{ __html: attorney.bio }}/>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
