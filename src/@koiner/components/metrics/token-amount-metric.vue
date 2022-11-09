<template>
  <q-card class="stats-card" flat>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">{{ name }}</div>
        <div class="text-h4 q-mt-sm q-mb-xs">
          {{ formattedValue }}
          <span v-if="caption" style="font-size: 1.25rem">{{ caption }}</span>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { tokenAmount } from '@koiner/utils';

export default defineComponent({
  name: 'TokenAmountMetric',
  props: {
    name: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: Number,
    },
    tokenDecimals: {
      required: true,
      type: Number,
    },
    decimals: {
      required: false,
      type: Number,
      default: 0,
    },
    caption: {
      required: false,
      type: String,
    },
  },

  setup(props) {
    return {
      formattedValue: computed(() => {
        return tokenAmount(props.value, props.tokenDecimals).toFixed(
          props.decimals
        );
      }),
    };
  },
});
</script>
