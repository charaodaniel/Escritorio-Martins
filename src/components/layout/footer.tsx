"use client";

import Link from "next/link";
import { Scale, Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#practice-areas", label: "Áreas de Atuação" },
  { href: "#why-us", label: "Diferenciais" },
  { href: "#our-history", label: "Nossa História" },
  { href: "#attorneys", label: "Equipe" },
  { href: "#testimonials", label: "Publicações" },
  { href: "#contact", label: "Contato" },
];

const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100090526663540", name: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/vieiraemartinsadv/", name: "Instagram" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link
              href="#"
              className="flex items-center gap-2 font-headline text-2xl font-bold"
            >
              <Scale className="h-7 w-7 text-accent" />
              <span>Martins Advogados</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Segurança jurídica com excelência e atendimento personalizado em Manoel Viana.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold text-accent">Links Rápidos</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold text-accent">Fale Conosco</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:contato@vieramartins.com" className="text-muted-foreground hover:text-accent transition-colors">contato@vieramartins.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-accent" />
                <a href="https://wa.me/5555999169181" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">+55 (55) 99916-9181</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-accent" />
                <span className="text-muted-foreground">R. José João Saldanha, 815<br />Centro, Manoel Viana - RS</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold text-accent">Siga-nos</h3>
            <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                    <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">Siga-nos no {social.name}</span>
                    </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Martins Advogados. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
