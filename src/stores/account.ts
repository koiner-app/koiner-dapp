// @ts-check
import { defineStore } from 'pinia';
import { kondor } from 'boot/kondor';
import { v4 as uuidv4 } from 'uuid';
import {
  QueryTokenHoldersArgs,
  TokenHolder,
  TokenHolderEdge,
  TokenHoldersConnection,
  useAccountTokenBalancesQuery,
} from '@koiner/sdk';
import { Ref, ref, watch } from 'vue';
import { useStatsStore } from 'stores/stats';
import { SearchState } from '@appvise/search-manager';
import { tokenAmount } from '@koiner/utils';
import { koinerConfig } from 'app/koiner.config';

export const useAccountStore = defineStore({
  id: 'account',
  persist: true,
  state: () => ({
    dismissedMobileBanner: false as boolean,
    environment: 'production' as 'production' | 'test' | 'local',
    anonymousId: uuidv4().toString() as string,
    production: {
      name: 'Mystery Koiner',
      addresses: [] as string[],
      addressesFilter: [] as string[],
      addressesFilterQuery: [] as any[],
      connected: false,
      tokenBalances: [] as TokenHolder[],
      groupBalances: true as boolean,
      totalKoin: 0 as number,
      totalVhp: 0 as number,
      totalVirtualKoin: 0 as number,
      burned: 0.0 as number,
    },
    test: {
      name: 'Mystery Test Koiner',
      addresses: [] as string[],
      addressesFilter: [] as string[],
      addressesFilterQuery: [] as any[],
      connected: false,
      tokenBalances: [] as TokenHolder[],
      groupBalances: true as boolean,
      totalKoin: 0 as number,
      totalVhp: 0 as number,
      totalVirtualKoin: 0 as number,
      burned: 0.0 as number,
    },
    local: {
      name: 'Mystery Local Koiner',
      addresses: [] as string[],
      addressesFilter: [] as string[],
      addressesFilterQuery: [] as any[],
      connected: false,
      tokenBalances: [] as TokenHolder[],
      groupBalances: true as boolean,
      totalKoin: 0 as number,
      totalVhp: 0 as number,
      totalVirtualKoin: 0 as number,
      burned: 0.0 as number,
    },
  }),

  getters: {
    name: (state) => {
      return state[state.environment].name;
    },
    addresses: (state) => {
      return state[state.environment].addresses;
    },
    addressesFilter: (state) => {
      return state[state.environment].addressesFilter;
    },
    address: (state) => state[state.environment].addresses[0],
    getAddress: (state) => {
      return (id: string) =>
        state[state.environment].addresses.find((address) => address === id);
    },
    hasAddress: (state) => {
      return (id: string) =>
        undefined !==
        state[state.environment].addresses.find((address) => address === id);
    },
    /**
     * Balances getters
     */
    groupBalances: (state): boolean => state[state.environment].groupBalances,
    tokenBalances: (state): TokenHolder[] =>
      state[state.environment].tokenBalances,
    koinBalances: (state): TokenHolder[] =>
      state[state.environment].tokenBalances.filter(
        (tokenBalance) =>
          tokenBalance.contractId ===
          koinerConfig[state.environment].contracts.koin.id
      ),
    vhpBalances: (state) => {
      return state[state.environment].tokenBalances.filter(
        (tokenBalance) =>
          tokenBalance.contractId ===
          koinerConfig[state.environment].contracts.vhp.id
      );
    },
    totalKoin(): number {
      const decimals = 8;
      const balances = this.koinBalances.map(
        (tokenHolder) => tokenHolder.balance
      );

      let totalBalance = 0;
      balances.forEach((balance) => {
        totalBalance += parseInt(balance);
      });

      return tokenAmount(totalBalance, decimals);
    },
    totalVhp(): number {
      const decimals = 8;
      const balances = this.vhpBalances.map(
        (tokenHolder) => tokenHolder.balance
      );

      let totalBalance = 0;
      balances.forEach((balance) => {
        totalBalance += parseInt(balance);
      });

      return tokenAmount(totalBalance, decimals);
    },
    virtualTotal(): number {
      return this.totalKoin + this.totalVhp;
    },
    koinValue(): number {
      const statsStore = useStatsStore();
      return this.totalKoin * statsStore.koinStats.price;
    },
    vhpValue(): number {
      const statsStore = useStatsStore();
      return this.totalKoin * statsStore.koinStats.price;
    },
    virtualKoinValue(): number {
      const statsStore = useStatsStore();
      return (this.totalKoin + this.totalVhp) * statsStore.koinStats.price;
    },
    formattedKoinValue(): () => string {
      return (decimals?: number) => {
        return this.koinValue.toLocaleString(undefined, {
          maximumFractionDigits: decimals ?? 0,
        });
      };
    },
    formattedVhpValue(): () => string {
      return (decimals?: number) => {
        return this.vhpValue.toLocaleString(undefined, {
          maximumFractionDigits: decimals ?? 0,
        });
      };
    },
    formattedVirtualKoinValue(): () => string {
      return (decimals?: number) => {
        return this.virtualKoinValue.toLocaleString(undefined, {
          maximumFractionDigits: decimals ?? 0,
        });
      };
    },
  },

  actions: {
    logout() {
      this.$patch({
        [this.environment]: {
          name: 'Mystery Koiner',
          addresses: [],
          connected: false,
        },
      });
    },

    addAddress(id: string) {
      if (!this.hasAddress(id)) {
        this.$patch({
          [this.environment]: {
            addresses: [...this[this.environment].addresses, id],
          },
        });

        this.syncAddressFilterQuery();
      }
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

    toggleAddressFilter(address: string) {
      if (this[this.environment].addressesFilter.includes(address)) {
        this.$patch({
          [this.environment]: {
            addressesFilter: this[this.environment].addressesFilter.filter(
              (_address) => _address !== address
            ),
          },
        });
      } else {
        this.$patch({
          [this.environment]: {
            addressesFilter: [
              address,
              ...this[this.environment].addressesFilter,
            ],
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

    removeAddress(id: string) {
      if (this.hasAddress(id)) {
        this.$patch({
          [this.environment]: {
            addresses: this[this.environment].addresses.filter(
              (address) => address !== id
            ),
          },
        });

        this.syncAddressFilterQuery();
      }
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

    /**
     * Attempt to login user using Kondor wallet
     */
    async login() {
      const accounts = await kondor.getAccounts();

      if (accounts.length > 0 && accounts[0].address) {
        this.addAddress(accounts[0].address as string);
      }
    },

    load(environment: 'production' | 'test' | 'local') {
      this.$patch({
        environment: environment,
      });

      const request: Ref<QueryTokenHoldersArgs> = ref({
        filter: this[this.environment].addressesFilterQuery,
      }) as any;

      const queryState = new SearchState<
        QueryTokenHoldersArgs,
        TokenHolder,
        TokenHolderEdge,
        TokenHoldersConnection
      >({
        request: request,
        connection: ref(),
        error: ref(),
        fetching: ref(false),
        isPaused: ref(false),
        scrollPosition: ref(0),
      });

      const { data, fetching, error, isPaused } = useAccountTokenBalancesQuery({
        variables: {
          first: 250,
          filter: this[this.environment].addressesFilterQuery as any,
        },
      });

      watch(data, (updatedData) => {
        queryState.connection.value =
          updatedData?.tokenHolders as TokenHoldersConnection;

        this.$patch({
          [this.environment]: {
            tokenBalances: updatedData?.tokenHolders.edges.map(
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
