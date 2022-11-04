import { defineStore } from 'pinia';
import { koinerConfig } from 'app/koiner.config';

export const useKoinerStore = defineStore({
  id: 'koiner',
  persist: true,
  state: () => ({
    environment: 'prod' as 'prod' | 'test' | 'local',
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
      return state.environment === 'prod';
    },
  },

  actions: {
    switch() {
      if (this.environment === 'prod') {
        this.$patch({
          environment: 'test',
        });
      } else if (this.environment === 'test') {
        this.$patch({
          environment:
            window.location.hostname === 'dapp.local' ? 'local' : 'prod',
        });
      } else if (this.environment === 'local') {
        this.$patch({
          environment: 'prod',
        });
      }

      window.location.reload();
    },
  },
});
