import { useState, useEffect } from "react"
import { TJobItem } from "../lib/types"
import { JOBS_ENDPOINT } from "../lib/constants"

type useJobItemsProps = {
  searchText: string
}

export default function useJobItems({ searchText }: useJobItemsProps) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!searchText) return

    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetch(`${JOBS_ENDPOINT}?search=${searchText}`)
      const data = await response.json()
      setJobItems(data.jobItems)
      setIsLoading(false)
    }

    fetchData()
  }, [searchText])

  return [jobItems, isLoading] as const
}
