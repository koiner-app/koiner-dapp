import { defineStore } from 'pinia';

import axios from 'axios';

export const useKoinosStore = defineStore({
  id: 'koinos',
  persist: true,
  state: () => ({
    price: {
      usd: null as null | number,
      change24h: null as null | number,
      change24hPercentage: null as null | number,
    },
    marketCap: null as null | number,
    updatedAt: null as null | number,
  }),

  getters: {
    formattedPrice: (state) =>
      state.price.usd ? `$${state.price.usd.toFixed(2)}` : '',
    formattedPriceChange24hPercentage: (state) =>
      state.price.change24hPercentage
        ? `${
            state.price.change24hPercentage > 0 ? '+' : ''
          }${state.price.change24hPercentage.toFixed(2)}%`
        : '',
    formattedMarketCap: (state) =>
      state.marketCap ? `$${state.marketCap.toLocaleString()}` : '',
  },

  actions: {
    load() {
      const coingeckoApi = axios.create({
        baseURL: 'https://api.coingecko.com/api/v3',
      });

      // Fetch prices only after 5 minutes
      if (this.updatedAt === null || Date.now() - this.updatedAt > 300000) {
        coingeckoApi
          .get(
            '/coins/koinos?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
          )
          .then((response) => {
            if (response.data && response.data.market_data) {
              const marketData = response.data.market_data;

              this.$patch({
                price: {
                  usd: parseFloat(marketData.current_price.usd),
                  change24h: parseFloat(marketData.price_change_24h),
                  change24hPercentage: parseFloat(
                    marketData.price_change_percentage_24h
                  ),
                },
                marketCap: marketData.market_cap.usd,
                updatedAt: Date.now(),
              });
            }
          })
          .catch((error) => {
            console.error('Could not load koin price from coingecko', error);
          });
      }
    },
  },
});
