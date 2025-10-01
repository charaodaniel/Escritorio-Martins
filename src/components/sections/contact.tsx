import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/contact-form";
import Map from "@/components/map";

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Entre em Contato
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tem uma dúvida jurídica ou precisa agendar uma consulta? Nossa equipe está pronta para ajudá-lo.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="bg-background p-8 rounded-lg shadow-lg">
             <h3 className="font-headline text-2xl font-bold mb-6">Envie-nos uma Mensagem</h3>
             <ContactForm />
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-4">Nosso Escritório</h3>
              <div className="space-y-3 text-muted-foreground">
                 <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Rua Sete de Setembro, 123, Manoel Viana, RS, Brasil</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:contact@lexpage.com" className="hover:text-primary transition-colors">contact@lexpage.com</a>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+5555912345678" className="hover:text-primary transition-colors">+55 (55) 91234-5678</a>
                </div>
              </div>
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
