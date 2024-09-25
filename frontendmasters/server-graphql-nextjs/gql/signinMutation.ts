import { gql } from 'urql'

export const SigninMutation = gql`
  mutation Mutation($input: AuthInput!) {
    signIn(input: $input) {
      token
    }
  }
`
