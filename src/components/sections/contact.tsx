import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact-form";
import Map from "@/components/map";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Entre em Contato
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Agende sua consulta agora mesmo! Fale conosco via WhatsApp ou venha até nosso escritório. Garanta seus direitos com quem conhece e atua em sua cidade.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 bg-background p-8 sm:p-10 rounded-xl shadow-lg">
             <h3 className="font-headline text-2xl sm:text-3xl font-bold mb-6 text-primary">Envie-nos uma Mensagem</h3>
             <ContactForm />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold mb-6 text-primary">Nosso Escritório</h3>
              <div className="space-y-5 text-muted-foreground">
                 <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <span>Rua Franklin Bastos de Carvalho, nº 754, Centro, Manoel Viana – RS, CEP 97640-000</span>
                </div>
                <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-accent" />
                    <a href="mailto:contato@vieramartins.com" className="hover:text-primary transition-colors">contato@vieramartins.com</a>
                </div>
                <div className="flex items-center gap-4">
                    <MessageCircle className="h-5 w-5 text-accent" />
                    <a href="https://wa.me/5555999169181" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+55 (55) 99916-9181</a>
                </div>
                <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-accent" />
                    <span>Seg a Sex: 09:00 - 12:00 e 14:00 - 18:00</span>
                </div>
              </div>
              <Button asChild size="lg" className="mt-8 w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
                <Link href="https://wa.me/5555999169181" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Fale no WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-16">
            <Map />
        </div>
      </div>
    </section>
  );
}
