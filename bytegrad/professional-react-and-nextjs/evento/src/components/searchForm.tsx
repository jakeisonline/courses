"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchForm() {
  const [searchText, setSearchText] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const newSearchText = searchText.trim()
    e.preventDefault()
    if (!newSearchText) return
    router.push(`/events/${newSearchText}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[580px]">
      <input
        value={searchText}
        onChange={handleChange}
        className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none focus:ring-2 focus:ring-accent/40 focus:bg-white/10 transition"
        placeholder="Search events in any city..."
        spellCheck={false}
      />
    </form>
  )
}
