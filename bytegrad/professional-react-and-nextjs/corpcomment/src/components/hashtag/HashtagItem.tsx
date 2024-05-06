type HashtagItemProps = {
  company: string
  onSelectCompany: (company: string) => void
}

export default function HashtagItem({
  company,
  onSelectCompany,
}: HashtagItemProps) {
  const handleClick = () => {
    onSelectCompany(company)
  }

  return (
    <li>
      <button onClick={handleClick}>#{company}</button>
    </li>
  )
}
