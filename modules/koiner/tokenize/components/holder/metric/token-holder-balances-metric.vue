<template>
  <q-card class="stats-card" flat>
    <q-card-section>
      <div class="stat-title">{{ computedTitle }}</div>
      <div class="stat-content">
        {{ value.toFixed(decimals) }}
        <span class="stat-unit">{{ computedCaption }}</span>
      </div>
      <div class="stat-footer" v-if="showAddressCount && addressCount > 0">
        <span class="stat-footer-stat"
          >{{ addressCount }}
          <span class="stat-unit">{{
            `address${addressCount > 1 ? 'es' : ''}`
          }}</span>
        </span>
        <q-tooltip
          anchor="bottom start"
          self="top left"
          class="bg-primary text-white shadow-4"
        >
          <div class="q-pa-sm q-gutter-xs">
            <div
              class="row q-gutter-xs"
              v-for="contractTokenHolder in contractTokenHolders"
              :key="contractTokenHolder.id"
            >
              <div class="col" style="min-width: 220px">
                {{ contractTokenHolder.addressId }}
              </div>
              <div class="col">
                {{
                  formattedTokenAmount(
                    contractTokenHolder.balance,
                    contractTokenHolder.contract.decimals
                  )
                }}
                &nbsp;
                <span class="stat-unit">{{
                  contractTokenHolder.contract.symbol
                }}</span>
              </div>
            </div>
          </div>
        </q-tooltip>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { TokenHolder } from '@koiner/sdk';
import { useKoinerStore } from 'stores/koiner';
import { formattedTokenAmount, tokenAmount } from '@koiner/utils';

export default defineComponent({
  name: 'TokenHolderBalancesMetric',
  props: {
    tokenHolders: {
      required: true,
      type: Object as PropType<TokenHolder[]>,
    },
    contract: {
      required: false,
      type: Object as PropType<{
        id: string;
        name: string;
        symbol: string;
        decimals: number;
      }>,
    },
    contractIds: {
      required: false,
      type: Object as PropType<Array<string>>,
    },
    title: {
      required: false,
      type: String,
      default: '{token.name}',
    },
    caption: {
      required: false,
      type: String,
      default: '{token.symbol}',
    },
    showAddressCount: {
      required: false,
      type: Boolean,
      default: true,
    },
    decimals: {
      required: false,
      type: Number,
      default: 0,
    },
  },
  emits: ['calculated'],

  setup(props, { emit }) {
    const koinerStore = useKoinerStore();

    // Load koin contract from store as default if none is provided
    const contract = props.contract ?? koinerStore.koinContract;

    const contractTokenHolders = computed(() => {
      const contractIds = props.contractIds ?? [contract.id];

      return props.tokenHolders.filter((node) =>
        contractIds.includes(node.contractId)
      );
    });

    return {
      contractTokenHolders,
      formattedTokenAmount,
      value: computed(() => {
        const decimals = contract.decimals;
        const balances = contractTokenHolders.value.map(
          (tokenHolder) => tokenHolder.balance
        );
        // const burnedTotals =

        let totalBalance = 0;
        balances.forEach((balance) => {
          totalBalance += parseInt(balance);
        });

        const amount = tokenAmount(totalBalance, decimals);

        emit('calculated', amount);

        return amount;
      }),
      computedTitle: computed(() => {
        return props.title
          .replace('{token.name}', contract.name)
          .replace('{token.symbol}', contract.symbol);
      }),
      computedCaption: computed(() => {
        return props.caption
          .replace('{token.name}', contract.name)
          .replace('{token.symbol}', contract.symbol);
      }),
      addressCount: computed(() => {
        return (
          contractTokenHolders.value
            // Get addressIds
            .map((tokenHolder) => tokenHolder.addressId)
            // Filter out duplicated
            .filter(
              (tokenHolder, i, arr) =>
                arr.findIndex((t) => t === tokenHolder) === i
            ).length
        );
      }),
    };
  },
});
</script>
