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
  { href: "#why-us", label: "Diferenciais" },
  { href: "#testimonials", label: "Depoimentos" },
  { href: "#contact", label: "Contato" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener("scroll", handleScroll);
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
        isScrolled ? "border-border bg-background/95 backdrop-blur-sm" : "border-transparent bg-transparent text-white"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          href="#"
          className="flex items-center gap-2 font-headline text-xl font-bold"
        >
          <Scale className={cn("h-6 w-6 transition-colors", isScrolled ? "text-primary" : "text-accent")} />
          <span className="transition-colors">Vieira & Martins</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <Button asChild className="hidden md:flex" variant="ghost">
                <Link href="#contact" className="border border-accent text-accent hover:bg-accent hover:text-accent-foreground">Agende sua Consulta</Link>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10 focus-visible:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Alternar menu de navegação</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-primary text-primary-foreground">
                <div className="flex flex-col gap-8 p-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 font-headline text-xl font-bold text-accent"
                    >
                        <Scale className="h-6 w-6" />
                        <span>Vieira & Martins</span>
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
                            <Link href="#contact">Agende sua Consulta</Link>
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
