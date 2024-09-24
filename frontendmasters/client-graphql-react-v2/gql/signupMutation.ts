import { gql } from 'urql'

export const SignupMutation = gql`
  mutation Signup($input: AuthInput!) {
    createUser(input: $input) {
      id
      token
    }
  }
`
