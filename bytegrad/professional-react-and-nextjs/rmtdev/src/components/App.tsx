import { useState } from "react"
import Background from "./Background"
import Container from "./Container"
import Footer from "./Footer"
import Header from "./Header"
import BookmarksButton from "./BookmarksButton"
import Logo from "./Logo"
import SearchForm from "./SearchForm"
import JobItemContent from "./JobItemContent"
import Sidebar from "./Sidebar"
import HeaderTop from "./HeaderTop"
import JobList from "./JobList"
import PaginationControls from "./PaginationControls"
import ResultsCount from "./ResultsCount"
import SortingControls from "./SortingControls"
import SidebarTop from "./SidebarTop"
import { Toaster } from "react-hot-toast"
import useJobSearch, {
  useCurrentJobId,
  useDebounce,
  useJobItem,
} from "../lib/hooks"
import { PER_PAGE_COUNT } from "../lib/constants"
import { TSortBy, TJobItem, TPaginationControls } from "../lib/types"

function App() {
  const [searchText, setSearchText] = useState<string>("")
  const debouncedSearchText = useDebounce({
    value: searchText,
    delay: 500,
  })
  const { jobItems, isJobsLoading } = useJobSearch({
    searchText: debouncedSearchText,
  })
  const currentJobId = useCurrentJobId()
  const { currentJobItem, isJobLoading } = useJobItem({ currentJobId })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortBy, setSortBy] = useState<TSortBy>("relevant")

  const jobsTotalResults = jobItems.length
  const jobItemsSorted = [...jobItems].sort((a: TJobItem, b: TJobItem) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore
    } else if (sortBy === "recent") {
      return b.daysAgo - a.daysAgo
    }
    return 0
  })
  const jobItemsSliced = jobItemsSorted.slice(
    currentPage * PER_PAGE_COUNT - PER_PAGE_COUNT,
    currentPage * PER_PAGE_COUNT,
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
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={jobsTotalResults} />
            <SortingControls currentSortBy={sortBy} onSortBy={handleSortBy} />
          </SidebarTop>
          <JobList isLoading={isJobsLoading} jobItems={jobItemsSliced} />
          {jobsTotalResults > 0 && (
            <PaginationControls
              currentPage={currentPage}
              handleChangePage={handleChangePage}
              totalNumberOfPages={totalNumberOfPages}
            />
          )}
        </Sidebar>
        <JobItemContent
          isLoading={isJobLoading}
          currentJobItem={currentJobItem}
        />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  )
}

export default App
