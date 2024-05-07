import { useState, useEffect } from "react"
import { TJobItem } from "../lib/types"
import { JOBS_ENDPOINT } from "../lib/constants"

type useJobItemsProps = {
  searchText: string
}

type useJobItemProps = {
  currentJobId: number | null
}

export function useCurrentJobId() {
  const [currentJobId, setCurrentJobId] = useState<number | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const jobId = +window.location.hash.slice(1)
      setCurrentJobId(jobId)
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return currentJobId
}

export function useJobItem({ currentJobId }: useJobItemProps) {
  const [currentJobItem, setCurrentJobItem] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!currentJobId) return

    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetch(`${JOBS_ENDPOINT}/${currentJobId}`)
      const data = await response.json()
      setCurrentJobItem(data.jobItem)
      setIsLoading(false)
    }

    fetchData()
  }, [currentJobId])

  return [currentJobItem, isLoading] as const
}

export default function useJobItems({ searchText }: useJobItemsProps) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const jobItemsSliced = jobItems.slice(0, 7)

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

  return [jobItemsSliced, isLoading] as const
}
