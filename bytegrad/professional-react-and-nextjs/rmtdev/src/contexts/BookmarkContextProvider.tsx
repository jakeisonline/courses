import { createContext, useEffect } from "react"
import { useJobItems, useLocalStorage } from "../lib/hooks"
import { TJobContent } from "../lib/types"

type BookmarkContextProviderProps = {
  children: React.ReactNode
}

type BookmarksContext = {
  bookmarkedIds: number[]
  handleToggleBookmark: (id: number) => void
  bookmarkedJobItems: TJobContent[]
  isBookmarksLoading: boolean
}

export const BookmarksContext = createContext<BookmarksContext | null>(null)

export default function BookmarkContextProvider({
  children,
}: BookmarkContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    [],
  )

  const { jobItems: bookmarkedJobItems, isJobsLoading: isBookmarksLoading } =
    useJobItems({ ids: bookmarkedIds })

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id))
    } else {
      setBookmarkedIds((prev) => [...prev, id])
    }
  }

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds))
  }, [bookmarkedIds])

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isBookmarksLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}
