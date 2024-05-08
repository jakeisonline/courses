export type TJobItem = {
  id: number
  badgeLetters: string
  title: string
  company: string
  relevanceScore: number
  daysAgo: number
}

export type TJobContent = TJobItem & {
  companyURL: string
  coverImgURL: string
  description: string
  duration: string
  location: string
  salary: string
  qualifications: string[]
  reviews: string[]
}

export type TSortBy = "recent" | "relevant"
