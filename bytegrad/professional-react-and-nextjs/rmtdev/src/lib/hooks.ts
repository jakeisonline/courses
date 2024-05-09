import { useState, useEffect, useContext } from "react"
import { TJobItem, TJobContent } from "./types"
import { JOBS_ENDPOINT } from "./constants"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { BookmarksContext } from "../contexts/BookmarkContextProvider"

type JobItemApiResponse = {
  public: boolean
  jobItem: TJobContent
}

type JobItemsApiResponse = {
  public: boolean
  jobItems: TJobItem[]
}

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

const fetchJobItem = async (
  currentJobId: number,
): Promise<JobItemApiResponse> => {
  const response = await fetch(`${JOBS_ENDPOINT}/${currentJobId}`)
  if (!response.ok) {
    const errorData = await response.json()
    toast.error(errorData.description)
  }
  const data = await response.json()
  return data
}

const fetchJobItems = async ({
  searchText,
}: useJobItemsProps): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${JOBS_ENDPOINT}?search=${searchText}`)
  if (!response.ok) {
    const errorData = await response.json()
    toast.error(errorData.description)
  }
  const data = await response.json()
  return data
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
  const { data, isInitialLoading } = useQuery(
    ["job-item", currentJobId],
    async () => currentJobId && fetchJobItem(currentJobId),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(currentJobId),
      onError: (error) => {
        console.error("Error fetching job item", error)
      },
    },
  )

  return {
    currentJobItem: data?.jobItem,
    isJobLoading: isInitialLoading,
  } as const
}

export default function useJobItems({ searchText }: useJobItemsProps) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    async () => searchText && fetchJobItems({ searchText }),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (error) => {
        console.error("Error fetching job items", error)
      },
    },
  )

  return {
    jobItems: data?.jobItems || [],
    isJobsLoading: isInitialLoading,
  } as const
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

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : JSON.stringify(initialValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext)
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider",
    )
  }

  return context
}
