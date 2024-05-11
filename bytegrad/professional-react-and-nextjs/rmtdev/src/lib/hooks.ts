import { useState, useEffect, useContext } from "react"
import { TJobItem, TJobContent } from "./types"
import { JOBS_ENDPOINT } from "./constants"
import { useQueries, useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { BookmarksContext } from "../contexts/BookmarkContextProvider"
import { CurrentJobContext } from "../contexts/CurrentJobContextProvider"
import { SearchTextContext } from "../contexts/SearchTextContextProvider"
import { JobItemsContext } from "../contexts/JobItemsContextProvider"

type JobItemApiResponse = {
  public: boolean
  jobItem: TJobContent
}

type JobSearchApiResponse = {
  public: boolean
  jobItems: TJobItem[]
}

type useJobSearchProps = {
  searchText: string
}

type useJobItemProps = {
  currentJobId: number | null
}

type useJobItemsProps = {
  ids: number[]
}

type useDebounceProps = {
  value: string
  delay: number
}

type useOnClickOutsideProps = {
  refs: React.RefObject<HTMLElement>[]
  handleClick: () => void
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

const fetchJobSearchItems = async ({
  searchText,
}: useJobSearchProps): Promise<JobSearchApiResponse> => {
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
      onError: (error: Error) => {
        console.error("Error fetching job item", error)
      },
    },
  )

  return {
    currentJobItem: (data as JobItemApiResponse)?.jobItem,
    isJobLoading: isInitialLoading,
  } as const
}

export function useJobItems({ ids }: useJobItemsProps) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: async () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error: Error) => {
        console.error("Error fetching job item", error)
      },
    })),
  })

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => Boolean(jobItem)) as TJobContent[]
  const isJobsLoading = results.some((result) => result.isLoading)

  return { jobItems, isJobsLoading }
}

export default function useJobSearch({ searchText }: useJobSearchProps) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    async () => searchText && fetchJobSearchItems({ searchText }),
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
    jobItems: (data as JobSearchApiResponse)?.jobItems || [],
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
    return storedValue ? JSON.parse(storedValue) : initialValue
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

export function useCurrentJobContext() {
  const context = useContext(CurrentJobContext)
  if (!context) {
    throw new Error(
      "useCurrentJobContext must be used within a CurrentJobContextProvider",
    )
  }

  return context
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext)
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider",
    )
  }

  return context
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext)
  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within a JobItemsContextProvider",
    )
  }

  return context
}

export function useOnClickOutside({
  refs,
  handleClick,
}: useOnClickOutsideProps) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handleClick()
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [refs, handleClick])
}
