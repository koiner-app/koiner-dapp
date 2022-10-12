// @ts-check
import { defineStore } from 'pinia';
import { kondor } from 'boot/kondor';

export const useAccountStore = defineStore({
  id: 'account',
  persist: true,
  state: () => ({
    name: 'Mystery Koiner',
    addresses: [] as string[],
    connected: false,
  }),

  getters: {
    address: (state) => state.addresses[0],
    getAddress: (state) => {
      return (id: string) => state.addresses.find((address) => address === id);
    },
    hasAddress: (state) => {
      return (id: string) =>
        undefined !== state.addresses.find((address) => address === id);
    },
  },

  actions: {
    logout() {
      this.$patch({
        name: 'Mystery Koiner',
        addresses: [],
        connected: false,
      });
    },

    addAddress(id: string) {
      if (!this.hasAddress(id)) {
        this.$patch({
          addresses: [...this.addresses, id],
        });
      }
    },

    removeAddress(id: string) {
      if (this.hasAddress(id)) {
        this.$patch({
          addresses: this.addresses.filter((address) => address !== id),
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
