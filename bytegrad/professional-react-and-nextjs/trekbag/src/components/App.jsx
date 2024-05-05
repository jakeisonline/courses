import BackgroundHeading from "./BackgroundHeading"
import Footer from "./Footer"
import Header from "./Header"
import ItemList from "./ItemList"
import Sidebar from "./Sidebar"
import Logo from "./Logo"
import Counter from "./Counter"
import AddItemForm from "./AddItemForm"
import ButtonGroup from "./ButtonGroup"

function App() {
  return (
    <>
      <BackgroundHeading />
      <main>
        <Header>
          <Logo />
          <Counter />
        </Header>
        <ItemList />
        <Sidebar>
          <AddItemForm />
          <ButtonGroup />
        </Sidebar>
      </main>
      <Footer />
    </>
  )
}

export default App
