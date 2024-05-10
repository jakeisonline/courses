import { createContext, useEffect, useState } from "react"

type CurrentJobContextProviderProps = {
  children: React.ReactNode
}

type CurrentJobContext = {
  currentJobId: number | null
}

export const CurrentJobContext = createContext<CurrentJobContext | null>(null)

export default function CurrentJobContextProvider({
  children,
}: CurrentJobContextProviderProps) {
  const [currentJobId, setCurrentJobId] = useState<number | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const jobId = +window.location.hash.slice(1)
      setCurrentJobId(jobId)
    }

    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <CurrentJobContext.Provider
      value={{
        currentJobId,
      }}
    >
      {children}
    </CurrentJobContext.Provider>
  )
}
