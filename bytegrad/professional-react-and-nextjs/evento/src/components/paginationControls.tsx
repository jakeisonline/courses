import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"

type PaginationControlsProps = {
  prev: string | null
  next: string | null
}

const styles =
  "flex items-center gap-x-2 text-white px-5 py-3 bg-white/5 hover:opacity-100 transition text-sm"

export default function PaginationControls({
  prev,
  next,
}: PaginationControlsProps) {
  if (!prev && !next) return

  return (
    <section className="flex w-full justify-between">
      {prev ? (
        <Link href={prev} className={styles}>
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link href={next} className={styles}>
          Next
          <ArrowRightIcon />
        </Link>
      )}
    </section>
  )
}
