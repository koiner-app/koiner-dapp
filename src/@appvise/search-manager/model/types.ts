import { Direction, StringFilter } from '@koiner/sdk';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type SortInput = {
  direction: Direction;
  field: string;
};

export type SearchFilter = {
  AND?: InputMaybe<Array<SearchFilter>>;
  OR?: InputMaybe<Array<SearchFilter>>;
  search?: InputMaybe<StringFilter>;
};

export type SearchRequestType = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<SearchFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<SortInput>>;
};

export type PageInfo = {
  __typename?: string;
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Node = {
  // id: Scalars['ID'];
  id: string;
  [key: string]: any;
};

export type Edge<TNode extends Node> = {
  __typename?: string;
  cursor: Scalars['String'];
  node: TNode;
  [key: string]: unknown;
};

export interface Connection<TNode extends Node, TEdge extends Edge<TNode>> {
  __typename?: string;
  edges?: Maybe<Array<TEdge>>;
  nodes?: Maybe<Array<TNode>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
}
