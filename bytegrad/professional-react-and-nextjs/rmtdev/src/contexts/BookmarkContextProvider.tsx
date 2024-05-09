import { createContext, useEffect } from "react"
import { useLocalStorage } from "../lib/hooks"

type BookmarkProviderProps = {
  children: React.ReactNode
}

type BookmarksContext = {
  bookmarkedIds: number[]
  handleToggleBookmark: (id: number) => void
}

export const BookmarksContext = createContext<BookmarksContext | null>(null)

export default function BookmarkProviderContext({
  children,
}: BookmarkProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    [],
  )

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
      }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}
