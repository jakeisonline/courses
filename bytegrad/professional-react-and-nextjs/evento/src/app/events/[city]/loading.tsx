import Skeleton from "@/components/skeleton"
import SkeletonCard from "@/components/skeletonCard"

export default function Loading() {
  return (
    <div className="flex max-w-[1110px] justify-center flex-wrap mx-auto px-5 pb-24 animate-pulse items-center gap-20">
      {Array.from({ length: 6 }).map((item, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
