<template>
  <Doughnut
    id="block-producers-chart"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { BlockProducersConnection } from '@koiner/sdk';
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { useStatsStore } from 'stores/stats';
import { blockProducersMap } from '@koiner/network/block-producers-map';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useQuasar } from 'quasar';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

export default defineComponent({
  name: 'BlockProducersChart',
  components: {
    Doughnut,
  },
  props: {
    blockProducers: {
      required: true,
      type: Object as PropType<BlockProducersConnection>,
    },
    showLabels: {
      required: false,
      type: Boolean,
      default: true,
    },
    labelMaxLength: {
      required: false,
      type: Number,
      default: 12,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const isDarkmode = $q.dark.isActive;
    const isMobile = $q.screen.width < 1024;

    const statsStore = useStatsStore();

    const colors = [
      '#6f00f6',
      '#8000ff',
      '#9100ff',
      '#a200ff',
      '#b300ff',
      '#c400ff',
      '#d500ff',
      '#e600ff',
      '#f700ff',
      '#ff00f6',
      '#ff00e5',
      '#ff00d4',
      '#ff00c3',
      '#ff00b2',
    ];

    const chartData = computed(() => {
      const values: {
        labels: string[];
        datasets: Array<{ backgroundColor: string[]; data: number[] }>;
      } = {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      };

      if (props.blockProducers.edges) {
        let subTotal = 0;
        props.blockProducers.edges.forEach((edge, index) => {
          const vhpSize =
            (parseInt(edge.node.vhpBalance.balance) /
              parseInt(statsStore.totalSupply.vhpTotalSupply)) *
            100;
          if (vhpSize > 1) {
            subTotal += vhpSize;

            values.labels.push(
              blockProducersMap[edge.node.addressId] ?? edge.node.addressId
            );
            values.datasets[0].backgroundColor.push(colors[index]);
            values.datasets[0].data.push(vhpSize);
          }
        });

        values.labels.push('Others');
        values.datasets[0].backgroundColor.push('#ff00a1');
        values.datasets[0].data.push(100 - subTotal);
      }

      return values;
    });

    const chartOptions: ChartOptions<'doughnut'> = {
      responsive: true,
      elements: {
        arc: {
          spacing: 10,
          borderWidth: 2,
          borderColor: isDarkmode
            ? '#000000'
            : isMobile
            ? '#F0F2F8'
            : '#ffffff',
          hoverBorderWidth: 8,
          hoverBorderColor: isDarkmode
            ? '#000000'
            : isMobile
            ? '#F0F2F8'
            : '#ffffff',
          borderRadius: 6,
        },
      },
      spacing: 100,
      plugins: {
        datalabels: {
          display: props.showLabels,
          color: isDarkmode ? 'rgba(255,255,255,0.76)' : 'rgba(255,255,255,1)',
          anchor: 'center',
          align: 'center',
          textAlign: 'center',
          offset: 0,
          font: {},
          formatter: (value, context) => {
            // Customize label formatting if needed
            return value > 5
              ? `${context.chart.data.labels[context.dataIndex].substring(
                  0,
                  props.labelMaxLength
                )}
${value.toLocaleString(undefined, {
  maximumFractionDigits: 1,
})}%`
              : '';
          },
        },
      },
    };

    return {
      chartData,
      chartOptions,
      isDarkmode,
    };
  },
});
</script>
