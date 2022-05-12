// @ts-check
import { defineStore } from 'pinia';
import { kondor } from 'boot/kondor';

export const useAccountStore = defineStore({
  id: 'account',
  persist: true,
  state: () => ({
    name: 'User',
    tokenWatchlist: [] as string[],
    addresses: [] as string[],
    connected: false,
  }),

  getters: {
    address: (state) => state.addresses[0],
  },

  actions: {
    logout() {
      this.$patch({
        name: 'User',
        tokenWatchlist: [],
        addresses: [],
        connected: false,
      });
    },

    addTokenToWatchlist(id: string) {
      this.tokenWatchlist.push(id);
    },

    /**
     * Attempt to login user using Kondor wallet
     */
    async login() {
      const accounts = await kondor.getAccounts();

      if (accounts.length > 0 && accounts[0].address) {
        this.$patch({
          addresses: [accounts[0].address],
          connected: true,
        });
      }
    },
  },
});
