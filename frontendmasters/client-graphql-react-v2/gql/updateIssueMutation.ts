import { gql } from 'urql'

export const UpdateIssueStatusMutation = gql`
  mutation UpdateIssueStatusMutation($input: EditIssueInput!) {
    editIssue(input: $input) {
      id
      status
    }
  }
`
