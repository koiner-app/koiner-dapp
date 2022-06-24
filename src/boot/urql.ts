import { boot } from 'quasar/wrappers';
import { devtoolsExchange } from '@urql/devtools';
import urql, { dedupExchange, fetchExchange } from '@urql/vue';
import { cacheExchange } from '@urql/exchange-graphcache';
import { relayPagination } from '@urql/exchange-graphcache/extras';

export default boot(({ app }) => {
  app.use(urql, {
    url: process.env.GRAPHQL_URI || 'http://gateway.docker:3000/graphql',
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        resolvers: {
          Query: {
            blocks: relayPagination(),
            // transactions: relayPagination(),
            // operations: relayPagination(),
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
