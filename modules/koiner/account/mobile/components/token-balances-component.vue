<template>
  <q-list bordered padding>
    <q-item-label header class="relative-position">
      Assets

      <q-space />

      <q-toggle
        v-if="showGroupBalances"
        v-model="accountStore[accountStore.environment].groupBalances"
        size="xs"
        checked-icon="check"
        color="blue-grey-4"
        unchecked-icon="clear"
        label="Grouped"
        class="absolute-top-right q-mr-md"
      />
    </q-item-label>

    <div
      v-for="(tokenBalance, tbIndex) in computedTokenBalances"
      :key="tbIndex"
    >
      <q-separator spaced />

      <q-item>
        <q-item-section top avatar class="q-pt-xs">
          <q-avatar
            v-if="tokenLogo(tokenBalance.contract.symbol)"
            size="md q-pa-sm"
          >
            <img
              :src="`/tokens/${tokenLogo(tokenBalance.contract.symbol)}`"
              :alt="tokenBalance.contract.symbol"
            />
          </q-avatar>
          <q-avatar v-else color="primary" size="md" text-color="white">
            <span style="font-size: 0.75rem">{{
              tokenBalance.contract.symbol.substring(0, 3)
            }}</span>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ tokenBalance.contract.name }}</q-item-label>
          <q-item-label v-if="accountStore.groupBalances" caption lines="2">{{
            tokenBalance.contract.symbol
          }}</q-item-label>
          <q-item-label v-else caption lines="2">{{
            tokenBalance.addressId
          }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label
            ><span v-if="showPrice(tokenBalance.contract.id)"
              >${{
                (
                  tokenAmount(
                    parseInt(tokenBalance.balance),
                    tokenBalance.contract.decimals
                  ) * statsStore.koinStats.price
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })
              }}
              <span
                v-if="tokenBalance.contract.id !== koinerStore.koinContract.id"
              >
                <q-icon
                  name="warning"
                  color="accent"
                  style="padding-bottom: 3px"
                  class="q-ml-xs"
                />
                <q-tooltip
                  anchor="bottom start"
                  self="top left"
                  class="bg-primary text-white shadow-4"
                  :hide-delay="3000"
                >
                  <div class="q-pa-sm q-gutter-xs">
                    Estimated value based on price of KOIN
                  </div>
                </q-tooltip>
              </span> </span
            ><span v-else>??</span></q-item-label
          >
          <q-item-label caption
            >{{
              localizedTokenAmount(
                parseInt(tokenBalance.balance),
                tokenBalance.contract.decimals,
                2
              )
            }}
            {{ tokenBalance.contract.symbol }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </div>
  </q-list>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useAccountStore } from 'stores/account';
import { localizedTokenAmount, tokenAmount } from '@koiner/utils';
import { TokenHolder } from '@koiner/sdk';
import { useStatsStore } from 'stores/stats';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'TokenBalancesComponent',
  props: {
    tokenBalances: {
      required: true,
      type: Array as PropType<Array<TokenHolder>>,
    },
    showGroupBalances: {
      required: false,
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const accountStore = useAccountStore();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    return {
      accountStore,
      koinerStore,
      statsStore,
      localizedTokenAmount,
      tokenAmount,

      showPrice: (contractId: string): boolean => {
        return [
          koinerStore.koinContract.id,
          koinerStore.vhpContract.id,
          koinerStore.pVhpContract.id,
        ].includes(contractId);
      },
      tokenLogo: (symbol: string): string => {
        const logos: Record<string, string> = {
          koin: 'koin.svg',
          koindx: 'koindx.svg',
          pvhp: 'pvhp.svg',
          vapor: 'vapor.svg',
          vhp: 'vhp.svg',
        };

        return logos[symbol.toLowerCase()] ?? null;
      },
      computedTokenBalances: computed(() => {
        const tokenBalancesMap = new Map<string, TokenHolder>([]);

        props.tokenBalances.forEach((tokenBalance, tbIndex) => {
          if (
            accountStore.groupBalances &&
            tokenBalancesMap.has(tokenBalance.contractId)
          ) {
            const balance = tokenBalancesMap.get(
              tokenBalance.contractId
            )?.balance;

            tokenBalancesMap.set(tokenBalance.contractId, {
              ...tokenBalance,
              balance: (
                parseInt(balance ?? '0') + parseInt(tokenBalance.balance)
              ).toString(),
            });
          } else {
            tokenBalancesMap.set(
              accountStore.groupBalances
                ? tokenBalance.contractId
                : `tb-${tbIndex}`, // Make sure map key is unique if groupBalances is turned off
              tokenBalance as TokenHolder
            );
          }
        });

        return tokenBalancesMap.values();
      }),
    };
  },
});
</script>
