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
import { round } from 'lodash';

export default defineComponent({
  name: 'CounterMetric',
  props: {
    name: {
      required: true,
      type: String,
    },
    value: {
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
        return round(props.value, props.decimals).toLocaleString();
      }),
    };
  },
});
</script>
