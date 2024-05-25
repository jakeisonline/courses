"use client"

import { addPet } from "@/actions/doAddPet"
import { checkoutPet } from "@/actions/doCheckoutPet"
import { editPet } from "@/actions/doEditPet"
import { TMutatingPet, TPet } from "@/lib/types"
import { createContext, useOptimistic, useState } from "react"
import { toast } from "sonner"

type PetContextProviderProps = {
  data: TPet[]
  children: React.ReactNode
}

type PetContextArgs = {
  pets: TPet[]
  selectedPetId: string | null
  handleSelectedPet: (id: string) => string
  handleAddPet: (petData: TMutatingPet) => Promise<TPet | undefined>
  handleEditPet: (
    id: string,
    petData: TMutatingPet,
  ) => Promise<TPet | undefined>
  handleCheckoutPet: (id: string) => Promise<void>
  selectedPet: TPet | undefined
  numberOfPets: number
}

export const PetContext = createContext<PetContextArgs | null>(null)

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (prev, { action, data }) => {
      switch (action) {
        case "add":
          return [...prev, { id: Math.random().toString(), ...data }]
        case "edit":
          return prev.map((pet) =>
            pet.id === data.id ? { ...pet, ...data.petData } : pet,
          )
        case "delete":
          return prev.filter((pet) => pet.id !== data.id)
        default:
          return prev
      }
    },
  )
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = optimisticPets.length

  const handleSelectedPet = (id: string): string => {
    setSelectedPetId(id)
    return id
  }

  const handleAddPet = async (
    petData: TMutatingPet,
  ): Promise<TPet | undefined> => {
    setOptimisticPets({ action: "add", data: petData })
    const { error, response } = await addPet(petData)

    if (error) {
      toast.warning(error.message)
      return
    }

    if (response) setSelectedPetId(response.id)
    return response
  }

  const handleEditPet = async (
    id: string,
    petData: TMutatingPet,
  ): Promise<TPet | undefined> => {
    setOptimisticPets({ action: "edit", data: { id: id, petData } })
    const { error, response } = await editPet(id, petData)

    if (error) {
      toast.warning(error.message)
      return
    }

    return response
  }

  const handleCheckoutPet = async (id: string) => {
    setOptimisticPets({ action: "delete", data: { id } })
    const { error } = await checkoutPet(id)

    if (error) {
      toast.warning(error.message)
      return
    }

    // Select the next pet in the list, if any
    const checkoutPetIndex = optimisticPets.map((pet) => pet.id).indexOf(id)
    setSelectedPetId(getNextPetId(checkoutPetIndex))
  }

  const getNextPetId = (previousPetIndex: number): string | null => {
    if (previousPetIndex === 0 && optimisticPets.length - 1 > 0)
      return optimisticPets[previousPetIndex + 1].id
    if (previousPetIndex > 0) return optimisticPets[previousPetIndex - 1].id

    return null
  }

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
