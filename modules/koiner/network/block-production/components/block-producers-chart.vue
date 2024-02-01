<template>
  <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, Ref } from 'vue';
import { BlockProducersConnection } from '@koiner/sdk';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { useStatsStore } from 'stores/stats';
import { blockProducersMap } from '@koiner/network/block-producers-map';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

export default defineComponent({
  name: 'BlockProducersChart',
  components: {
    Doughnut,
  },
  props: {
    connection: {
      required: true,
      type: Object as PropType<BlockProducersConnection>,
    },
  },

  setup(props) {
    const statsStore = useStatsStore();

    const blockProducers: Ref<BlockProducersConnection | null> = ref(null);
    const blockProducersPie: Ref<
      Record<string, { percentage: number; vhp: number }>
    > = ref({});

    const colors = [
      '#41B883',
      '#E46651',
      '#00D8FF',
      '#DD1B16',
      '#41B883',
      '#E46651',
      '#00D8FF',
      '#DD1B16',
      '#41B883',
      '#E46651',
      '#00D8FF',
      '#DD1B16',
      '#41B883',
      '#E46651',
      '#00D8FF',
      '#DD1B16',
      '#41B883',
      '#E46651',
      '#00D8FF',
      '#DD1B16',
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

      if (props.connection.edges) {
        let subTotal = 0;
        props.connection.edges.forEach((edge, index) => {
          if (colors[index]) {
            const vhpSize =
              (parseInt(edge.node.vhpBalance.balance) /
                parseInt(statsStore.totalSupply.vhpTotalSupply)) *
              100;

            subTotal += vhpSize;

            values.labels.push(
              blockProducersMap[edge.node.addressId] ?? edge.node.addressId
            );
            values.datasets[0].backgroundColor.push(colors[index]);
            values.datasets[0].data.push(vhpSize);
          }
        });

        values.labels.push('Others');
        values.datasets[0].backgroundColor.push('yellow');
        values.datasets[0].data.push(100 - subTotal);
      }

      return {
        ...values,
        plugins: {
          datalabels: {
            color: 'white',
            anchor: 'center',
            align: 'center',
            offset: 0,
            font: {
              weight: 'bold',
            },
            formatter: (value, context) => {
              // Customize label formatting if needed
              return `${
                context.chart.data.labels[context.dataIndex]
              }: ${value.toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}%`;
            },
          },
        },
      };
    });

    return {
      blockProducers,
      blockProducersPie,

      chartData,
      chartData2: {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
});
</script>
