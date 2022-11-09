import { defineStore } from 'pinia';
import { watch } from 'vue';

import { useQuery } from '@urql/vue';

export const useStatsStore = defineStore({
  id: 'stats',
  persist: true,
  state: () => ({
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
    tokenStats: {
      contractCount: 0 as number,
      transferCount: 0 as number,
    },
    intervalId: null as null | NodeJS.Timeout,
    updatedAt: null as null | number,
  }),

  getters: {},

  actions: {
    load() {
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
    tokenStats {
      id
      contractCount
      transferCount
    }
  }
}
`;

      const result = useQuery({
        query: countsQuery,
      });

      watch(
        result.data,
        (updatedData) => {
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
            tokenStats: {
              contractCount: chain.tokenStats.contractCount,
              transferCount: chain.tokenStats.transferCount,
            },
            updatedAt: Date.now(),
          });
        },
        { deep: true }
      );

      // Fetch stats every 15 seconds
      const intervalId = setInterval(reloadStats, 15000);

      async function reloadStats() {
        // Reload
        result.executeQuery({
          requestPolicy: 'network-only',
        });
      }

      reloadStats().then();
    },
  },
});
