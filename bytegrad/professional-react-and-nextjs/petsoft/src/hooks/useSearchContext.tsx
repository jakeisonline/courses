import { SearchContext } from "@/contexts/searchContextProvider"
import { useContext } from "react"

export default function useSearchContext() {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider",
    )
  }

  return context
}
