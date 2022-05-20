/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call */
import {
  PageInfo,
  SearchProvider,
  SearchRequest,
  SearchResponse,
  SearchResult,
} from '@appvise/search-manager';
import { FilterTransformer } from '@appvise/graphql/transformer/filter-transformer';
import { ContractOperation } from '@koiner/contract/contract/contract-operation';
import gql from 'graphql-tag';
import { ApolloClient } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';

const gqlGetContractOperations = gql`
  query getContractOperations(
    $after: String
    $before: String
    $first: Int!
    $filter: ContractOperationsFilter
    $sort: [ContractOperationsSortInput!]
  ) {
    contractOperations(
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
          contractId
          transactionId
          # entryPoint
          # args
          contractStandardType
          # details
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

export class ContractOperationSearchProvider
  implements SearchProvider<ContractOperation>
{
  private client: ApolloClient<any>;
  constructor() {
    this.client = useApolloClient().client;
  }

  public search(
    request: SearchRequest
  ): Promise<SearchResponse<ContractOperation>> {
    return this.client
      .query({
        query: gqlGetContractOperations,
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
        const data = response.data.contractOperations;

        return new SearchResponse(
          // @ts-ignore
          data.edges.map((edge) => {
            return {
              cursor: edge.cursor,
              item: edge.node,
            } as SearchResult<ContractOperation>;
          }),
          data.pageInfo as PageInfo,
          data.totalCount
        );
      });
  }
}
