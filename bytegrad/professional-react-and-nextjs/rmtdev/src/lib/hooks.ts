import { useState, useEffect } from "react"
import { TJobItem } from "./types"
import { JOBS_ENDPOINT } from "./constants"

type useJobItemsProps = {
  searchText: string
}

type useJobItemProps = {
  currentJobId: number | null
}

type useDebounceProps = {
  value: string
  delay: number
}

export function useCurrentJobId() {
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
  const [isJobsLoading, setIsJobsLoading] = useState<boolean>(false)

  const jobsTotalResults = jobItems.length
  const jobItemsSliced = jobItems.slice(0, 7)

  useEffect(() => {
    if (!searchText) return

    const fetchData = async () => {
      setIsJobsLoading(true)
      const response = await fetch(`${JOBS_ENDPOINT}?search=${searchText}`)
      const data = await response.json()
      setJobItems(data.jobItems)
      setIsJobsLoading(false)
    }

    fetchData()
  }, [searchText])

  return { jobsTotalResults, jobItemsSliced, isJobsLoading } as const
}

export function useDebounce({ value, delay }: useDebounceProps) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounceValue(value), delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debounceValue
}
