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
import { useTokensStore } from 'stores/tokens';

export type KoinerThemeType = 'auto' | 'hybrid' | 'dark' | 'light';
export const KoinerThemes: KoinerThemeType[] = ['auto', 'hybrid', 'dark'];

export interface OnChainBalance {
  addressId: string;
  balance: number;
  mana: number;
  charged: number;
  manaRechargeTime: number;
  manaRechargeFormatted: string;
  lastUpdated: number;
}

export const useAccountStore = defineStore({
  id: 'account',
  persist: true,
  state: () => ({
    environment: 'production' as 'production' | 'test' | 'local',
    anonymousId: uuidv4().toString() as string,
    theme: 'auto' as KoinerThemeType,
    production: {
      loading: false as boolean,
      name: 'Mystery Koiner',
      addresses: [] as string[],
      addressesFilter: [] as string[],
      addressesFilterQuery: [] as any[],
      connected: false,
      tokenBalances: [] as TokenHolder[],
      onChainBalances: [] as OnChainBalance[],
      manaChargedPercentage: 0 as number,
      groupBalances: true as boolean,
      totalKoin: 0 as number,
      totalVhp: 0 as number,
      totalVirtualKoin: 0 as number,
      burned: 0.0 as number,
    },
    test: {
      loading: false as boolean,
      name: 'Mystery Test Koiner',
      addresses: [] as string[],
      addressesFilter: [] as string[],
      addressesFilterQuery: [] as any[],
      connected: false,
      tokenBalances: [] as TokenHolder[],
      onChainBalances: [] as OnChainBalance[],
      manaChargedPercentage: 0 as number,
      groupBalances: true as boolean,
      totalKoin: 0 as number,
      totalVhp: 0 as number,
      totalVirtualKoin: 0 as number,
      burned: 0.0 as number,
    },
    local: {
      loading: false as boolean,
      name: 'Mystery Local Koiner',
      addresses: [] as string[],
      addressesFilter: [] as string[],
      addressesFilterQuery: [] as any[],
      connected: false,
      tokenBalances: [] as TokenHolder[],
      onChainBalances: [] as OnChainBalance[],
      manaChargedPercentage: 0 as number,
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
    onChainBalances: (state): OnChainBalance[] => {
      return state[state.environment].onChainBalances;
    },
    manaChargedPercentage: (state): number => {
      return state[state.environment].manaChargedPercentage;
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

    async loadOnChainBalances(reset = false) {
      const tokensStore = useTokensStore();

      if (reset) {
        this.$patch({
          [this.environment]: {},
        });
      }

      /**
       * Load OnChain balance with Mana balances
       */
      const FIVE_DAYS = 432e6; // 5 * 24 * 60 * 60 * 1000

      function deltaTimeToString(milliseconds: number) {
        const seconds = Math.floor(milliseconds / 1000);
        let interval = seconds / 86400;
        if (interval > 2) return Math.floor(interval) + ' days';
        interval = seconds / 3600;
        if (interval > 2) return Math.floor(interval) + ' hours';
        interval = seconds / 60;
        if (interval > 2) return Math.floor(interval) + ' minutes';
        return Math.floor(seconds) + ' seconds';
      }

      try {
        const onChainBalances: OnChainBalance[] = [];

        const addresses: string[] = this[this.environment].addressesFilter;

        if (addresses.length > 0) {
          let manaBalance: number;
          let koinBalance: number;

          const koinOnChainBalances = await tokensStore.balances(
            'koin',
            addresses,
            reset
          );

          const manaOnChainBalances = await tokensStore.balances(
            'mana',
            addresses,
            reset
          );

          for (const [address, balance] of Object.entries(
            koinOnChainBalances
          )) {
            koinBalance = balance;
            manaBalance = manaOnChainBalances[address];

            const timeRechargeMana =
              ((koinBalance - manaBalance) * FIVE_DAYS) / koinBalance;

            onChainBalances.push({
              addressId: address,
              balance: koinBalance,
              mana: manaBalance,
              charged: (manaBalance / koinBalance) * 100,
              manaRechargeTime: timeRechargeMana,
              manaRechargeFormatted: deltaTimeToString(timeRechargeMana),
              lastUpdated: Date.now(),
            });
          }

          console.log({ onChainBalances });

          this.$patch({
            [this.environment]: {
              onChainBalances: onChainBalances,
            },
          });
        }

        this.updateManaChargedPercentage();
      } catch (error) {
        throw error;
      }
    },

    updateManaChargedPercentage() {
      const koinBalances = this.onChainBalances.map(
        (tokenHolder) => tokenHolder.balance
      );
      const manaBalances = this.onChainBalances.map(
        (tokenHolder) => tokenHolder.mana
      );

      let totalKoinBalance = 0;
      koinBalances.forEach((balance) => {
        totalKoinBalance += balance;
      });

      let totalManaBalance = 0;
      manaBalances.forEach((balance) => {
        totalManaBalance += balance;
      });

      this.$patch({
        [this.environment]: {
          manaChargedPercentage: Math.floor(
            (totalManaBalance / totalKoinBalance) * 100
          ),
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

    async load(environment: 'production' | 'test' | 'local') {
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

      watch(data, async (updatedData) => {
        if (this[this.environment].loading) {
          return;
        }

        this.$patch({
          [this.environment]: {
            loading: true,
          },
        });

        const tokensStore = useTokensStore();

        const newConnection =
          updatedData?.tokenHolders as TokenHoldersConnection;

        // Exclude old VHP contract
        newConnection.edges = newConnection.edges.filter(
          (edge) =>
            edge.node.contractId !== koinerConfig.production.contracts.oldVhp.id
        );

        queryState.connection.value = newConnection;

        const edges: TokenHolderEdge[] = [];
        const combos: Record<string, Record<string, number>> = {};

        // Get all address - token combinations
        updatedData?.tokenHolders.edges?.forEach((edge) => {
          edges.push(edge as TokenHolderEdge);

          if (!combos[edge.node.addressId]) {
            combos[edge.node.addressId] = {};
          }

          combos[edge.node.addressId][edge.node.contractId] = 0;
        });

        // Get token balances for each address
        for (const [address, tokenBalances] of Object.entries(combos)) {
          const balances = await tokensStore.addressBalances(
            address,
            Object.keys(tokenBalances)
          );

          for (const [tokenId, balance] of Object.entries(balances)) {
            combos[address][tokenId] = balance;
          }
        }

        // Map on-chain balances to results
        edges.map(async (edge) => {
          if (combos[edge.node.addressId][edge.node.contractId] != null) {
            edge.node.balance =
              combos[edge.node.addressId][edge.node.contractId].toString();
          }

          return edge;
        });

        this.$patch({
          [this.environment]: {
            loading: false,
            tokenBalances: edges.map((edge) => edge.node),
          },
        });

        await this.loadOnChainBalances();
      });

      queryState.error = error;
      queryState.fetching = fetching;
      queryState.isPaused = isPaused;
    },
  },
});
