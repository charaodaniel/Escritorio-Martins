
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type InstagramImageProps = {
  url: string;
};

export default function InstagramImage({ url }: InstagramImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImage() {
      setIsLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/get-instagram-image?url=${encodeURIComponent(url)}`);
        if (!res.ok) {
          throw new Error('Falha na resposta da API');
        }
        const data = await res.json();
        if (data.imageUrl) {
          setImageUrl(data.imageUrl);
        } else {
          throw new Error('URL da imagem não encontrada na resposta');
        }
      } catch (e) {
        console.error("Erro ao carregar imagem do Instagram:", e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (url) {
      fetchImage();
    } else {
      setIsLoading(false);
      setError(true);
    }
  }, [url]);

  if (isLoading) {
    return <Skeleton className="w-full aspect-square rounded-xl" />;
  }

  if (error) {
    return (
      <div className="w-full aspect-square rounded-xl bg-muted flex flex-col items-center justify-center text-center p-4">
        <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
        <p className="text-sm text-destructive-foreground font-semibold">Erro ao carregar</p>
        <p className="text-xs text-muted-foreground mb-4">Não foi possível carregar a publicação.</p>
        {url && (
            <Button asChild variant="outline" size="sm">
                <Link href={url} target="_blank" rel="noopener noreferrer">
                    Ver no Instagram
                </Link>
            </Button>
        )}
      </div>
    );
  }

  if (!imageUrl) {
     return <Skeleton className="w-full aspect-square rounded-xl" />;
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full aspect-square rounded-xl overflow-hidden shadow-lg hover:opacity-90 transition-opacity relative group"
    >
      <Image
        src={imageUrl}
        alt="Publicação do Instagram"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        onError={() => setError(true)}
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <p className="text-white font-bold">Ver no Instagram</p>
      </div>
    </Link>
  );
}
