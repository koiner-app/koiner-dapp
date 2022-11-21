<template>
  <q-card class="stats-card" flat>
    <q-card-section>
      <div class="stat-title">{{ title }}</div>
      <div class="stat-content">
        {{ formattedValue }}
        <span v-if="unit" :class="`stat-unit ${unitClass ?? ''}`">{{ unit }}</span>
      </div>
      <div class="stat-footer" v-if="footer">
        {{ footer.title }}
        <span class="stat-footer-stat"
          >{{ footer.value }}
          <span v-if="footer.unit" :class="`stat-unit ${footer.unitClass ?? ''}`">{{
            footer.unit
          }}</span>
        </span>
        <q-tooltip
          v-if="footerTooltips && footerTooltips.length > 0"
          anchor="bottom start"
          self="top left"
          class="bg-primary text-white shadow-4"
        >
          <div class="q-pa-sm q-gutter-xs">
            <div
              class="row q-gutter-xs"
              v-for="(footerTooltip, index) in footerTooltips"
              :key="index"
            >
              <div class="col" :style="`min-width: ${tooltipTitleWidth}px`">
                {{ footerTooltip.title }}
              </div>
              <div class="col">
                {{ footerTooltip.value }}
                &nbsp;
                <span
                  v-if="footerTooltip.unit"
                  :class="`stat-unit ${footerTooltip.unitClass ?? ''}`"
                  >{{ footerTooltip.unit }}</span
                >
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
import { round } from 'lodash';
import { formattedTokenAmount } from '@koiner/utils';

interface StatItem {
  title: string;
  value: number;
  unit?: string;
  unitClass?: string;
}

export default defineComponent({
  name: 'CounterMetric',
  props: {
    title: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: [Number, String],
    },
    decimals: {
      required: false,
      type: Number,
    },
    tokenDecimals: {
      required: false,
      type: Number,
    },
    unit: {
      required: false,
      type: String,
    },
    unitClass: {
      required: false,
      type: String,
    },
    footer: {
      required: false,
      type: Object as PropType<StatItem>,
    },
    footerTooltips: {
      required: false,
      type: Array as PropType<Array<StatItem>>,
      default: () => [],
    },
    tooltipTitleWidth: {
      required: false,
      type: Number,
      default: 100,
    },
  },

  setup(props) {
    return {
      formattedValue: computed(() => {
        let output;

        if (typeof props.value === 'string') {
          // Don't format, display raw value
          return props.value;
        }

        if (props.tokenDecimals) {
          output = formattedTokenAmount(
            props.value,
            props.tokenDecimals,
            props.decimals
          );
        } else {
          output = round(props.value, props.decimals);
        }

        return output.toLocaleString();
      }),
    };
  },
});
</script>
