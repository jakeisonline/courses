type SidebarProps = {
  children: React.ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  return <div className="sidebar">{children}</div>
}
