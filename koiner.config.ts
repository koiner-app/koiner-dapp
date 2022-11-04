export const koinerConfig = {
  production: {
    api: process.env.GRAPHQL_URI ?? 'https://api.koiner.app/graphql',
  },
  test: {
    api: process.env.GRAPHQL_URI_TEST ?? 'https://api.test.koiner.app/graphql',
  },
  local: {
    api: process.env.GRAPHQL_URI_TEST ?? 'http://api.local/graphql',
  },
};
