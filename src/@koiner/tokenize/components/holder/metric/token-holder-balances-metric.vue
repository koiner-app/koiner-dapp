<template>
  <q-card class="stats-card" flat>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">{{ computedTitle }}</div>
        <div class="text-h4 q-mt-sm q-mb-xs">
          {{ value }}
          <span style="font-size: 1.25rem">{{ computedCaption }}</span>
        </div>
        <div class="text-caption" v-if="showAddressCount && addressCount > 0">
          {{ `${addressCount} address${addressCount > 1 ? 'es' : ''}` }}
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
                    tokenAmount(
                      contractTokenHolder.balance,
                      contract.decimals,
                      contract.decimals
                    )
                  }}
                  &nbsp;
                  {{ contract.symbol }}
                </div>
              </div>
            </div>
          </q-tooltip>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { TokenHolder } from '@koiner/sdk';
import { round } from 'lodash';
import { koinerConstants } from '@koiner/koiner-constants';

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
      default: koinerConstants.contracts.koin,
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
  },
  emits: ['calculated'],

  setup(props, { emit }) {
    const tokenAmount = (
      units: number,
      decimals: number,
      precision = 0
    ): number => {
      return round(units / Math.pow(10, decimals), precision);
    };

    const contractTokenHolders = computed(() => {
      const contractIds = props.contractIds ?? [props.contract.id];

      return props.tokenHolders.filter((node) =>
        contractIds.includes(node.contractId)
      );
    });

    return {
      contractTokenHolders,
      tokenAmount,
      value: computed(() => {
        const decimals = props.contract.decimals;
        const balances = contractTokenHolders.value.map(
          (tokenHolder) => tokenHolder.balance
        );

        let total = 0;
        balances.forEach((balance) => {
          total += balance;
        });

        const amount = tokenAmount(total, decimals);

        emit('calculated', amount);

        return amount;
      }),
      computedTitle: computed(() => {
        return props.title
          .replace('{token.name}', props.contract.name)
          .replace('{token.symbol}', props.contract.symbol);
      }),
      computedCaption: computed(() => {
        return props.caption
          .replace('{token.name}', props.contract.name)
          .replace('{token.symbol}', props.contract.symbol);
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
