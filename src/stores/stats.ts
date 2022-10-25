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
      const countsQuery = `query ChainCounts {
  chain {
    id
    stats {
      addressCount
      operationCount
      transactionCount
    }
  }
  blockProductionStats {
    id
    blocksProduced
    rewarded
    burned
    roi
  }
  tokenStats {
    id
    contractCount
    transferCount
  }
}
`;

      const result = useQuery({
        query: countsQuery,
      });

      watch(result.data, (updatedData) => {
        console.log('updatedData', updatedData);
        if (updatedData) {
          this.$patch({
            chainStats: {
              addressCount: updatedData.chain.stats.addressCount,
              operationCount: updatedData.chain.stats.operationCount,
              transactionCount: updatedData.chain.stats.transactionCount,
            },
            blockProduction: {
              blocksProduced: updatedData.blockProductionStats.blocksProduced,
              rewarded: parseInt(updatedData.blockProductionStats.rewarded),
              burned: parseInt(updatedData.blockProductionStats.burned),
              roi: updatedData.blockProductionStats.roi,
            },
            tokenStats: {
              contractCount: updatedData.tokenStats.contractCount,
              transferCount: updatedData.tokenStats.transferCount,
            },
            updatedAt: Date.now(),
          });
        }
      });

      // Fetch stats every 15 seconds
      const intervalId = setInterval(reloadStats, 15000);

      function reloadStats() {
        // Reload
        result.executeQuery({
          requestPolicy: 'network-only',
        });
      }
    },
  },
});
