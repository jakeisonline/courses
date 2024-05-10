import { useBookmarksContext } from "../lib/hooks"
import JobList from "./JobList"

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isBookmarksLoading } = useBookmarksContext()

  return (
    <div className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobItems} isLoading={isBookmarksLoading} />
    </div>
  )
}
