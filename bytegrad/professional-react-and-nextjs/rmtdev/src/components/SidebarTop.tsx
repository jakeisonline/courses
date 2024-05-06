type SidebarTopProps = {
  children: React.ReactNode
}

export default function SidebarTop({ children }: SidebarTopProps) {
  return <div className="sidebar__top">{children}</div>
}
