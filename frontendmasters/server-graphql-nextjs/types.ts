import { Placeholder, SQL } from 'drizzle-orm'

export type GQLContext = {
  user?: { id: string; email: string; createdAt: string } | null
}

export type AuthInputType = {
  email: string
  password: string
}

export type CreateIssueInputType = {
  name: string
  content: string
  status?: IssueStatus
}

export type IssueStatus =
  | 'done'
  | 'todo'
  | 'backlog'
  | SQL<unknown>
  | 'inprogress'
  | Placeholder<string, any>
  | undefined

export type IssueType = {
  id: string
  name: string
  content: string
  userId: string
  projectId: string
  status: IssueStatus
  createdAt: string
}
