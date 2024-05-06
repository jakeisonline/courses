import HashtagItem from "./HashtagItem"

type HashtagListProps = {
  companyList: string[]
  setSelectedCompany: (company: string) => void
}

export default function HashtagList({
  companyList,
  setSelectedCompany,
}: HashtagListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onSelectCompany={setSelectedCompany}
        />
      ))}
    </ul>
  )
}
