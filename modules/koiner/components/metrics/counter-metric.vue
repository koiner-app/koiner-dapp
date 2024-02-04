<template>
  <q-card class="stats-card" flat>
    <q-card-section>
      <div class="stat-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="stat-content">
        <router-link v-if="link" :to="link.to"
          >{{ formattedValue }}
          <slot name="unit">
            <span v-if="unit" :class="`stat-unit ${unitClass ?? ''}`">{{
              unit
            }}</span>
          </slot>
        </router-link>
        <span v-else>
          {{ formattedValue }}
          <slot name="unit">
            <span v-if="unit" :class="`stat-unit ${unitClass ?? ''}`">{{
              unit
            }}</span>
          </slot>
        </span>
      </div>
      <div class="stat-footer" v-if="footer">
        {{ footer.title }}
        <span class="stat-footer-stat"
          >{{
            footer.value.toLocaleString(undefined, { maximumFractionDigits: 0 })
          }}
          <span
            v-if="footer.unit"
            :class="`stat-unit ${footer.unitClass ?? ''}`"
            >{{ footer.unit }}</span
          >
        </span>
        <q-icon
          v-if="footerTooltips && footerTooltips.length > 0"
          name="help"
          color="grey"
          style="padding-bottom: 3px"
          class="q-ml-xs"
        />
        <q-tooltip
          v-if="footerTooltips && footerTooltips.length > 0"
          anchor="bottom start"
          self="top left"
          class="bg-primary text-white shadow-4"
          :hide-delay="footerTooltipHideDelay"
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
              <div
                class="col"
                :style="
                  tooltipItemWidth ? `min-width: ${tooltipItemWidth}px` : ''
                "
              >
                {{
                  footerTooltip.value.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })
                }}
                &nbsp;
                <span
                  v-if="footerTooltip.unit"
                  :class="`stat-unit ${footerTooltip.unitClass ?? ''}`"
                >
                  {{ footerTooltip.unit }}
                </span>
              </div>
            </div>
          </div>
        </q-tooltip>
      </div>
      <div class="stat-footer stat-footer2" v-if="footer2">
        {{ footer2.title }}
        <span class="stat-footer-stat">
          <span
            v-if="footer2.unitPrefix && footer2.unitPrefix"
            :class="`stat-unit ${footer2.unitClass ?? ''}`"
            >{{ footer2.unitPrefix }}</span
          >
          {{
            footer2.value.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}
          <span
            v-if="footer2.unit"
            :class="`stat-unit ${footer2.unitClass ?? ''}`"
            >{{ footer2.unit }}</span
          >
        </span>
      </div>
      <slot name="footer" />
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { round } from 'lodash';
import { localizedTokenAmount } from '@koiner/utils';
import { RouterLinkProps } from 'vue-router';

interface StatItem {
  title: string;
  value: number;
  unit?: string;
  unitPrefix?: string;
  unitClass?: string;
}

export default defineComponent({
  name: 'CounterMetric',
  props: {
    title: {
      required: true,
      type: String,
    },
    link: {
      required: false,
      type: Object as PropType<RouterLinkProps>,
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
    footerTooltipHideDelay: {
      required: false,
      type: Number,
    },
    tooltipTitleWidth: {
      required: false,
      type: Number,
      default: 100,
    },
    tooltipItemWidth: {
      required: false,
      type: Number,
    },
    footer2: {
      required: false,
      type: Object as PropType<StatItem>,
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
          output = localizedTokenAmount(
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
