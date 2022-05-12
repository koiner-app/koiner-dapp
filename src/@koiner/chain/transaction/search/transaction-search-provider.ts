/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call */
import { Observable } from 'rxjs';
import {
  PageInfo,
  SearchProvider,
  SearchRequest,
  SearchResponse,
  SearchResult,
} from '@appvise/search-manager';
import { FilterTransformer } from '@appvise/graphql/transformer/filter-transformer';
import { Transaction } from '@koiner/chain/transaction/transaction';
import gql from 'graphql-tag';
import { ApolloClient, FetchResult } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';

const gqlGetTransactions = gql`
  query getTransactions(
    $after: String
    $before: String
    $first: Int!
    $filter: TransactionsFilter
    $sort: [TransactionsSortInput!]
  ) {
    transactions(
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
          header {
            rcLimit
            nonce
            operationMerkleRoot
            payer
          }
          operationCount
          signature
          index
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

const gqlSubscribeToNewTransactions = gql`
  subscription NewTransactions {
    transactionCreated {
      id
      blockHeight
      header {
        rcLimit
        nonce
        operationMerkleRoot
        payer
      }
      operationCount
      signature
      index
    }
  }
`;

export class TransactionSearchProvider implements SearchProvider<Transaction> {
  private client: ApolloClient<any>;
  constructor() {
    this.client = useApolloClient().client;
  }

  public search(request: SearchRequest): Promise<SearchResponse<Transaction>> {
    return this.client
      .query({
        query: gqlGetTransactions,
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
        const data = response.data.transactions;

        return new SearchResponse(
          // @ts-ignore
          data.edges.map((edge) => {
            return {
              cursor: edge.cursor,
              item: edge.node,
            } as SearchResult<Transaction>;
          }),
          data.pageInfo as PageInfo,
          data.totalCount
        );
      });
  }

  public async subscribe(
    request: SearchRequest
  ): Promise<Observable<SearchResponse<Transaction>>> {
    const subscription = this.client.subscribe({
      query: gqlSubscribeToNewTransactions,
      fetchPolicy: 'no-cache',
    });

    return new Observable((observer) => {
      return subscription.subscribe({
        next(value: FetchResult<any>) {
          if (value.data != null) {
            const newResults: SearchResponse<Transaction> =
              new SearchResponse<Transaction>(
                [
                  {
                    // TODO: Load cursor
                    cursor: value.data.transactionCreated.createdAt,
                    item: value.data.transactionCreated,
                  } as SearchResult<Transaction>,
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
