import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AtSign, Globe, Home, Instagram, Facebook, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

const links = [
    {
        href: "https://wa.me/5555999169181",
        label: "Agende sua Consulta (WhatsApp)",
        icon: MessageCircle,
        isExternal: true,
    },
    {
        href: "https://www.instagram.com/vieiraemartinsadv/",
        label: "Acesse nosso Instagram",
        icon: Instagram,
        isExternal: true,
    },
    {
        href: "https://www.facebook.com/profile.php?id=100090526663540",
        label: "Acesse nosso Facebook",
        icon: Facebook,
        isExternal: true,
    },
    {
        href: "https://www.google.com/maps/place/R.+Franklin+Bastos+de+Carvalho,+754+-+Centro,+Manoel+Viana+-+RS,+97640-000/@-29.5908985,-55.4839841,17z/data=!3m1!4b1!4m6!3m5!1s0x950000994f340801:0x5e33d45e7b250785!8m2!3d-29.5909032!4d-55.4814092!16s%2Fg%2F11csc5l_kt?entry=tts",
        label: "Veja nossa Localização",
        icon: MapPin,
        isExternal: true,
    },
    {
        href: "mailto:emartinsadvogado@hotmail.com",
        label: "Envie-nos um E-mail",
        icon: AtSign,
        isExternal: true,
    },
    {
        href: "/",
        label: "Visite nosso Site Completo",
        icon: Globe,
        isExternal: false,
    }
];

export default function LinksPage() {
    const logoImage = PlaceHolderImages.find(img => img.id === 'logo');
    const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
             {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-background/90" />
            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <Avatar className="h-28 w-28 border-4 border-accent shadow-lg mb-4">
                        {logoImage && (
                            <AvatarImage src={logoImage.imageUrl} alt="Vieira & Martins Advogados Logo" className="object-contain" data-ai-hint={logoImage.imageHint}/>
                        )}
                        <AvatarFallback>VM</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold font-headline text-white">
                        Vieira & Martins Advogados
                    </h1>
                    <p className="mt-1 text-center text-muted-foreground text-lg">
                        Segurança jurídica em Manoel Viana.
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    {links.map((link) => {
                         const LinkComponent = link.isExternal ? 'a' : Link;
                        return (
                            <Button
                                key={link.label}
                                asChild
                                size="lg"
                                variant="outline"
                                className="w-full justify-start h-14 text-md bg-card/80 hover:bg-card border-border hover:border-accent hover:text-accent backdrop-blur-sm"
                            >
                                <LinkComponent 
                                    href={link.href}
                                    {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                >
                                    <link.icon className="h-6 w-6 mr-4" />
                                    {link.label}
                                </LinkComponent>
                            </Button>
                        )
                    })}
                </div>

                <footer className="mt-10 text-center text-sm text-primary-foreground/70">
                    <p>&copy; {new Date().getFullYear()} Vieira & Martins Advogados. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
}
