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
  handleCheckoutPet: (id: number) => void
  selectedPet: TPet | undefined
  numberOfPets: number
}

export const PetContext = createContext<PetContextArgs | null>(null)

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [pets, setPets] = useState<TPet[]>(data)
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)

  const selectedPet = pets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = pets.length

  const handleSelectedPet = (id: number): number => {
    setSelectedPetId(id)
    return id
  }

  const handleCheckoutPet = (id: number): void => {
    // Remove the pet from the list
    const originalPets = pets
    const checkoutPetIndex = pets.map((pet) => pet.id).indexOf(id)
    const updatedPets = originalPets
      .slice(0, checkoutPetIndex)
      .concat(originalPets.slice(checkoutPetIndex + 1))
    setPets(updatedPets)
    // Select the next pet in the list, if any
    const nextSelectedPetId =
      checkoutPetIndex > 0 ? updatedPets[checkoutPetIndex - 1].id : null
    setSelectedPetId(nextSelectedPetId)
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
