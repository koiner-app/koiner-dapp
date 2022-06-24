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
import { Address } from '@koiner/chain/address/address';
import gql from 'graphql-tag';
import { ApolloClient, FetchResult } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';

const gqlGetAddresses = gql`
  query getAddresses(
    $after: String
    $before: String
    $first: Int!
    $filter: AddressesFilter
    $sort: [AddressesSortInput!]
  ) {
    addresses(
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

const gqlSubscribeToNewAddresses = gql`
  subscription NewAddresses {
    addressCreated {
      id
    }
  }
`;

export class AddressSearchProvider implements SearchProvider<Address> {
  private client: ApolloClient<any>;
  constructor() {
    this.client = useApolloClient().client;
  }

  public search(request: SearchRequest): Promise<SearchResponse<Address>> {
    return this.client
      .query({
        query: gqlGetAddresses,
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
        const data = response.data.addresses;

        return new SearchResponse(
          // @ts-ignore
          data.edges.map((edge) => {
            return {
              cursor: edge.cursor,
              item: edge.node,
            } as SearchResult<Address>;
          }),
          data.pageInfo as PageInfo,
          data.totalCount
        );
      });
  }

  public async subscribe(
    request: SearchRequest
  ): Promise<Observable<SearchResponse<Address>>> {
    const subscription = this.client.subscribe({
      query: gqlSubscribeToNewAddresses,
      fetchPolicy: 'no-cache',
    });

    return new Observable((observer) => {
      return subscription.subscribe({
        next(value: FetchResult<any>) {
          if (value.data != null) {
            const newResults: SearchResponse<Address> =
              new SearchResponse<Address>(
                [
                  {
                    // TODO: Load cursor
                    cursor: value.data.addressCreated.createdAt,
                    item: value.data.addressCreated,
                  } as SearchResult<Address>,
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
