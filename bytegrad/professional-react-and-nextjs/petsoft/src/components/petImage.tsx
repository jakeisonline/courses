import { cn } from "@/lib/utils"
import Image from "next/image"
import PetPlaceholderImage from "@/public/pet-placeholder.png"

type PetImageProps = {
  width: number
  height: number
  src?: string
  alt?: string
  className?: string
}

export default function PetImage({
  width,
  height,
  src,
  alt,
  className,
}: PetImageProps) {
  const petImage = src ? src : PetPlaceholderImage
  let imageAlt = alt ? alt : "Pet Image"

  if (!src) {
    imageAlt = "Pet Placeholder Image"
  }

  return (
    <Image
      width={width}
      height={height}
      src={petImage}
      alt={imageAlt}
      className={cn("h-[75px] w-[75px] rounded-full object-cover", className)}
    />
  )
}
