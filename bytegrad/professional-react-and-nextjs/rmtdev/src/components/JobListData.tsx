import { useJobItemsContext } from "../lib/hooks"
import JobList from "./JobList"

export default function JobListData() {
  const { isJobsLoading, jobItemsSliced } = useJobItemsContext()
  return <JobList isLoading={isJobsLoading} jobItems={jobItemsSliced} />
}
