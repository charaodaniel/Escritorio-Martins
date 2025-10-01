import Link from "next/link";
import { Scale, Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react";

const navLinks = [
  { href: "#practice-areas", label: "Áreas de Atuação" },
  { href: "#results", label: "Resultados" },
  { href: "#attorneys", label: "Nossa Equipe" },
  { href: "#blog", label: "Notícias" },
  { href: "#contact", label: "Contato" },
];

const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Facebook, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link
              href="#"
              className="flex items-center gap-2 font-headline text-xl font-bold"
            >
              <Scale className="h-6 w-6 text-primary" />
              <span>LexPage</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Seu parceiro de confiança para navegar nas complexidades do mundo jurídico.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">Fale Conosco</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contact@lexpage.com" className="hover:text-primary transition-colors">contact@lexpage.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+5555912345678" className="hover:text-primary transition-colors">+55 (55) 91234-5678</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <span>Rua Sete de Setembro, 123<br />Manoel Viana, RS, Brasil</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">Siga-nos</h3>
            <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                    <Link key={index} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">Siga-nos no {social.icon.displayName}</span>
                    </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LexPage. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
