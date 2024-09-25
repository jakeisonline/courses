import { db } from '@/db/db'
import { InsertIssues, SelectIssues, issues, users } from '@/db/schema'
import { GQLContext, AuthInputType } from '@/types'
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
}
