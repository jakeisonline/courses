"use client"

import usePetContext from "@/hooks/usePetContext"

export default function Stats() {
  const { numberOfPets } = usePetContext()

  return (
    <section>
      <p className="text-center text-2xl font-bold leading-6">{numberOfPets}</p>
      <p className="opacity-80">current guests</p>
    </section>
  )
}
