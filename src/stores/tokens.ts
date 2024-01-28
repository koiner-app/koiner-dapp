// @ts-check
import { defineStore } from 'pinia';
import axios from 'axios';
import { tokenAmountToSatoshi } from '@koiner/utils';
import { TokenContract } from '@koiner/sdk';
import { useQuery } from '@urql/vue';
import { watch } from 'vue';

export interface OnChainBalance {
  address: string;
  tokenId: string;
  balance: number;
  lastUpdated: number;
}

export interface OnChainSupply {
  tokenId: string;
  supply: number;
  lastUpdated: number;
}

export interface TokensState {
  production: {
    balances: Map<string, OnChainBalance>;
    supplies: Map<string, OnChainSupply>;
    decimals: Map<string, number>;
    decimalsLastUpdated: number;
  };
  test: {
    balances: Map<string, OnChainBalance>;
    supplies: Map<string, OnChainSupply>;
    decimals: Map<string, number>;
    decimalsLastUpdated: number;
  };
  local: {
    balances: Map<string, OnChainBalance>;
    supplies: Map<string, OnChainSupply>;
    decimals: Map<string, number>;
    decimalsLastUpdated: number;
  };
}

enum Environment {
  production = 'production',
  test = 'test',
  local = 'local',
}

export const useTokensStore = defineStore({
  id: 'tokens',
  state: () => ({
    environment: 'production' as 'production' | 'test' | 'local',
    production: {
      balances: new Map<string, OnChainBalance>(),
      supplies: new Map<string, OnChainSupply>(),
      decimals: new Map<string, number>(),
      decimalsLastUpdated: 0 as number,
    },
    test: {
      activeBalance: 'main' as string,
      balances: new Map<string, OnChainBalance>(),
      supplies: new Map<string, OnChainSupply>(),
      decimals: new Map<string, number>(),
      decimalsLastUpdated: 0 as number,
    },
    local: {
      activeBalance: 'main' as string,
      balances: new Map<string, OnChainBalance>(),
      supplies: new Map<string, OnChainSupply>(),
      decimals: new Map<string, number>(),
      decimalsLastUpdated: 0 as number,
    },
  }),
  persist: {
    serializer: {
      serialize: (input) => {
        const data = input as TokensState;

        const output = {
          production: {},
          test: {},
          local: {},
        };

        for (const [, environment] of Object.entries(Environment)) {
          // Balances
          const balances: Array<{ key: string; value: any }> = [];

          data[environment].balances.forEach((balance, key) => {
            balances.push({
              key,
              value: {
                address: balance.address,
                tokenId: balance.tokenId,
                balance: balance.balance,
                lastUpdated: balance.lastUpdated,
              },
            });
          });

          // Supplies
          const supplies: Array<{ key: string; value: any }> = [];

          data[environment].supplies.forEach((supply, key) => {
            supplies.push({
              key,
              value: {
                tokenId: supply.tokenId,
                supply: supply.supply,
                lastUpdated: supply.lastUpdated,
              },
            });
          });

          output[environment] = {
            balances,
          };
        }

        return JSON.stringify(output);
      },
      deserialize: (input) => {
        const output = JSON.parse(input);

        for (const [, environment] of Object.entries(Environment)) {
          // Balances
          const balanceKVArray: Array<[string, OnChainBalance]> = [];

          if (Array.isArray(output[environment].balances)) {
            // Create map for balances
            for (let i = 0; i < output[environment].balances.length; i++) {
              const balanceKV: { key: string; value: any } =
                output[environment].balances[i];

              const onChainBalance: OnChainBalance = {
                address: balanceKV.value.address,
                balance: balanceKV.value.balance,
                tokenId: balanceKV.value.tokenId,
                lastUpdated: balanceKV.value.lastUpdated,
              };

              balanceKVArray.push([balanceKV.key as string, onChainBalance]);
            }
          }

          output[environment].balances = new Map<string, OnChainBalance>(
            balanceKVArray
          );

          // Supplies
          const supplyKVArray: Array<[string, OnChainSupply]> = [];

          if (Array.isArray(output[environment].supplies)) {
            // Create map for supplies
            for (let i = 0; i < output[environment].supplies.length; i++) {
              const supplyKV: { key: string; value: any } =
                output[environment].supplies[i];

              const onChainSupply: OnChainSupply = {
                tokenId: supplyKV.value.tokenId,
                supply: supplyKV.value.supply,
                lastUpdated: supplyKV.value.lastUpdated,
              };

              supplyKVArray.push([supplyKV.key as string, onChainSupply]);
            }
          }

          output[environment].supplies = new Map<string, OnChainSupply>(
            supplyKVArray
          );
        }

        return output;
      },
    },
  },

  getters: {
    balance: (state) => {
      return async (tokenId: string, address: string, refresh = false) => {
        const key = `${tokenId}-${address}`;

        // Only fetch onchain balance if not fetched or if last time was 1 min ago
        if (
          !state[state.environment].balances.has(key) ||
          state[state.environment].balances.get(key)!.lastUpdated <
            Date.now() - 60000 ||
          refresh
        ) {
          const checkerApi = axios.create({
            baseURL: 'https://checker.koiner.app',
          });

          const response = await checkerApi.get(
            `${
              ['koin', 'mana', 'vhp'].includes(tokenId) ? '' : 'token/'
            }${tokenId}/balance/${address}`
          );

          if (response.data != null) {
            state[state.environment].balances.set(key, {
              address,
              tokenId,
              balance: tokenAmountToSatoshi(Number(response.data), 8),
              lastUpdated: Date.now(),
            });
          }
        }

        return state[state.environment].balances.get(key);
      };
    },
    balances: (state) => {
      return async (
        tokenId: string,
        addresses: string[]
      ): Promise<Record<string, number>> => {
        const result: Record<string, number> = {};
        const addressesToLoad: string[] = [];

        // Only fetch on-chain balance if not fetched or if last time was 1 min ago
        addresses.forEach((address) => {
          const key = `${tokenId}-${address}`;

          if (
            !state[state.environment].balances.has(key) ||
            state[state.environment].balances.get(key)!.lastUpdated <
              Date.now() - 60000
          ) {
            addressesToLoad.push(address);
          } else {
            // Load from state
            result[address] =
              state[state.environment].balances.get(key)!.balance;
          }
        });

        if (addressesToLoad.length > 0) {
          const checkerApi = axios.create({
            baseURL: 'https://checker.koiner.app',
          });

          const response = await checkerApi.get(
            `token/${tokenId}/balances-raw?${addressesToLoad
              .map((address) => `addresses[]=${address}&`)
              .join('&')}`
          );

          if (response.data != null) {
            for (const [address, balance] of Object.entries(response.data)) {
              state[state.environment].balances.set(`${tokenId}-${address}`, {
                address,
                tokenId,
                balance: Number(balance),
                lastUpdated: Date.now(),
              });

              result[address] = balance as any;
            }
          }
        }

        return result;
      };
    },
    supply: (state) => {
      return async (tokenId: string) => {
        // Only fetch onchain supply if not fetched or if last time was 1 min ago
        if (
          !state[state.environment].supplies.has(tokenId) ||
          state[state.environment].supplies.get(tokenId)!.lastUpdated <
            Date.now() - 60000
        ) {
          const checkerApi = axios.create({
            baseURL: 'https://checker.koiner.app',
          });

          const response = await checkerApi.get(
            `token/${tokenId}/total-supply`
          );

          if (response.data != null) {
            state[state.environment].supplies.set(tokenId, {
              tokenId,
              supply: tokenAmountToSatoshi(
                Number(response.data),
                state[state.environment].decimals.get(tokenId) ?? 8
              ),
              lastUpdated: Date.now(),
            });
          }
        }

        return state[state.environment].supplies.get(tokenId);
      };
    },
    getDecimals: (state) => {
      return async (tokenId: string) => {
        return state[state.environment].decimals.get(tokenId);
      };
    },
  },

  actions: {
    load(environment: 'production' | 'test' | 'local') {
      this.$patch({
        environment: environment,
      });

      const totalSuppliesQuery = `query TokenContractsDecimals {
  tokenContracts(
    first: 1000
  ) {
    nodes {
      id
      decimals
    }
  }
}`;

      const result = useQuery({
        query: totalSuppliesQuery,
      });

      watch(
        result.data,
        () => {
          const results = new Map<string, number>();

          result.data.value.tokenContracts.nodes?.forEach(
            (node: TokenContract) => {
              results.set(node.id, node.decimals);
            }
          );

          this.$patch({
            [this.environment]: {
              decimals: results,
              decimalsLastUpdated: Date.now(),
            },
          });
        },
        { deep: true }
      );
    },

    reset() {
      this.$patch({
        environment: 'production',
        production: {
          balances: new Map<string, OnChainBalance>(),
          supplies: new Map<string, OnChainSupply>(),
          decimals: new Map<string, number>(),
          decimalsLastUpdated: 0,
        },
        test: {
          balances: new Map<string, OnChainBalance>(),
          supplies: new Map<string, OnChainSupply>(),
          decimals: new Map<string, number>(),
          decimalsLastUpdated: 0,
        },
        local: {
          balances: new Map<string, OnChainBalance>(),
          supplies: new Map<string, OnChainSupply>(),
          decimals: new Map<string, number>(),
          decimalsLastUpdated: 0,
        },
      });
    },
  },
});
