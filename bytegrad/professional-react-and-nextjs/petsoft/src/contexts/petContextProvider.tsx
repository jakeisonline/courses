"use client"

import { TPet } from "@/lib/types"
import { createContext, useState } from "react"

type PetContextProviderProps = {
  data: TPet[]
  children: React.ReactNode
}

type PetContextArgs = {
  pets: TPet[]
  selectedPetId: string | null
  handleAddPet: (newPet: TPet) => void
  handleEditPet: (editedPet: TPet) => void
  handleSelectedPet: (id: string) => string
  handleCheckoutPet: (id: string) => void
  selectedPet: TPet | undefined
  numberOfPets: number
}

export const PetContext = createContext<PetContextArgs | null>(null)

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [pets, setPets] = useState<TPet[]>(data)
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const selectedPet = pets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = pets.length

  const handleSelectedPet = (id: string): string => {
    setSelectedPetId(id)
    return id
  }

  const handleAddPet = (newPet: Omit<TPet, "id">): void => {
    const newPetId = String(Math.floor(Math.random() * 1000))
    setPets([...pets, { id: newPetId, ...newPet }])

    setSelectedPetId(newPetId)
  }

  const handleEditPet = (editedPet: TPet): void => {
    setPets((prevPets) => {
      const updatedPets = prevPets.map((pet) => {
        if (pet.id === editedPet.id) {
          return editedPet
        }
        return pet
      })
      return updatedPets
    })
    setSelectedPetId(editedPet.id)
  }

  const handleCheckoutPet = (id: string): void => {
    // Remove the pet from the list
    const originalPets = pets
    const checkoutPetIndex = originalPets.map((pet) => pet.id).indexOf(id)
    const updatedPets = originalPets
      .slice(0, checkoutPetIndex)
      .concat(originalPets.slice(checkoutPetIndex + 1))
    setPets(updatedPets)
    // Select the next pet in the list, if any
    setSelectedPetId(getNextPetId(checkoutPetIndex))
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
        handleAddPet,
        handleEditPet,
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
