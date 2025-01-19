import * as Types from '../types/codegen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAdminsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAdminsQuery = { __typename?: 'Query', getAdmins: { __typename: 'AdminAuthenticatedList', admins: Array<{ __typename?: 'AdminAuthenticated', id: any, role: string, username: string }> } | { __typename: 'Error', message: string } };


export const GetAdminsDocument = gql`
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

/**
 * __useGetAdminsQuery__
 *
 * To run a query within a React component, call `useGetAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminsQuery, GetAdminsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminsQuery, GetAdminsQueryVariables>(GetAdminsDocument, options);
      }
export function useGetAdminsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminsQuery, GetAdminsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminsQuery, GetAdminsQueryVariables>(GetAdminsDocument, options);
        }
export function useGetAdminsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdminsQuery, GetAdminsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdminsQuery, GetAdminsQueryVariables>(GetAdminsDocument, options);
        }
export type GetAdminsQueryHookResult = ReturnType<typeof useGetAdminsQuery>;
export type GetAdminsLazyQueryHookResult = ReturnType<typeof useGetAdminsLazyQuery>;
export type GetAdminsSuspenseQueryHookResult = ReturnType<typeof useGetAdminsSuspenseQuery>;
export type GetAdminsQueryResult = Apollo.QueryResult<GetAdminsQuery, GetAdminsQueryVariables>;