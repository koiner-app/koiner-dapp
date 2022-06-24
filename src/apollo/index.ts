import type { ApolloClientOptions } from '@apollo/client/core';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import { BootFileParams } from '@quasar/app-webpack';
import { split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

export /* async */ function getClientOptions(
  /* {app, router, ...} */ options?: Partial<BootFileParams<any>>
) {
  // Create an http link:
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_URI || 'http://gateway.docker:3000/graphql',
    // uri: process.env.GRAPHQL_URI || 'https://api.dev.koiner.app/graphql',
  });

  // Create a WebSocket link:
  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://gateway.docker:3000/graphql',
      // url: 'wss://api.dev.koiner.app/graphql',

      // Required because server will fail otherwise
      connectionParams: {},
    })
  );

  // const wsLink = new WebSocketLink({
  //   uri: 'ws://api.docker/graphql',
  //   options: {
  //     reconnect: true,
  // },
  // });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  return <ApolloClientOptions<unknown>>Object.assign(
    // General options.
    <ApolloClientOptions<unknown>>{
      link,
      cache: new InMemoryCache(),
      connectToDevTools: true,
    },

    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},

    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},

    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  );
}
