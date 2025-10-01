import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const blogPosts = [
  {
    title: "The Importance of Due Diligence in Business Acquisitions",
    excerpt: "Learn why thorough due diligence is the cornerstone of any successful business acquisition and how to avoid common pitfalls.",
    date: "May 20, 2024",
    imageId: "blog-1",
  },
  {
    title: "Understanding Your Rights: What to Do If You're Arrested",
    excerpt: "A step-by-step guide on how to protect your rights and navigate the initial hours following an arrest.",
    date: "May 15, 2024",
    imageId: "blog-2",
  },
  {
    title: "Navigating Copyright Law in the Digital Age",
    excerpt: "Explore the challenges and strategies for protecting your creative work online in an era of rapid technological change.",
    date: "May 10, 2024",
    imageId: "blog-3",
  },
];

export default function BlogFeed() {
  return (
    <section id="blog" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Legal Insights & Firm News
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay informed with the latest legal analysis and updates from our team of experts.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => {
            const image = PlaceHolderImages.find(img => img.id === post.imageId);
            return (
              <Card key={post.title} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                {image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-xl leading-snug">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground pt-1">{post.date}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href="#">Read More &rarr;</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
