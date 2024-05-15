import Image from "next/image"
import PetPlaceholderImage from "@/public/pet-placeholder.png"
import { TPet } from "@/lib/types"

type PetListProps = {
  pets: TPet[]
}

export default function PetList({ pets }: PetListProps) {
  return (
    <ul className="border-b border-black/10 bg-white">
      {pets.map((pet) => (
        <li key={pet.id} className="">
          <button className="flex h-[70px] w-full cursor-pointer items-center gap-4 px-5 py-4 text-base transition hover:bg-[#EFF1F2] focus:bg-[#EFF1F2]">
            <Image
              src={!pet.imageUrl ? PetPlaceholderImage : pet.imageUrl}
              height={45}
              width={45}
              alt={`Profile image representing ${pet.name}`}
              className="h-[45px] w-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}
