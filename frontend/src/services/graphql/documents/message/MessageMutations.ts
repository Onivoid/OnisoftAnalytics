import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
mutation CreateMessage($content: String!) {
  createMessage(message: {content: $content}) {
    content
    id
  }
}
`;