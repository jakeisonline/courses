"use client"

import { addPet } from "@/actions/doAddPet"
import { checkoutPet } from "@/actions/doCheckoutPet"
import { editPet } from "@/actions/doEditPet"
import { TPet } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { createContext, useState } from "react"
import { toast } from "sonner"

type PetContextProviderProps = {
  data: TPet[]
  children: React.ReactNode
}

type PetContextArgs = {
  pets: TPet[]
  selectedPetId: string | null
  handleSelectedPet: (id: string) => string
  handleAddPet: (formData: TPet) => void
  handleEditPet: (id: string, formData: TPet) => void
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

  const handleAddPet = async (formData: any) => {
    const { error, response } = await addPet(formData)

    if (error) {
      toast.warning(error.message)
      return
    }

    setSelectedPetId(response.id)
    return response
  }

  const handleEditPet = async (id: string, formData: any) => {
    const { error, response } = await editPet(id, formData)

    if (error) {
      toast.warning(error.message)
      return
    }

    return response
  }

  const handleCheckoutPet = async (id: string) => {
    const { error, response } = await checkoutPet(id)

    if (error) {
      toast.warning(error.message)
      return
    }

    // Select the next pet in the list, if any
    const checkoutPetIndex = pets.map((pet) => pet.id).indexOf(id)
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
        handleSelectedPet,
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
        selectedPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
