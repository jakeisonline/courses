"use client"

import { TPet } from "@/lib/types"
import { createContext, useState } from "react"

type PetContextProviderProps = {
  data: TPet[]
  children: React.ReactNode
}

type PetContextArgs = {
  pets: TPet[]
  selectedPetId: number | null
  handleSelectedPet: (id: number) => number
}

export const PetContext = createContext<PetContextArgs | null>(null)

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [pets, setPets] = useState<TPet[]>(data)
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)

  const handleSelectedPet = (id: number): number => {
    setSelectedPetId(id)
    return id
  }

  return (
    <PetContext.Provider value={{ pets, selectedPetId, handleSelectedPet }}>
      {children}
    </PetContext.Provider>
  )
}
