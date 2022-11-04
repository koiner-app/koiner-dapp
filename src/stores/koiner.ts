import { defineStore } from 'pinia';
import { koinerConfig } from 'app/koiner.config';

export const useKoinerStore = defineStore({
  id: 'koiner',
  persist: true,
  state: () => ({
    mainNet: true as boolean,
  }),

  getters: {
    apiUrl: (state) =>
      state.mainNet ? koinerConfig.production.api : koinerConfig.test.api,
  },

  actions: {
    switch() {
      this.$patch({
        mainNet: !this.mainNet,
      });

      window.location.reload();
    },
  },
});
