export const schema = `#graphql
  type Issue {
    id: ID!
    name: String!
    content: String!
    userId: ID!
    projectId: ID!
    status: IssueStatus
    createdAt: String!
    user: User!
  }

  input CreateIssueInput {
    name: String!
    content: String!
    status: IssueStatus
  }

  enum IssueStatus {
    DONE
    TODO
    IN_PROGRESS
    BACKLOG
  }

  type User {
    id: ID!
    email: String!
    createdAt: String!
    token: String
    issues: [Issue]!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input IssuesFilterInput {
    statuses: [IssueStatus!]
  }

  type Query {
    me: User
    issues(input: IssuesFilterInput): [Issue]!
  }

  type Mutation {
    signIn(input: AuthInput!): User
    createUser(input: AuthInput!): User
    createIssue(input: CreateIssueInput!): Issue
  }
`
