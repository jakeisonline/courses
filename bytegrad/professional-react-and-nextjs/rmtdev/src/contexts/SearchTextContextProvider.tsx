import { createContext, useState } from "react"
import { useDebounce } from "../lib/hooks"

type SearchTextContextProviderProps = {
  children: React.ReactNode
}

type SearchTextContextProps = {
  searchText: string
  debouncedSearchText: string
  handleChangeSearchText: (searchText: string) => void
}

export const SearchTextContext = createContext<SearchTextContextProps | null>(
  null,
)

export default function SearchTextContextProvider({
  children,
}: SearchTextContextProviderProps) {
  const [searchText, setSearchText] = useState<string>("")
  const debouncedSearchText = useDebounce({
    value: searchText,
    delay: 500,
  })

  const handleChangeSearchText = (searchText: string) => {
    setSearchText(searchText)
  }

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  )
}
