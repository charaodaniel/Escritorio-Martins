
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ContentData } from "@/lib/content-loader";

const navLinks = [
  { href: "/#practice-areas", label: "Áreas de Atuação" },
  { href: "/#why-us", label: "Diferenciais" },
  { href: "/#our-history", label: "Nossa História" },
  { href: "/#attorneys", label: "Equipe" },
  { href: "/#testimonials", label: "Publicações" },
  { href: "/#contact", label: "Contato" },
];

type HeaderProps = {
  content: ContentData['contactInfo'];
}

export default function Header({ content }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Only add the event listener on the client-side
    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      // Set initial state after mounting
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => (
    <Link
      href={href}
      className={cn("text-sm font-medium transition-colors hover:text-accent", className)}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled ? "border-border bg-background/95 backdrop-blur-sm" : "border-transparent bg-background",
        isScrolled ? "text-foreground" : "text-foreground"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-headline text-xl font-bold"
        >
          <Scale className="h-6 w-6 text-accent" />
          <span className="transition-colors">Vieira & Martins Advogados</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <Button asChild className="hidden md:flex bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={content.whatsappLink} target="_blank" rel="noopener noreferrer">Agende sua Consulta</Link>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent/10 focus-visible:bg-accent/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Alternar menu de navegação</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background text-foreground">
                <div className="flex flex-col gap-8 p-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-headline text-xl font-bold text-accent"
                    >
                        <Scale className="h-6 w-6" />
                        <span>Vieira & Martins Advogados</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                            <Link href={link.href} className="text-lg font-medium transition-colors hover:text-accent">
                                {link.label}
                            </Link>
                        </SheetClose>
                    ))}
                    </nav>
                    <SheetClose asChild>
                        <Button asChild size="lg" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                            <Link href={content.whatsappLink} target="_blank" rel="noopener noreferrer">Agende sua Consulta</Link>
                        </Button>
                    </SheetClose>
                </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
