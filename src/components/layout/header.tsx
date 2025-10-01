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

const navLinks = [
  { href: "#practice-areas", label: "Áreas de Atuação" },
  { href: "#results", label: "Resultados" },
  { href: "#attorneys", label: "Nossa Equipe" },
  { href: "#blog", label: "Notícias" },
  { href: "#contact", label: "Contato" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => (
    <Link
      href={href}
      className={cn("text-sm font-medium transition-colors hover:text-primary", className)}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all",
        isScrolled ? "border-border bg-background/80 backdrop-blur-sm" : "bg-background/0"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="#"
          className="flex items-center gap-2 font-headline text-lg font-bold"
        >
          <Scale className="h-6 w-6 text-primary" />
          <span>LexPage</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <Button asChild className="hidden md:flex" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                <Link href="#contact">Consulta Gratuita</Link>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Alternar menu de navegação</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 font-headline text-lg font-bold"
                    >
                        <Scale className="h-6 w-6 text-primary" />
                        <span>LexPage</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                            <NavLink {...link} className="text-lg" />
                        </SheetClose>
                    ))}
                    </nav>
                    <SheetClose asChild>
                        <Button asChild className="mt-4" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                            <Link href="#contact">Consulta Gratuita</Link>
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
