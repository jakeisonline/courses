"use client"

import { createContext, useState } from "react"

type SearchContextProviderProps = {
  children: React.ReactNode
}

type SearchContextArgs = {
  searchText: string
  handleChangeSearchText: (text: string) => string
}

export const SearchContext = createContext<SearchContextArgs | null>(null)

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchText, setSearchText] = useState<string>("")

  const handleChangeSearchText = (text: string): string => {
    setSearchText(text)
    return text
  }

  return (
    <SearchContext.Provider
      value={{
        searchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
