import { useJobItemsContext } from "../lib/hooks"
import { TSortBy } from "../lib/types"

export default function SortingControls() {
  const { sortBy, handleSortBy } = useJobItemsContext()
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        onSortBy={handleSortBy}
        currentSortBy={sortBy}
        sortType={"relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onSortBy={handleSortBy}
        currentSortBy={sortBy}
        sortType={"recent"}
      >
        Recent
      </SortingButton>
    </section>
  )
}

type SortingButtonProps = {
  onSortBy: (sortBy: TSortBy) => void
  currentSortBy: TSortBy
  sortType: TSortBy
  children: React.ReactNode
}

function SortingButton({
  onSortBy,
  sortType,
  currentSortBy,
  children,
}: SortingButtonProps) {
  return (
    <button
      onClick={() => {
        onSortBy(sortType)
      }}
      className={`sorting__button sorting__button--${sortType} ${
        sortType === currentSortBy && "sorting__button--active"
      }`}
    >
      {children}
    </button>
  )
}
