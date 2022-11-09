import { defineStore } from 'pinia';
import { koinerConfig } from 'app/koiner.config';

export const useKoinerStore = defineStore({
  id: 'koiner',
  persist: true,
  state: () => ({
    environment: 'production' as 'production' | 'test' | 'local',
  }),

  getters: {
    apiUrl: (state): string => {
      if (state.environment === 'local') {
        return koinerConfig.local.api;
      }

      if (state.environment === 'test') {
        return koinerConfig.test.api;
      }

      return koinerConfig.production.api;
    },
    isProd: (state): boolean => {
      return state.environment === 'production';
    },
    koinContract: (
      state
    ): { id: string; name: string; symbol: string; decimals: number } => {
      return koinerConfig[state.environment].contracts.koin;
    },
    vhpContract: (
      state
    ): { id: string; name: string; symbol: string; decimals: number } => {
      return koinerConfig[state.environment].contracts.vhp;
    },
    pobContract: (state): { id: string; name: string } => {
      return koinerConfig[state.environment].contracts.pob;
    },
  },

  actions: {
    switch() {
      if (this.environment === 'production') {
        this.$patch({
          environment: 'test',
        });
      } else if (this.environment === 'test') {
        this.$patch({
          environment:
            window.location.hostname === 'dapp.local' ? 'local' : 'production',
        });
      } else if (this.environment === 'local') {
        this.$patch({
          environment: 'production',
        });
      }

      window.location.reload();
    },
  },
});
