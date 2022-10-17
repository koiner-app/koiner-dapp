<template>
  <q-card v-if="tokenHolders.length > 0" class="stats-card" flat>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">{{ computedTitle }}</div>
        <div class="text-h4 q-mt-sm q-mb-xs">
          {{ value }}
          <span style="font-size: 1.25rem">{{ computedCaption }}</span>
        </div>
        <div class="text-caption" v-if="showAddressCount">
          {{ `${addressCount} address${addressCount > 1 ? 'es' : ''}` }}
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { TokenHolder } from '@koiner/sdk';
import { round } from 'lodash';

export default defineComponent({
  name: 'TokenHolderBalancesMetric',
  props: {
    tokenHolders: {
      required: true,
      type: Object as PropType<TokenHolder[]>,
    },
    contractId: {
      required: false,
      type: String,
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
    const tokenAmount = (units: number, decimals: number): number => {
      return round(units / Math.pow(10, decimals), 0);
    };

    const propsContractIds: string[] | undefined =
      props.contractIds ?? (props.contractId ? [props.contractId] : undefined);

    const contract = computed(() => {
      // Use first contract as default
      let result = props.tokenHolders[0].contract;

      // Try to find TokenHolder with requested contract if contractId is provided
      if (propsContractIds) {
        const thWithContract = props.tokenHolders.filter((tokenHolder) =>
          propsContractIds.includes(tokenHolder.contractId)
        );

        if (thWithContract.length > 0) {
          result = thWithContract[0].contract;
        }
      }

      return result;
    });

    // Use contractId from first contract if no props are provided
    const contractIds: string[] = propsContractIds ?? [contract.value.id];

    const contractTokenHolders = computed(() => {
      return props.tokenHolders.filter((node) =>
        contractIds.includes(node.contractId)
      );
    });

    return {
      contract,
      contractTokenHolders,
      value: computed(() => {
        const decimals = contract.value.decimals;
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
          .replace('{token.name}', contract.value.name)
          .replace('{token.symbol}', contract.value.symbol);
      }),
      computedCaption: computed(() => {
        return props.caption
          .replace('{token.name}', contract.value.name)
          .replace('{token.symbol}', contract.value.symbol);
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
