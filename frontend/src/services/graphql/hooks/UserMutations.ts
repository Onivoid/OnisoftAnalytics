import * as Types from "../types/codegen";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CreateUserMutationVariables = Types.Exact<{ [key: string]: never }>;

export type CreateUserMutation = {
    __typename?: "Mutation";
    createUser: { __typename?: "User"; createdAt: any; id: any };
};

export const CreateUserDocument = gql`
    mutation CreateUser {
        createUser {
            createdAt
            id
        }
    }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
    CreateUserMutation,
    CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateUserMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateUserMutation,
        CreateUserMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
        CreateUserDocument,
        options,
    );
}
export type CreateUserMutationHookResult = ReturnType<
    typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
    Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
    CreateUserMutation,
    CreateUserMutationVariables
>;
