type HeaderTopProps = {
  children: React.ReactNode
}

export default function HeaderTop({ children }: HeaderTopProps) {
  return <div className="header__top">{children}</div>
}
