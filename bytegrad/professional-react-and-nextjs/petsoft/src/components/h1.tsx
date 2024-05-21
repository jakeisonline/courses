import { cn } from "@/lib/utils"

type H1Props = {
  children: React.ReactNode
  className?: string
}

export default function H1({ children, className }: H1Props) {
  return (
    <h1 className={cn("text-3xl font-medium leading-8", className)}>
      {children}
    </h1>
  )
}
