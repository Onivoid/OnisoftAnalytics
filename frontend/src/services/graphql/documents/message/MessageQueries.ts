import { gql } from "@apollo/client";

export const GET_ALL_MESSAGES = gql`
query GetAllMessages {
  messages {
    content
    id
  }
}
`;