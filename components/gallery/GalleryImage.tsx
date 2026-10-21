import Image from "next/image";
import type { GalleryImage } from "@/content/gallery";

type Props = { image: GalleryImage; sizes: string; className?: string; priority?: boolean };

export default function GalleryImageFrame({ image, sizes, className = "", priority = false }: Props) {
  return (
    <div className={`image-frame ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}
