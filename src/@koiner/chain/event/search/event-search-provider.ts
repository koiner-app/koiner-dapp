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
import { Event } from '@koiner/chain/event/event';
import gql from 'graphql-tag';
import { ApolloClient, FetchResult } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';

const gqlGetEvents = gql`
  query getEvents(
    $after: String
    $before: String
    $first: Int!
    $filter: EventsFilter
    $sort: [EventsSortInput!]
  ) {
    events(
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
          sequence
          contractId
          name
          data
          impacted
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

const gqlSubscribeToNewEvents = gql`
  subscription NewEvents {
    eventCreated {
      id
      transactionId
      sequence
      contractId
      name
      data
      impacted
    }
  }
`;

export class EventSearchProvider implements SearchProvider<Event> {
  private client: ApolloClient<any>;
  constructor() {
    this.client = useApolloClient().client;
  }

  public search(request: SearchRequest): Promise<SearchResponse<Event>> {
    return this.client
      .query({
        query: gqlGetEvents,
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
        const data = response.data.events;

        return new SearchResponse(
          // @ts-ignore
          data.edges.map((edge) => {
            return {
              cursor: edge.cursor,
              item: edge.node,
            } as SearchResult<Event>;
          }),
          data.pageInfo as PageInfo,
          data.totalCount
        );
      });
  }

  public async subscribe(
    request: SearchRequest
  ): Promise<Observable<SearchResponse<Event>>> {
    const subscription = this.client.subscribe({
      query: gqlSubscribeToNewEvents,
      fetchPolicy: 'no-cache',
    });

    return new Observable((observer) => {
      return subscription.subscribe({
        next(value: FetchResult<any>) {
          if (value.data != null) {
            const newResults: SearchResponse<Event> = new SearchResponse<Event>(
              [
                {
                  // TODO: Load cursor
                  cursor: value.data.eventCreated.createdAt,
                  item: value.data.eventCreated,
                } as SearchResult<Event>,
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
