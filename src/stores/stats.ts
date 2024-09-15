import { defineStore } from 'pinia';
import { watch } from 'vue';
import { useQuery } from '@urql/vue';
import { useKoinerStore } from 'stores/koiner';
import { localizedTokenAmount, tokenAmount } from '@koiner/utils';
import axios from 'axios';
import { koinerConfig } from 'app/koiner.config';

export const useStatsStore = defineStore({
  id: 'stats',
  persist: true,
  state: () => ({
    realtimeUpdates: true as boolean,
    chainStats: {
      height: 0 as number,
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
      fullyDilutedSupply: 0 as number,
      claimed: 0 as number,
      outstanding: 0 as number,
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
    formattedFullyDilutedTotalSupply: (state) => {
      return (displayedDecimals = 0) =>
        localizedTokenAmount(
          state.totalSupply.fullyDilutedSupply,
          8,
          displayedDecimals
        );
    },
    formattedInflation: (state) => {
      return (displayedDecimals = 0) =>
        localizedTokenAmount(
          state.blockProduction.rewarded,
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

        return `$${mc.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`;
      }

      return '?';
    },
    formattedVirtualMarketCap: (state) => {
      if (state.totalSupply.virtualTotalSupply && state.koinStats.price) {
        const mc =
          tokenAmount(parseInt(state.totalSupply.virtualTotalSupply), 8) *
          state.koinStats.price;

        return `$${mc.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`;
      }

      return '?';
    },
    formattedFDVMarketCap: (state) => {
      if (state.koinStats.price) {
        const mc =
          tokenAmount(
            9973874402587864 + (state.blockProduction.rewarded ?? 0),
            8
          ) * state.koinStats.price;

        return `$${mc.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`;
      }

      return '?';
    },
    blockProductionApy: (state) => {
      const virtualSupply =
        parseInt(state.totalSupply.virtualTotalSupply) -
        state.totalSupply.outstanding;

      const yearlyInflationAmount =
        virtualSupply * Math.pow(Math.E, 0.019802) - virtualSupply;

      return (
        (100 * yearlyInflationAmount) /
        (parseInt(state.totalSupply.vhpTotalSupply) || 1)
      );
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
    async loadHeight() {
      const koinerStore = useKoinerStore();

      const checkerApi = axios.create({
        baseURL: koinerConfig[koinerStore.environment].checker,
      });

      const response = await checkerApi.get('chain/height');

      if (response.data) {
        this.$patch({
          chainStats: {
            height: Number(response.data),
          },
        });
      }
    },
    async loadKoinVHPSupplies() {
      const koinerStore = useKoinerStore();

      const checkerApi = axios.create({
        baseURL: koinerConfig[koinerStore.environment].checker,
      });

      const koinResponse: {
        data: {
          koin: number;
          vhp: number;
          virtual: number;
          inflation: number;
          fdv: number;
          burnedPercentage: number;
          claimed: number;
          unclaimed: number;
          claimedPercentage: number;
          snapshot: number;
        };
      } = await checkerApi.get('koin/supplies?useDecimals=false');

      if (koinResponse.data != null) {
        this.$patch({
          totalSupply: {
            koinTotalSupply: koinResponse.data.koin.toString(),
            vhpTotalSupply: koinResponse.data.vhp.toString(),
            virtualTotalSupply: koinResponse.data.virtual.toString(),
            fullyDilutedSupply: koinResponse.data.fdv,
            burned: koinResponse.data.burnedPercentage,
            claimed: koinResponse.data.claimedPercentage,
            outstanding: koinResponse.data.unclaimed,
          },
        });
      }
    },
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

      const result = useQuery({
        query: countsQuery,
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

      const reloadStats = async () => {
        // async function reloadStats() {
        // Reload
        result.executeQuery({
          requestPolicy: 'network-only',
        });

        await this.loadKoinVHPSupplies();

        this.loadHeight().then();
      };

      if (this.realtimeUpdates) {
        // Fetch stats every 15 seconds
        this.$patch({
          intervalId: setInterval(reloadStats, 15000),
        });
      }

      reloadStats().then();
    },
  },
});
