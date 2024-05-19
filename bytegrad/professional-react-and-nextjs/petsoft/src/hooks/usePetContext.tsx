import { PetContext } from "@/contexts/petContextProvider"
import { useContext } from "react"

export default function usePetContext() {
  const context = useContext(PetContext)

  if (!context) {
    throw new Error("usePetContext must be used within a PetContextProvider")
  }

  return context
}
