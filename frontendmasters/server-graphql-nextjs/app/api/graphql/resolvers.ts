import { db } from '@/db/db'
import { InsertIssues, SelectIssues, issues, users } from '@/db/schema'
import {
  GQLContext,
  AuthInputType,
  CreateIssueInputType,
  IssueType,
  IssuesQueryInputType,
  EditIssueInputType,
} from '@/types'
import { getUserFromToken, signin, signup } from '@/utils/auth'
import { and, asc, desc, eq, or, sql } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

export const resolvers = {
  User: {
    issues: (user: any, _: any, context: GQLContext) => {
      if (!context.user)
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })

      return db.query.issues.findMany({
        where: eq(issues.userId, user.id),
        orderBy: [desc(issues.createdAt)],
      })
    },
  },

  IssueStatus: {
    BACKLOG: 'backlog',
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
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

  Query: {
    me: (_: any, __: any, context: GQLContext) => {
      return context.user
    },
    issues: async (
      _: any,
      { input }: { input: IssuesQueryInputType },
      context: GQLContext
    ) => {
      if (!context.user) {
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
      }

      const andFilters = [eq(issues.userId, context.user.id)]

      if (input && input.statuses && input.statuses.length) {
        const statusFilters = input.statuses.map((status) =>
          eq(issues.status, status)
        )

        andFilters.push(or(...statusFilters))
      }

      const data = await db.query.issues.findMany({
        where: and(...andFilters),
        orderBy: [
          asc(sql`case ${issues.status}
        when "backlog" then 1
        when "inprogress" then 2
        when "done" then 3
      end`),
          desc(issues.createdAt),
        ],
      })

      return data
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
    editIssue: async (
      _: any,
      { input }: { input: EditIssueInputType },
      context: GQLContext
    ) => {
      if (!context.user) {
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
      }

      const data = await db
        .update(issues)
        .set(input)
        .where(eq(issues.id, input.id))
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
}
