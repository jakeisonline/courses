"use client"

import { addPet } from "@/actions/doAddPet"
import { checkoutPet } from "@/actions/doCheckoutPet"
import { TPet } from "@/lib/types"
import { createContext, useState } from "react"

type PetContextProviderProps = {
  data: TPet[]
  children: React.ReactNode
}

type PetContextArgs = {
  pets: TPet[]
  selectedPetId: string | null
  handleSelectedPet: (id: string) => string
  handleCheckoutPet: (id: string) => void
  selectedPet: TPet | undefined
  numberOfPets: number
}

export const PetContext = createContext<PetContextArgs | null>(null)

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const selectedPet = pets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = pets.length

  const handleSelectedPet = (id: string): string => {
    setSelectedPetId(id)
    return id
  }

  const handleCheckoutPet = async (id: string) => {
    await checkoutPet(id)
    // Select the next pet in the list, if any
    // TODO: Refactor this to work once more
    //setSelectedPetId(getNextPetId(checkoutPetIndex))
  }

  const getNextPetId = (previousPetIndex: number): string | null => {
    if (previousPetIndex === 0 && pets.length - 1 > 0)
      return pets[previousPetIndex + 1].id
    if (previousPetIndex > 0) return pets[previousPetIndex - 1].id

    return null
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectedPet,
        handleCheckoutPet,
        selectedPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
