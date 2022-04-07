// @ts-check
import { defineStore, acceptHMRUpdate } from 'pinia';
import { kondor } from 'boot/kondor';

export const useAccountStore = defineStore({
  id: 'account',
  persist: true,
  state: () => ({
    name: 'User',
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
        addresses: [],
        connected: false,
      });
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}
