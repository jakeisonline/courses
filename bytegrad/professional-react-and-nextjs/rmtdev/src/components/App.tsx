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
import useJobItems, {
  useCurrentJobId,
  useDebounce,
  useJobItem,
} from "../lib/hooks"
import { PER_PAGE_COUNT } from "../lib/constants"

function App() {
  const [searchText, setSearchText] = useState<string>("")
  const debouncedSearchText = useDebounce({
    value: searchText,
    delay: 500,
  })
  const { jobItems, isJobsLoading } = useJobItems({
    searchText: debouncedSearchText,
  })
  const currentJobId = useCurrentJobId()
  const { currentJobItem, isJobLoading } = useJobItem({ currentJobId })
  const [currentPage, setCurrentPage] = useState<number>(1)
  console.log(currentPage)

  const jobsTotalResults = jobItems.length
  const jobItemsSliced = jobItems.slice(
    currentPage * PER_PAGE_COUNT - PER_PAGE_COUNT,
    currentPage * PER_PAGE_COUNT,
  )
  const totalNumberOfPages = Math.ceil(jobsTotalResults / PER_PAGE_COUNT)

  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1)
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1)
    }
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
            <SortingControls />
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
