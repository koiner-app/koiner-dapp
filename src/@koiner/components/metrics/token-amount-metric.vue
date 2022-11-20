<template>
  <q-card class="stats-card" flat>
    <q-card-section>
      <div class="stat-title">{{ name }}</div>
      <div class="stat-content">
        {{ formattedValue }}
        <span v-if="caption" class="stat-unit">{{ caption }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { formattedTokenAmount } from '@koiner/utils';

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
        return formattedTokenAmount(
          props.value,
          props.tokenDecimals,
          props.decimals
        );
      }),
    };
  },
});
</script>
