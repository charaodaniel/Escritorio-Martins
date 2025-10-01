"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Map() {
  const mapImage = PlaceHolderImages.find((img) => img.id === "map-location");

  return (
    <div className="h-full min-h-[300px] w-full overflow-hidden rounded-lg shadow-lg">
      {mapImage ? (
        <Image
          src={mapImage.imageUrl}
          alt={mapImage.description}
          width={800}
          height={600}
          className="w-full h-full object-cover"
          data-ai-hint={mapImage.imageHint}
        />
      ) : (
        <div className="h-full w-full bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Map loading...</p>
        </div>
      )}
    </div>
  );
}
