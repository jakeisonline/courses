type ResultsCountProps = {
  count: number
}

export default function ResultsCount({ count }: ResultsCountProps) {
  return <p className="count">{count} results</p>
}
