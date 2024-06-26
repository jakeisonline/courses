"use client"

import usePetContext from "@/hooks/usePetContext"
import { cn } from "@/lib/utils"
import PetImage from "./petImage"
import useSearchContext from "@/hooks/useSearchContext"
import { useMemo } from "react"
import { TPet } from "@/lib/types"

export default function PetList() {
  const { pets, selectedPetId, handleSelectedPet } = usePetContext()
  const { searchText } = useSearchContext()

  const filteredPets = useMemo(
    () =>
      pets.filter((pet) => {
        return pet.name.toLowerCase().includes(searchText.toLowerCase())
      }),
    [pets, searchText],
  )

  return (
    <ul className="border-b border-light bg-white">
      {filteredPets.map((pet: TPet) => (
        <li key={pet.id} className="">
          <button
            onClick={() => {
              handleSelectedPet(pet.id)
            }}
            className={cn(
              "flex h-[70px] w-full cursor-pointer items-center gap-4 px-5 py-4 text-base transition hover:bg-[#EFF1F2] focus:bg-[#EFF1F2]",
              pet.id === selectedPetId ? "bg-[#EFF1F2]" : "bg-white",
            )}
          >
            <PetImage
              width={45}
              height={45}
              src={pet.imageUrl || undefined}
              alt={`Image of ${pet.name}`}
              className="h-[45px] w-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}
