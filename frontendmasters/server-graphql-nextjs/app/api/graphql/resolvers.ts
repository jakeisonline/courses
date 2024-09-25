import { db } from '@/db/db'
import { InsertIssues, SelectIssues, issues, users } from '@/db/schema'
import {
  GQLContext,
  AuthInputType,
  CreateIssueInputType,
  IssueType,
} from '@/types'
import { getUserFromToken, signin, signup } from '@/utils/auth'
import { and, asc, desc, eq, or, sql } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

export const resolvers = {
  Query: {
    me: (_: any, __: any, context: GQLContext) => {
      return context.user
    },
  },

  Mutation: {
    createIssue: async (
      _: any,
      { input }: { input: CreateIssueInputType },
      context: GQLContext
    ) => {
      if (!context.user) {
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
      }

      const data = await db
        .insert(issues)
        .values({ userId: context.user.id, ...input })
        .returning()
      return data[0]
    },
    signIn: async (_: any, { input }: { input: AuthInputType }) => {
      const data = await signin(input)

      if (!data || !data.token || !data.user) {
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
      }

      return { ...data.user, token: data.token }
    },
    createUser: async (_: any, { input }: { input: AuthInputType }) => {
      const data = await signup(input)

      if (!data || !data.token || !data.user) {
        throw new GraphQLError('SIGNUP_FAILED', { extensions: { code: 400 } })
      }

      return { ...data.user, token: data.token }
    },
  },
  Issue: {
    user: (issue: IssueType, _: any, context: GQLContext) => {
      if (!context.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      return db.query.users.findFirst({
        where: eq(users.id, issue.userId),
      })
    },
  },
}
