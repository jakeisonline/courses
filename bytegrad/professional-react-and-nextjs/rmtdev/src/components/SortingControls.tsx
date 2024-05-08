import { TSortBy } from "../lib/types"

type SortingControlsProps = {
  currentSortBy: TSortBy
  onSortBy: (sortBy: TSortBy) => void
}

export default function SortingControls({
  currentSortBy,
  onSortBy,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        onSortBy={onSortBy}
        currentSortBy={currentSortBy}
        sortType={"relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onSortBy={onSortBy}
        currentSortBy={currentSortBy}
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
