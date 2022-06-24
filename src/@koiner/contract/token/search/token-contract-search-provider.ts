/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call */
import {
  PageInfo,
  SearchProvider,
  SearchRequest,
  SearchResponse,
  SearchResult,
} from '@appvise/search-manager-bak';
import { FilterTransformer } from '@appvise/graphql/transformer/filter-transformer';
import { TokenContract } from '@koiner/contract/token/token-contract';
import gql from 'graphql-tag';
import { ApolloClient } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';

const gqlGetTokenContracts = gql`
  query getTokenContracts(
    $after: String
    $before: String
    $first: Int!
    $filter: TokenContractsFilter
    $sort: [TokenContractsSortInput!]
  ) {
    tokenContracts(
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
          name
          symbol
          decimals
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

export class TokenContractSearchProvider
  implements SearchProvider<TokenContract>
{
  private client: ApolloClient<any>;
  constructor() {
    this.client = useApolloClient().client;
  }

  public search(
    request: SearchRequest
  ): Promise<SearchResponse<TokenContract>> {
    return this.client
      .query({
        query: gqlGetTokenContracts,
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
        const data = response.data.tokenContracts;

        return new SearchResponse(
          // @ts-ignore
          data.edges.map((edge) => {
            return {
              cursor: edge.cursor,
              item: edge.node,
            } as SearchResult<TokenContract>;
          }),
          data.pageInfo as PageInfo,
          data.totalCount
        );
      });
  }
}
