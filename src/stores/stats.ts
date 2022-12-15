import { defineStore } from 'pinia';
import { watch } from 'vue';
import { useQuery } from '@urql/vue';
import { useKoinerStore } from 'stores/koiner';
import { localizedTokenAmount, tokenAmount } from '@koiner/utils';

export const useStatsStore = defineStore({
  id: 'stats',
  persist: true,
  state: () => ({
    realtimeUpdates: true as boolean,
    chainStats: {
      addressCount: 0 as number,
      operationCount: 0 as number,
      transactionCount: 0 as number,
    },
    blockProduction: {
      blockProducerCount: 0 as number,
      blocksProduced: 0 as number,
      rewarded: 0 as number,
      burned: 0 as number,
      roi: 0.0 as number,
    },
    koinStats: {
      price: 0 as number,
      bidPrice: 0 as number,
      bidQuantity: 0 as number,
      askPrice: 0 as number,
      askQuantity: 0 as number,
      timestamp: 0 as number,
    },
    tokenStats: {
      contractCount: 0 as number,
      transferCount: 0 as number,
    },
    totalSupply: {
      koinTotalSupply: '' as string,
      vhpTotalSupply: '' as string,
      virtualTotalSupply: '' as string,
      claimed: 0 as number,
      burned: 0 as number,
    },
    settings: {
      realtimeUpdates: true as boolean,
    },
    intervalId: null as null | NodeJS.Timeout,
    updatedAt: null as null | number,
  }),

  getters: {
    formattedKoinTotalSupply: (state) => {
      return (displayedDecimals = 0) =>
        localizedTokenAmount(
          parseInt(state.totalSupply.koinTotalSupply),
          8,
          displayedDecimals
        );
    },
    formattedVhpTotalSupply: (state) => {
      return (displayedDecimals = 0) =>
        localizedTokenAmount(
          parseInt(state.totalSupply.vhpTotalSupply),
          8,
          displayedDecimals
        );
    },
    formattedVirtualTotalSupply: (state) => {
      return (displayedDecimals = 0) =>
        localizedTokenAmount(
          parseInt(state.totalSupply.virtualTotalSupply),
          8,
          displayedDecimals
        );
    },
    formattedKoinPrice: (state) =>
      state.koinStats.price ? `$${state.koinStats.price}` : '?',
    formattedMarketCap: (state) => {
      if (state.totalSupply.koinTotalSupply && state.koinStats.price) {
        const mc =
          tokenAmount(parseInt(state.totalSupply.koinTotalSupply), 8) *
          state.koinStats.price;

        return `$${mc.toLocaleString()}`;
      }

      return '?';
    },
    formattedVirtualMarketCap: (state) => {
      if (state.totalSupply.virtualTotalSupply && state.koinStats.price) {
        const mc =
          tokenAmount(parseInt(state.totalSupply.virtualTotalSupply), 8) *
          state.koinStats.price;

        return `$${mc.toLocaleString()}`;
      }

      return '?';
    },
    formattedFDVMarketCap: (state) => {
      if (state.koinStats.price) {
        const mc =
          tokenAmount(
            9973874402587864 - parseInt(state.totalSupply.vhpTotalSupply),
            8
          ) * state.koinStats.price;

        return `$${mc.toLocaleString()}`;
      }

      return '?';
    },
    formattedVirtualFDVMarketCap: (state) => {
      if (state.koinStats.price) {
        const mc = tokenAmount(9973874402587864, 8) * state.koinStats.price;

        return `$${mc.toLocaleString()}`;
      }

      return '?';
    },
  },

  actions: {
    stopUpdates() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      this.$patch({
        realtimeUpdates: false,
        intervalId: undefined,
      });
    },
    startUpdates() {
      this.$patch({
        realtimeUpdates: true,
      });

      // Reload whole site to re-init stats store.
      // Calling load method now will cause cannot useQuery outside setup error.
      window.location.reload();
    },
    load() {
      const koinerStore = useKoinerStore();
      const countsQuery = `query KoinerStats {
  chain {
    id
    stats {
      addressCount
      operationCount
      transactionCount
    }
    blockProductionStats {
      id
      producerCount
      blocksProduced
      rewarded
      burnedTotal
      roi
    }
    koinStats {
      id
      price
      bidPrice
      bidQuantity
      askPrice
      askQuantity
      timestamp
    }
    tokenStats {
      id
      contractCount
      transferCount
    }
  }
}
`;

      const totalSuppliesQuery = `query KoinVHPTotalSupplies {
  tokenContracts(
    first: 2
    filter: {
      OR: [
        { id: { equals: "${koinerStore.koinContract.id}" } },
        { id: { equals: "${koinerStore.vhpContract.id}" } }
      ]
    }
  ) {
    nodes {
      id
      name
      totalSupply
    }
  }
}`;

      const result = useQuery({
        query: countsQuery,
      });

      const resultTS = useQuery({
        query: totalSuppliesQuery,
      });

      watch(
        result.data,
        () => {
          const chain = result.data.value.chain;

          this.$patch({
            chainStats: {
              addressCount: chain.stats.addressCount,
              operationCount: chain.stats.operationCount,
              transactionCount: chain.stats.transactionCount,
            },
            blockProduction: {
              blockProducerCount: chain.blockProductionStats.producerCount,
              blocksProduced: chain.blockProductionStats.blocksProduced,
              rewarded: parseInt(chain.blockProductionStats.rewarded),
              burned: parseInt(chain.blockProductionStats.burnedTotal),
              roi: chain.blockProductionStats.roi,
            },
            koinStats: {
              price: chain.koinStats.price,
              bidPrice: chain.koinStats.bidPrice,
              bidQuantity: chain.koinStats.bidQuantity,
              askPrice: chain.koinStats.askPrice,
              askQuantity: chain.koinStats.askQuantity,
              timestamp: chain.koinStats.timestamp,
            },
            tokenStats: {
              contractCount: chain.tokenStats.contractCount,
              transferCount: chain.tokenStats.transferCount,
            },
            updatedAt: Date.now(),
          });
        },
        { deep: true }
      );

      watch(
        resultTS.data,
        () => {
          const tokenContracts = resultTS.data.value.tokenContracts.nodes;

          const koinContract = tokenContracts.find(
            (tokenContract: { id: string; totalSupply: string }) =>
              tokenContract.id === koinerStore.koinContract.id
          );

          const vhpContract = tokenContracts.find(
            (tokenContract: { id: string; totalSupply: string }) =>
              tokenContract.id === koinerStore.vhpContract.id
          );

          if (koinContract && vhpContract) {
            const vhpTotalSupply = parseInt(vhpContract.totalSupply);
            const virtualTotalSupply =
              parseInt(koinContract.totalSupply) +
              parseInt(vhpContract.totalSupply);

            this.$patch({
              totalSupply: {
                koinTotalSupply: koinContract.totalSupply,
                vhpTotalSupply: vhpContract.totalSupply,
                virtualTotalSupply: virtualTotalSupply.toString(),
                burned:
                  virtualTotalSupply && vhpTotalSupply
                    ? (vhpTotalSupply / virtualTotalSupply) * 100
                    : 0,
                claimed: vhpTotalSupply
                  ? (virtualTotalSupply / 9973874402587864) * 100
                  : 0,
              },
            });
          }
        },
        { deep: true }
      );

      if (this.realtimeUpdates) {
        // Fetch stats every 15 seconds
        this.$patch({
          intervalId: setInterval(reloadStats, 15000),
        });
      }

      async function reloadStats() {
        // Reload
        result.executeQuery({
          requestPolicy: 'network-only',
        });

        resultTS.executeQuery({
          requestPolicy: 'network-only',
        });
      }

      reloadStats().then();
    },
  },
});
