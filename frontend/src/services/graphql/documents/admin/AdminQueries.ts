import { gql } from '@apollo/client';

export const GET_ADMINS = gql`
query GetAdmins {
  getAdmins {
    ... on AdminAuthenticatedList {
      __typename
      admins {
        id
        role
        username
      }
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;