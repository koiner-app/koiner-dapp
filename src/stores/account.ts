// @ts-check
import { defineStore } from 'pinia';
import { kondor } from 'boot/kondor';

export const useAccountStore = defineStore({
  id: 'account',
  persist: true,
  state: () => ({
    environment: 'production' as 'production' | 'test' | 'local',
    production: {
      name: 'Mystery Koiner',
      addresses: [] as string[],
      addressesFilter: [] as string[],
      connected: false,
    },
    test: {
      name: 'Mystery Test Koiner',
      addresses: [] as string[],
      addressesFilter: [] as string[],
      connected: false,
    },
    local: {
      name: 'Mystery Local Koiner',
      addresses: [] as string[],
      addressesFilter: [] as string[],
      connected: false,
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
  },

  actions: {
    load(environment: 'production' | 'test' | 'local') {
      this.$patch({
        environment: environment,
      });
    },
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
        // Remove addresses that have been deleted from bookmarks
        const oldAddresses = this[this.environment].addressesFilter.filter(
          (addressFilter) => addresses.includes(addressFilter)
        );

        // Add new bookmarked addresses
        const newAddresses = addresses.filter(
          (address) => !this[this.environment].addressesFilter.includes(address)
        );

        // Remove addresses from addressesFilter that are not in provided array
        this.$patch({
          [this.environment]: {
            addressesFilter: [...newAddresses, ...oldAddresses],
          },
        });
      }
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
      }
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
  },
});
