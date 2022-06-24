/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call */
import {
  PageInfo,
  SearchProvider,
  SearchRequest,
  SearchResponse,
  SearchResult,
} from '@appvise/search-manager-bak';
import { FilterTransformer } from '@appvise/graphql/transformer/filter-transformer';
import { TokenOperation } from '@koiner/contract/token/token-operation';
import gql from 'graphql-tag';
import { ApolloClient } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';

const gqlGetTokenOperations = gql`
  query getTokenOperations(
    $after: String
    $before: String
    $first: Int!
    $filter: TokenOperationsFilter
    $sort: [TokenOperationsSortInput!]
  ) {
    tokenOperations(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          transactionId
          from
          to
          value
          name
        }
        __typename
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export class TokenOperationSearchProvider
  implements SearchProvider<TokenOperation>
{
  private client: ApolloClient<any>;
  constructor() {
    this.client = useApolloClient().client;
  }

  public search(
    request: SearchRequest
  ): Promise<SearchResponse<TokenOperation>> {
    return this.client
      .query({
        query: gqlGetTokenOperations,
        variables: {
          before: request.before,
          after: request.after,
          first: request.first,
          filter: request.filter
            ? FilterTransformer.transform(request.filter)
            : undefined,
          // sort: request.sort || [{field: 'height', direction: SortDirection.asc}],
        },
      })
      .then((response: any) => {
        const data = response.data.tokenOperations;

        return new SearchResponse(
          // @ts-ignore
          data.edges.map((edge) => {
            return {
              cursor: edge.cursor,
              item: edge.node,
            } as SearchResult<TokenOperation>;
          }),
          data.pageInfo as PageInfo,
          data.totalCount
        );
      });
  }
}
