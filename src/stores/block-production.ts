// @ts-check
import { defineStore } from 'pinia';
import {
  BlockProducer,
  BlockProducerEdge,
  BlockProducersConnection,
  QueryBlockProducersArgs,
  useBlockProducersSearchQuery,
} from '@koiner/sdk';
import { Ref, ref, watch } from 'vue';
import { SearchState } from '@appvise/search-manager';
import { tokenAmount } from '@koiner/utils';

export const useBlockProductionStore = defineStore({
  id: 'blockProduction',
  persist: true,
  state: () => ({
    environment: 'production' as 'production' | 'test' | 'local',
    production: {
      addressesFilter: [] as string[],
      addressesFilterQuery: [] as any[],
      blockProducers: [] as BlockProducer[],
      totalRewards: 0 as number,
    },
    test: {
      addressesFilter: [] as string[],
      addressesFilterQuery: [] as any[],
      blockProducers: [] as BlockProducer[],
      totalRewards: 0 as number,
    },
    local: {
      addressesFilter: [] as string[],
      addressesFilterQuery: [] as any[],
      blockProducers: [] as BlockProducer[],
      totalRewards: 0 as number,
    },
  }),

  getters: {
    addressesFilter: (state) => {
      return state[state.environment].addressesFilter;
    },
    blockProducers: (state): BlockProducer[] =>
      state[state.environment].blockProducers,
    totalRewarded(): number {
      const decimals = 8;
      const rewarded = this.blockProducers.map(
        (blockProducer) => blockProducer.balance
      );

      let totalRewarded = 0;
      rewarded.forEach((rewardedAmount) => {
        totalRewarded += parseInt(rewardedAmount);
      });

      return tokenAmount(totalRewarded, decimals);
    },
  },

  actions: {
    reset() {
      this.$patch({
        [this.environment]: {
          addressesFilter: [],
          addressesFilterQuery: [],
          totalRewards: 0,
        },
      });
    },

    syncAddressFilter(addresses: string[]) {
      if (this[this.environment].addressesFilter.length === 0) {
        // Add all new addresses if none has been selected previously
        this.$patch({
          [this.environment]: {
            addressesFilter: addresses,
          },
        });
      } else {
        // Remove addresses from addressesFilter that are not in provided array
        this.$patch({
          [this.environment]: {
            addressesFilter: this[this.environment].addressesFilter.filter(
              (addressFilter) => addresses.includes(addressFilter)
            ),
          },
        });
      }

      this.syncAddressFilterQuery();
    },

    syncAddressFilterSelection(addresses: string[]) {
      this.$patch({
        [this.environment]: {
          addressesFilter: addresses,
        },
      });

      this.syncAddressFilterQuery();
    },

    syncAddressFilterQuery() {
      this.$patch({
        [this.environment]: {
          addressesFilterQuery: {
            OR: this[this.environment].addressesFilter.map((address) => {
              return {
                addressId: { equals: address },
              };
            }),
          },
        },
      });
    },

    async load(environment: 'production' | 'test' | 'local') {
      this.$patch({
        environment: environment,
      });

      const request: Ref<QueryBlockProducersArgs> = ref({
        filter: this[this.environment].addressesFilterQuery,
      }) as any;

      const queryState = new SearchState<
        QueryBlockProducersArgs,
        BlockProducer,
        BlockProducerEdge,
        BlockProducersConnection
      >({
        request: request,
        connection: ref(),
        error: ref(),
        fetching: ref(false),
        isPaused: ref(false),
        scrollPosition: ref(0),
      });

      const { data, fetching, error, isPaused } = useBlockProducersSearchQuery({
        variables: {
          first: 250,
          filter: this[this.environment].addressesFilterQuery as any,
        },
      });

      watch(data, (updatedData) => {
        queryState.connection.value =
          updatedData?.blockProducers as BlockProducersConnection;

        this.$patch({
          [this.environment]: {
            blockProducers: updatedData?.blockProducers.edges.map(
              (edge) => edge.node
            ),
          },
        });
      });

      queryState.error = error;
      queryState.fetching = fetching;
      queryState.isPaused = isPaused;
    },
  },
});
