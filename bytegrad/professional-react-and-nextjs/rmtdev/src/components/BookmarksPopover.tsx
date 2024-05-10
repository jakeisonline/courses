import { forwardRef } from "react"
import { useBookmarksContext } from "../lib/hooks"
import JobList from "./JobList"

type BookmarksPopoverProps = {
  ref: React.RefObject<HTMLDivElement>
}

const BookmarksPopover = forwardRef<HTMLDivElement, BookmarksPopoverProps>(
  function (_, ref) {
    const { bookmarkedJobItems, isBookmarksLoading } = useBookmarksContext()

    return (
      <div ref={ref} className="bookmarks-popover">
        <JobList jobItems={bookmarkedJobItems} isLoading={isBookmarksLoading} />
      </div>
    )
  },
)

export default BookmarksPopover
