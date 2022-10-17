import { boot } from 'quasar/wrappers';
import { devtoolsExchange } from '@urql/devtools';
import urql, { dedupExchange, fetchExchange } from '@urql/vue';
import { cacheExchange } from '@urql/exchange-graphcache';
import { relayPagination } from '@urql/exchange-graphcache/extras';

export default boot(({ app }) => {
  app.use(urql, {
    url: process.env.GRAPHQL_URI || 'https://api.koiner.app/graphql',
    requestPolicy: 'cache-first',
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        resolvers: {
          Query: {
            // Chain
            addresses: relayPagination(),
            blocks: relayPagination(),
            blocksHome: relayPagination(),
            events: relayPagination(),
            operations: relayPagination(),
            transactions: relayPagination(),

            // Contracts
            contracts: relayPagination(),
            contractEvents: relayPagination(),
            contractOperations: relayPagination(),
            tokenContracts: relayPagination(),
            tokenEvents: relayPagination(),
            tokenHolders: relayPagination(),
            tokenOperations: relayPagination(),

            // Network
            blockProducers: relayPagination(),
            blockRewards: relayPagination(),
          },
        },
        keys: {
          BlockHeader: () => null,
          BlockReward: () => null,
        },
      }),
      fetchExchange,
    ],
  });
});
