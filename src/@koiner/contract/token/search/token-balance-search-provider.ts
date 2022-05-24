/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call */
import {
  PageInfo,
  SearchProvider,
  SearchRequest,
  SearchResponse,
  SearchResult,
} from '@appvise/search-manager';
import { FilterTransformer } from '@appvise/graphql/transformer/filter-transformer';
import { TokenBalance } from '@koiner/contract/token/token-balance';
import gql from 'graphql-tag';
import { ApolloClient } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';

const gqlGetTokenBalances = (includeContract: boolean) => {
  const contract = includeContract
    ? 'contract { id name decimals symbol }'
    : '';

  return gql`
    query getTokenBalances(
      $after: String
      $before: String
      $first: Int!
      $filter: TokenBalancesFilter
      $sort: [TokenBalancesSortInput!]
    ) {
      tokenBalances(
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
            addressId
            balance
            ${contract}
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
};

export class TokenBalanceSearchProvider
  implements SearchProvider<TokenBalance>
{
  private client: ApolloClient<any>;
  constructor(private readonly includeContract: boolean) {
    this.client = useApolloClient().client;
  }

  public search(request: SearchRequest): Promise<SearchResponse<TokenBalance>> {
    return this.client
      .query({
        query: gqlGetTokenBalances(this.includeContract),
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
        const data = response.data.tokenBalances;

        return new SearchResponse(
          // @ts-ignore
          data.edges.map((edge) => {
            return {
              cursor: edge.cursor,
              item: edge.node,
            } as SearchResult<TokenBalance>;
          }),
          data.pageInfo as PageInfo,
          data.totalCount
        );
      });
  }
}
