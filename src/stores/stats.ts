import { defineStore } from 'pinia';
import { watch } from 'vue';

import { useQuery } from '@urql/vue';
import { useKoinerStore } from 'stores/koiner';
import { localizedTokenAmount } from '@koiner/utils';

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
    totalSupply: {
      koinTotalSupply: '' as string,
      vhpTotalSupply: '' as string,
      virtualTotalSupply: '' as string,
      claimed: 0 as number,
      burned: 0 as number,
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
  },

  actions: {
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

      // Fetch stats every 15 seconds
      const intervalId = setInterval(reloadStats, 15000);

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
