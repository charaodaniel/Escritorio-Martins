import { ContentData } from "@/lib/content-loader";

type OurHistoryProps = {
  content: ContentData['ourHistory'];
}

export default function OurHistory({ content }: OurHistoryProps) {
  return (
    <section id="our-history" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {content.title}
          </h2>
          <div className="mt-8 space-y-6 text-lg text-muted-foreground">
            {content.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
