import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const blogPosts = [
  {
    title: "A Importância da Due Diligence em Aquisições de Empresas",
    excerpt: "Saiba por que uma due diligence completa é a base de qualquer aquisição de negócios bem-sucedida e como evitar armadilhas comuns.",
    date: "20 de maio de 2024",
    imageId: "blog-1",
  },
  {
    title: "Entendendo Seus Direitos: O Que Fazer se Você for Preso",
    excerpt: "Um guia passo a passo sobre como proteger seus direitos e navegar nas primeiras horas após uma prisão.",
    date: "15 de maio de 2024",
    imageId: "blog-2",
  },
  {
    title: "Navegando pela Lei de Direitos Autorais na Era Digital",
    excerpt: "Explore os desafios e estratégias para proteger seu trabalho criativo online em uma era de rápidas mudanças tecnológicas.",
    date: "10 de maio de 2024",
    imageId: "blog-3",
  },
];

export default function BlogFeed() {
  return (
    <section id="blog" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Notícias e Análises Jurídicas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mantenha-se informado com as últimas análises jurídicas e atualizações de nossa equipe de especialistas.
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
                    <Link href="#">Leia Mais &rarr;</Link>
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
