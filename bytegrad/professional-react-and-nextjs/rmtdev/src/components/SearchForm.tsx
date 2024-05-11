import { useSearchTextContext } from "../lib/hooks"

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(e.target.value.trim())
  }

  return (
    <form onSubmit={handleSubmit} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={handleChange}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  )
}
