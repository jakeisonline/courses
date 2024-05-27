import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { useJobItemsContext } from "../lib/hooks"

export default function PaginationControls() {
  const {
    jobsTotalResults,
    currentPage,
    handleChangePage,
    totalNumberOfPages,
  } = useJobItemsContext()

  if (jobsTotalResults > 0) {
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

  return <></>
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
