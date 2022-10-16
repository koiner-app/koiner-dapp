<template>
  <q-card v-if="tokenHolders.length > 0" class="stats-card" flat>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">{{ contract.name }} Balance</div>
        <div class="text-h4 q-mt-sm q-mb-xs">
          {{ value }}
          <span style="font-size: 1.25rem">{{ contract.symbol }}</span>
        </div>
        <div class="text-caption">
          {{
            `${contractTokenHolders.length} address${
              contractTokenHolders.length > 1 ? 'es' : ''
            }`
          }}
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
  },

  setup(props) {
    const tokenAmount = (units: number, decimals: number): number => {
      return round(units / Math.pow(10, decimals), 0);
    };

    const contract = computed(() => {
      // Use first contract as default
      let result = props.tokenHolders[0].contract;

      // Try to find TokenHolder with requested contract if contractId is provided
      if (props.contractId) {
        const thWithContract = props.tokenHolders.filter(
          (tokenHolder) => tokenHolder.contractId === props.contractId
        );

        if (thWithContract.length > 0) {
          result = thWithContract[0].contract;
        }
      }

      return result;
    });

    const contractTokenHolders = computed(() => {
      return props.tokenHolders.filter(
        (node) => node.contractId === contract.value.id
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

        return tokenAmount(total, decimals);
      }),
    };
  },
});
</script>
