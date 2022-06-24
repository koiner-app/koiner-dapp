/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call */
import { Observable } from 'rxjs';
import {
  PageInfo,
  SearchProvider,
  SearchRequest,
  SearchResponse,
  SearchResult,
} from '@appvise/search-manager-bak';
import { FilterTransformer } from '@appvise/graphql/transformer/filter-transformer';
import { Operation } from '@koiner/chain/operation/operation';
import gql from 'graphql-tag';
import { ApolloClient, FetchResult } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';

const gqlGetOperations = gql`
  query getOperations(
    $after: String
    $before: String
    $first: Int!
    $filter: OperationsFilter
    $sort: [OperationsSortInput!]
  ) {
    operations(
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
          blockHeight
          type
          transactionId
          index
          details {
            __typename
            ... on ContractOperation {
              id
              entryPoint
              contractId
              contractStandardType
              details {
                __typename
                ... on TokenOperation {
                  id
                  from
                  to
                  value
                }
              }
            }
            ... on SystemCallOperation {
              id
              callId
              contractId
            }
            ... on SystemContractOperation {
              id
              contractId
              systemContract
            }
            ... on UploadContractOperation {
              id
              contractId
              abi
            }
          }
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

const gqlSubscribeToNewOperations = gql`
  subscription NewOperations {
    operationCreated {
      id
      blockHeight
      type
      transactionId
      index
      details {
        __typename
        ... on ContractOperation {
          id
          entryPoint
          contractId
          contractStandardType
          details {
            __typename
            ... on TokenOperation {
              id
              from
              to
              value
            }
          }
        }
        ... on SystemCallOperation {
          id
          callId
          contractId
        }
        ... on SystemContractOperation {
          id
          contractId
          systemContract
        }
        ... on UploadContractOperation {
          id
          contractId
          abi
        }
      }
    }
  }
`;

export class OperationSearchProvider implements SearchProvider<Operation> {
  private client: ApolloClient<any>;
  constructor() {
    this.client = useApolloClient().client;
  }

  public search(request: SearchRequest): Promise<SearchResponse<Operation>> {
    return this.client
      .query({
        query: gqlGetOperations,
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
        const data = response.data.operations;

        return new SearchResponse(
          // @ts-ignore
          data.edges.map((edge) => {
            return {
              cursor: edge.cursor,
              item: edge.node,
            } as SearchResult<Operation>;
          }),
          data.pageInfo as PageInfo,
          data.totalCount
        );
      });
  }

  public async subscribe(
    request: SearchRequest
  ): Promise<Observable<SearchResponse<Operation>>> {
    const subscription = this.client.subscribe({
      query: gqlSubscribeToNewOperations,
      fetchPolicy: 'no-cache',
    });

    return new Observable((observer) => {
      return subscription.subscribe({
        next(value: FetchResult<any>) {
          if (value.data != null) {
            const newResults: SearchResponse<Operation> =
              new SearchResponse<Operation>(
                [
                  {
                    // TODO: Load cursor
                    cursor: value.data.operationCreated.createdAt,
                    item: value.data.operationCreated,
                  } as SearchResult<Operation>,
                ],
                {
                  hasNextPage: false,
                  hasPreviousPage: false,
                } as PageInfo,
                1
              );

            observer.next(newResults);
          }
        },
        error: (error) => {
          console.error(error);
          observer.error(error);
        },
        complete: () => {
          console.log('Completed');
          observer.complete();
        },
      });
    });
  }
}
