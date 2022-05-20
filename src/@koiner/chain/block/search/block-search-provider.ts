/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call */
import { Observable } from 'rxjs';
// import { Observable as ZenObservable } from 'zen-observable-ts';

import {
  PageInfo,
  SearchProvider,
  SearchRequest,
  SearchResponse,
  SearchResult,
} from '@appvise/search-manager';
import { FilterTransformer } from '@appvise/graphql/transformer/filter-transformer';
import { Block } from '@koiner/chain/block/block';
import gql from 'graphql-tag';
import { FetchResult, ApolloClient } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';

const gqlGetBlocks = gql`
  query getBlocks(
    $after: String
    $before: String
    $first: Int!
    $filter: BlocksFilter
    $sort: [BlocksSortInput!]
  ) {
    blocks(
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
          header {
            height
            previous
            timestamp
            previousStateMerkleRoot
            signer
          }
          transactionCount
          reward {
            producerId
            value
            contractId
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

const gqlSubscribeToNewBlocks = gql`
  subscription blockCreated {
    blockCreated {
      id
      header {
        height
        previous
        timestamp
        previousStateMerkleRoot
        signer
      }
      transactionCount
      reward {
        producerId
        value
        contractId
      }
    }
  }
`;

export class BlockSearchProvider implements SearchProvider<Block> {
  private client: ApolloClient<any>;
  constructor() {
    this.client = useApolloClient().client;
  }

  public search(request: SearchRequest): Promise<SearchResponse<Block>> {
    return this.client
      .query({
        query: gqlGetBlocks,
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
        const data = response.data.blocks;

        return new SearchResponse(
          // @ts-ignore
          data.edges.map((edge) => {
            return {
              cursor: edge.cursor,
              item: edge.node,
            } as SearchResult<Block>;
          }),
          data.pageInfo as PageInfo,
          data.totalCount
        );
      });
  }

  public async subscribe(
    request: SearchRequest
  ): Promise<Observable<SearchResponse<Block>>> {
    const subscription = this.client.subscribe({
      query: gqlSubscribeToNewBlocks,
      fetchPolicy: 'no-cache',
    });

    return new Observable((observer) => {
      return subscription.subscribe({
        next(value: FetchResult<any>) {
          if (value.data != null) {
            const newResults: SearchResponse<Block> = new SearchResponse<Block>(
              [
                {
                  // TODO: Load cursor
                  cursor: value.data.blockCreated.createdAt,
                  item: value.data.blockCreated,
                } as SearchResult<Block>,
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
          observer.error(error);
        },
        complete: () => {
          observer.complete();
        },
      });
    });
  }
}
