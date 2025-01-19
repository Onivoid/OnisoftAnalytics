import { gql } from '@apollo/client';

export const CREATE_ADMIN = gql`
mutation CreateAdmin($password: String!, $username: String!){
  createAdmin(password: $password, username: $username) {
    ... on AdminAuthenticated {
      id
      role
      username
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const DELETE_ADMIN = gql`
mutation DeleteAdmin($id: UUID!) {
  deleteAdmin(id: $id) {
    ... on Success {
      __typename
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}`;

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(password: $password, username: $username) {
    ... on AdminAuthenticated {
      id
      role
      username
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const LOGOUT = gql`
mutation Logout {
  logout
}
`;

export const ME = gql`
mutation Me {
  me {
    ... on AdminAuthenticated {
      id
      role
      username
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;