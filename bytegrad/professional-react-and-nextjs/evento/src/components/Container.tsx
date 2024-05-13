type ContainerProps = {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="bg-slate-950 flex flex-col max-w-7xl min-h-screen mx-auto">
      {children}
    </div>
  )
}
