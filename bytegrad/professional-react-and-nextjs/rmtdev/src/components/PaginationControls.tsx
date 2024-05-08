import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"

type PaginationControlsProps = {
  currentPage: number
  handleChangePage: (direction: "next" | "previous") => void
  totalNumberOfPages: number
}

export default function PaginationControls({
  currentPage,
  handleChangePage,
  totalNumberOfPages,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={() => handleChangePage("previous")}
          className={"pagination__button--previous"}
        >
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </PaginationButton>
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          onClick={() => handleChangePage("next")}
          className={"pagination__button--next"}
        >
          Page {currentPage + 1}
          <ArrowRightIcon />
        </PaginationButton>
      )}
    </section>
  )
}

type PaginationButtonProps = {
  onClick: () => void
  className?: string
  children: React.ReactNode
}

function PaginationButton({
  onClick,
  className,
  children,
}: PaginationButtonProps) {
  return (
    <button onClick={onClick} className={`pagination__button ${className}`}>
      {children}
    </button>
  )
}
