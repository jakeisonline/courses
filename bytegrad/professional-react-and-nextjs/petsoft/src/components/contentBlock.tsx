type ContentBlockProps = {
  children: React.ReactNode
}

export default function ContentBlock({ children }: ContentBlockProps) {
  return (
    <div className="h-full w-full overflow-hidden rounded-md bg-[#F7F8FA] shadow-sm">
      {children}
    </div>
  )
}
