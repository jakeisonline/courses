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
import useJobItems, {
  useCurrentJobId,
  useDebounce,
  useJobItem,
} from "../lib/hooks"

function App() {
  const [searchText, setSearchText] = useState<string>("")
  const debouncedSearchText = useDebounce({
    value: searchText,
    delay: 500,
  })
  const { jobsTotalResults, jobItemsSliced, isJobsLoading } = useJobItems({
    searchText: debouncedSearchText,
  })
  const currentJobId = useCurrentJobId()
  const [currentJobItem, isJobLoading] = useJobItem({ currentJobId })

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
          <PaginationControls />
        </Sidebar>
        <JobItemContent
          isLoading={isJobLoading}
          currentJobItem={currentJobItem}
        />
      </Container>
      <Footer />
    </>
  )
}

export default App
