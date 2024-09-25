export type GQLContext = {
  user?: { id: string; email: string; createdAt: string } | null
}

export type AuthInputType = {
  email: string
  password: string
}
