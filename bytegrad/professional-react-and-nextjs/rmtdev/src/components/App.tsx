import { TJobItem } from "../lib/types"
import { useEffect, useState } from "react"
import Background from "./Background"
import Container from "./Container"
import Footer from "./Footer"
import Header from "./Header"
import { JOBS_ENDPOINT } from "../lib/constants"
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

function App() {
  const [jobItems, setJobItems] = useState<TJobItem[]>([])
  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
    if (!searchText) return

    const fetchData = async () => {
      const response = await fetch(`${JOBS_ENDPOINT}?search=${searchText}`)
      const data = await response.json()
      setJobItems(data.jobItems)
    }

    fetchData()
  }, [searchText])

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
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItems} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  )
}

export default App
