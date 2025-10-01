import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact-form";
import Map from "@/components/map";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Entre em Contato
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Agende sua consulta agora mesmo! Fale conosco via WhatsApp ou venha até nosso escritório. Garanta seus direitos com quem conhece e atua em sua cidade.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="bg-secondary/50 p-8 rounded-lg shadow-lg">
             <h3 className="font-headline text-2xl font-bold mb-6">Envie-nos uma Mensagem</h3>
             <ContactForm />
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-4">Nosso Escritório</h3>
              <div className="space-y-4 text-muted-foreground">
                 <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Rua Franklin Bastos de Carvalho, nº 754, Centro, Manoel Viana – RS, CEP 97640-000</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:contato@vieramartins.com" className="hover:text-primary transition-colors">contato@vieramartins.com</a>
                </div>
                <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <a href="https://wa.me/5555999169181" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+55 (55) 99916-9181</a>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Seg a Sex: 09:00 - 12:00 e 14:00 - 18:00</span>
                </div>
              </div>
              <Button asChild size="lg" className="mt-6 w-full sm:w-auto" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                <Link href="https://wa.me/5555999169181" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Clique aqui para falar no WhatsApp
                </Link>
              </Button>
            </div>
            <div className="flex-grow">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
