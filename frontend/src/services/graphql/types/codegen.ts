export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AdminAuthenticated = {
  __typename?: 'AdminAuthenticated';
  id: Scalars['UUID']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type AdminAuthenticatedError = AdminAuthenticated | Error;

export type AdminAuthenticatedList = {
  __typename?: 'AdminAuthenticatedList';
  admins: Array<AdminAuthenticated>;
};

export type AdminAuthenticatedListError = AdminAuthenticatedList | Error;

export type Error = {
  __typename?: 'Error';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdmin: AdminAuthenticatedError;
  createUser: User;
  deleteAdmin: SuccessError;
  login: AdminAuthenticatedError;
  logout: Scalars['Boolean']['output'];
};


export type MutationCreateAdminArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteAdminArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAdmins: AdminAuthenticatedListError;
  users: Array<User>;
};

export type Success = {
  __typename?: 'Success';
  message: Scalars['String']['output'];
};

export type SuccessError = Error | Success;

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
};
