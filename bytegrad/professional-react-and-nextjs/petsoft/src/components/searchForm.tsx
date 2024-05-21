"use client"

import useSearchContext from "@/hooks/useSearchContext"

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchContext()
  return (
    <form className="h-full w-full">
      <input
        className="h-full w-full rounded-md bg-white/20 px-5 outline-none transition placeholder:text-white/50 hover:bg-white/30 focus:bg-white/50"
        placeholder="Search Pets"
        type="search"
        value={searchText}
        onChange={(e) => handleChangeSearchText(e.target.value)}
      />
    </form>
  )
}
