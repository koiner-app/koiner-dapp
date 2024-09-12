export const koinerConfig = {
  production: {
    api: process.env.GRAPHQL_URI ?? 'https://api.koiner.app/graphql',
    rpc: process.env.JSON_RPC_URL ?? 'https://api.koinos.io',
    checker: 'https://checker.koiner.app',
    chainId: 'QmeehjqATVaC4ReXxwbw4DQLbEdEAo8SmTBVzZz8s5ZV5F',
    chainName: 'mainnet',
    koinerAddress: '14mLxvouwdmV6vUoeBZMWsxejPKAPLy7yb',
    contracts: {
      koin: {
        id: '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
        name: 'Koinos',
        symbol: 'KOIN',
        decimals: 8,
      },
      vhp: {
        id: '18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr',
        name: 'Virtual Hashpower',
        symbol: 'VHP',
        decimals: 8,
      },
      oldVhp: {
        id: '1AdzuXSpC6K9qtXdCBgD5NUpDNwHjMgrc9',
        name: 'Virtual Hashpower V1',
        symbol: 'VHP',
        decimals: 8,
      },
      pVhp: {
        id: '1NHReq2apWsQ6UPBjNqcV3ABsj88Ncimiy',
        name: 'Pooled VHP',
        symbol: 'pVHP',
        decimals: 8,
      },
      pob: {
        id: '159myq5YUhhoVWu3wsHKHiJYKPKGUrGiyv',
        name: 'Proof of Burn',
      },
    },
  },
  test: {
    api: process.env.GRAPHQL_URI_TEST ?? 'https://api.test.koiner.app/graphql',
    rpc: process.env.JSON_RPC_URL ?? 'https://harbinger-api.koinos.io/',
    checker: 'https://checker.test.koiner.app',
    chainId: 'QmeehjqATVaC4ReXxwbw4DQLbEdEAo8SmTBVzZz8s5ZV5F',
    chainName: 'mainnet',
    koinerAddress: '14mLxvouwdmV6vUoeBZMWsxejPKAPLy7yb',
    contracts: {
      koin: {
        id: '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',
        name: 'Koinos',
        symbol: 'KOIN',
        decimals: 8,
      },
      vhp: {
        id: '1JZqj7dDrK5LzvdJgufYBJNUFo88xBoWC8',
        name: 'Virtual Hashpower',
        symbol: 'VHP',
        decimals: 8,
      },
      pVhp: {
        id: '13n14L2JhnWTjt6eX3DVkz1mtCFwwCfJZX',
        name: 'Pooled VHP',
        symbol: 'pVHP',
        decimals: 8,
      },
      pob: {
        id: '198RuEouhgiiaQm7uGfaXS6jqZr6g6nyoR',
        name: 'Proof of Burn',
      },
    },
  },
  local: {
    api: process.env.GRAPHQL_URI_TEST ?? 'http://api.local/graphql',
    rpc: process.env.JSON_RPC_URL ?? 'https://api.koinos.io',
    checker: 'https://checker.test.koiner.app',
    chainId: 'QmeehjqATVaC4ReXxwbw4DQLbEdEAo8SmTBVzZz8s5ZV5F',
    chainName: 'mainnet',
    koinerAddress: '14mLxvouwdmV6vUoeBZMWsxejPKAPLy7yb',
    contracts: {
      koin: {
        id: '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
        name: 'Koinos',
        symbol: 'KOIN',
        decimals: 8,
      },
      vhp: {
        id: '18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr',
        name: 'Virtual Hashpower',
        symbol: 'VHP',
        decimals: 8,
      },
      oldVhp: {
        id: '1AdzuXSpC6K9qtXdCBgD5NUpDNwHjMgrc9',
        name: 'Virtual Hashpower V1',
        symbol: 'VHP',
        decimals: 8,
      },
      pVhp: {
        id: '1NHReq2apWsQ6UPBjNqcV3ABsj88Ncimiy',
        name: 'Pooled VHP',
        symbol: 'pVHP',
        decimals: 8,
      },
      pob: {
        id: '159myq5YUhhoVWu3wsHKHiJYKPKGUrGiyv',
        name: 'Proof of Burn',
      },
    },
  },
};
