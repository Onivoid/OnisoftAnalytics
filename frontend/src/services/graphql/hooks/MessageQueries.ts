import * as Types from '../types/codegen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllMessagesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllMessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', content: string, id: number }> };


export const GetAllMessagesDocument = gql`
    query GetAllMessages {
  messages {
    content
    id
  }
}
    `;

/**
 * __useGetAllMessagesQuery__
 *
 * To run a query within a React component, call `useGetAllMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMessagesQuery, GetAllMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(GetAllMessagesDocument, options);
      }
export function useGetAllMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMessagesQuery, GetAllMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(GetAllMessagesDocument, options);
        }
export function useGetAllMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllMessagesQuery, GetAllMessagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(GetAllMessagesDocument, options);
        }
export type GetAllMessagesQueryHookResult = ReturnType<typeof useGetAllMessagesQuery>;
export type GetAllMessagesLazyQueryHookResult = ReturnType<typeof useGetAllMessagesLazyQuery>;
export type GetAllMessagesSuspenseQueryHookResult = ReturnType<typeof useGetAllMessagesSuspenseQuery>;
export type GetAllMessagesQueryResult = Apollo.QueryResult<GetAllMessagesQuery, GetAllMessagesQueryVariables>;