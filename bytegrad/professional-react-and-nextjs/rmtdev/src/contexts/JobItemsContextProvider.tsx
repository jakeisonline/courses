import { createContext, useMemo, useState } from "react"
import useJobSearch, {
  useCurrentJobContext,
  useJobItem,
  useSearchTextContext,
} from "../lib/hooks"
import { PER_PAGE_COUNT } from "../lib/constants"
import {
  TSortBy,
  TJobItem,
  TPaginationControls,
  TJobContent,
} from "../lib/types"

type JobItemsContextProviderProps = {
  children: React.ReactNode
}

type JobItemsContextProps = {
  jobItems: TJobItem[]
  jobItemsSliced: TJobItem[]
  isJobsLoading: boolean
  jobsTotalResults: number
  sortBy: TSortBy
  currentJobItem: TJobContent | null
  isJobLoading: boolean
  totalNumberOfPages: number
  currentPage: number
  handleChangePage: (direction: TPaginationControls) => void
  handleSortBy: (sortBy: TSortBy) => void
}

export const JobItemsContext = createContext<JobItemsContextProps | null>(null)

export default function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
  const { debouncedSearchText } = useSearchTextContext()
  const { jobItems, isJobsLoading } = useJobSearch({
    searchText: debouncedSearchText,
  })
  const { currentJobId } = useCurrentJobContext()
  const { currentJobItem, isJobLoading } = useJobItem({ currentJobId })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortBy, setSortBy] = useState<TSortBy>("relevant")

  const jobsTotalResults = jobItems.length
  const jobItemsSorted = useMemo(
    () =>
      [...jobItems].sort((a: TJobItem, b: TJobItem) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore
        } else if (sortBy === "recent") {
          return b.daysAgo - a.daysAgo
        }
        return 0
      }),
    [sortBy, jobItems],
  )

  const jobItemsSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * PER_PAGE_COUNT - PER_PAGE_COUNT,
        currentPage * PER_PAGE_COUNT,
      ),
    [jobItemsSorted, currentPage],
  )

  const totalNumberOfPages = Math.ceil(jobsTotalResults / PER_PAGE_COUNT)

  const handleChangePage = (direction: TPaginationControls) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1)
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleSortBy = (sortBy: TSortBy) => {
    setSortBy(sortBy)
  }

  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        jobItemsSliced,
        isJobsLoading,
        jobsTotalResults,
        sortBy,
        currentJobItem,
        isJobLoading,
        totalNumberOfPages,
        currentPage,
        handleChangePage,
        handleSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  )
}
