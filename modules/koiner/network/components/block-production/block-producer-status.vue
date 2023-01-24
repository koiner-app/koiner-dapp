<template>
  <span
    :class="`producer-status q-mr-xs ${cssClass}`"
    style="
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      padding-top: 5px;
    "
  ></span>
  <q-tooltip
    anchor="bottom left"
    self="top left"
    :offset="[0, -10]"
    class="bg-primary text-white shadow-4"
    :hide-delay="15000"
  >
    <div class="q-pa-sm">
      <div class="row q-mb-md">
        <div class="col">
          {{ addressId }}
        </div>
      </div>
      <div class="row">
        <div class="col">Last seen:</div>
        <div class="col">
          {{ timeAgo(new Date(updatedAt).getTime()) }}
        </div>
      </div>
      <div class="row">
        <div class="col">Last block:</div>
        <div class="col">
          {{ lastProducedBlock }}
        </div>
      </div>
      <div class="row">
        <div class="col">Last interval:</div>
        <div class="col">
          {{ lastInterval.toFixed(0) }}
          blocks
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col">VHP network stake:</div>
        <div class="col">{{ vhpSize(vhpBalance) }}%</div>
      </div>
      <div class="row">
        <div class="col">VHP Balance:</div>
        <div class="col">
          {{
            formattedTokenAmount(
              parseInt(vhpBalance),
              koinerStore.vhpContract.decimals,
              2
            )
          }}
          {{ koinerStore.vhpContract.symbol }}
        </div>
      </div>
      <div class="row">
        <div class="col">Koin Balance:</div>
        <div class="col">
          {{
            formattedTokenAmount(
              parseInt(koinBalance),
              koinerStore.koinContract.decimals,
              2
            )
          }}
          {{ koinerStore.koinContract.symbol }}
        </div>
      </div>

      <div v-if="parseInt(koinBalance) > 0">
        <div class="row q-mt-md q-mb-xs">
          <div class="col">Expected producing ratio:</div>
        </div>
        <div class="row">
          <div class="col">Green:</div>
          <div class="col">
            1 in
            {{ ratioGreen.toFixed(0) }}
            blocks
          </div>
        </div>
        <div class="row">
          <div class="col">Yellow:</div>
          <div class="col">
            1 in
            {{ ratioYellow.toFixed(0) }}
            blocks
          </div>
        </div>
        <div class="row">
          <div class="col">Red:</div>
          <div class="col">
            1 in
            {{ ratioYellow.toFixed(0) }}
            + blocks
          </div>
        </div>
      </div>
    </div>
  </q-tooltip>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { formattedTokenAmount, timeAgo } from '@koiner/utils';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';

export default defineComponent({
  name: 'BlockProducerStatus',
  methods: { formattedTokenAmount, timeAgo },
  props: {
    addressId: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    vhpBalance: {
      type: String,
      required: true,
    },
    koinBalance: {
      type: String,
      required: true,
    },
    lastProducedBlock: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const ratioGreen = ref(0);
    const ratioYellow = ref(0);
    const lastInterval = ref(0);
    const cssClass = ref('bg-negative');

    const vhpSizeNumber = (vhpBalance: string): number => {
      return (
        (parseInt(vhpBalance) /
          parseInt(statsStore.totalSupply.vhpTotalSupply)) *
        100
      );
    };

    const vhpSize = (vhpBalance: string): string => {
      return vhpSizeNumber(vhpBalance).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
    };

    const load = (): any => {
      // If you have 10% of VHP, you should produce roughly 1 block out of every 10.
      // For smaller producers with .001%, they should produce 1/100k blocks.
      // We use multipliers to factor in variance. Green * 2, yellow * 5.
      const producerVhpSize = vhpSizeNumber(props.vhpBalance);
      const blockHeight = statsStore.chainStats.height - 60;

      ratioGreen.value = producerVhpSize ? (100 / producerVhpSize) * 2 : 0;
      ratioYellow.value = ratioGreen.value * 5;
      lastInterval.value = blockHeight - props.lastProducedBlock;

      if (lastInterval.value < ratioGreen.value) {
        cssClass.value = 'bg-positive';
      }

      if (
        lastInterval.value > ratioGreen.value &&
        lastInterval.value < ratioYellow.value
      ) {
        cssClass.value = 'bg-warning';
      }
    };

    onMounted(() => {
      load();
    });

    return {
      koinerStore,
      vhpSize,
      ratioGreen,
      ratioYellow,
      lastInterval,
      cssClass,
    };
  },
});
</script>
