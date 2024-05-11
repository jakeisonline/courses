import { useJobItemsContext } from "../lib/hooks"

export default function ResultsCount() {
  const { jobsTotalResults } = useJobItemsContext()
  return <p className="count">{jobsTotalResults} results</p>
}
