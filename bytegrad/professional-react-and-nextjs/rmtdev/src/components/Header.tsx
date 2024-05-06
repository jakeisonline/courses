type HeaderProps = {
  children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  return <header className="header">{children}</header>
}
