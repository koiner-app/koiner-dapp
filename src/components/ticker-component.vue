<template>
  <div class="tickers">
    <!--    <q-icon>mdi-pencil</q-icon>-->
    <q-scroll-area ref="scrollAreaRef" style="height: 18px; width: 600px">
      <div v-for="(ticker, i) in tickers" :key="'ticker-' + i" class="ticker">
        <span
          v-for="(tickerItem, j) in ticker.items"
          :key="`ticker-${j}`"
          class="ticker-item"
        >
          <span v-if="j > 0" class="divider--extra-small"></span>
          <span>
            {{ tickerItem.title }}
            <q-tooltip
              v-if="tickerItem.tooltip !== undefined"
              top
              nudge-right="54"
              close-delay="25"
              z-index="98"
              transition="hide-on-leave"
            >
              <span>{{ tickerItem.tooltip }}</span>
            </q-tooltip>
          </span>
          <span v-if="tickerItem.value !== undefined">{{
            tickerItem.value
          }}</span>
          <span
            v-if="tickerItem.progress !== undefined"
            :class="
              tickerItem.progressClass !== undefined
                ? tickerItem.progressClass
                : ''
            "
            >{{ tickerItem.progress }}</span
          >
        </span>
      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import { useKoinosStore } from 'stores/koinos';
import { useStatsStore } from 'stores/stats';
import { round } from 'lodash';

export default defineComponent({
  components: {},

  setup() {
    const koinosStore = useKoinosStore();
    const statsStore = useStatsStore();
    const scrollAreaRef: Ref<any> = ref(null);
    const tickers: Ref<
      {
        items: {
          title: string;
          tooltip?: string;
          progress?: string;
          progressClass?: string;
          value?: string;
        }[];
      }[]
    > = ref([]);

    const tokenAmount = (units: number, decimals: number): number => {
      return round(units / Math.pow(10, decimals), decimals);
    };

    const reloadTicker = () => {
      tickers.value = [
        {
          items: [
            {
              title: 'KOIN',
              tooltip: 'Koin price',
              value: koinosStore.formattedPrice,
              progress: koinosStore.formattedPriceChange24hPercentage,
              progressClass:
                koinosStore.price.change24hPercentage &&
                koinosStore.price.change24hPercentage > 0
                  ? 'green--text'
                  : 'red--text',
            },
            {
              title: 'MC',
              tooltip: 'Market Cap',
              value: koinosStore.formattedMarketCap,
            },
            {
              title: 'Txs',
              tooltip: 'Transactions',
              value: statsStore.chainStats.transactionCount.toString(),
            },
            {
              title: 'Users',
              tooltip: 'Amount of addresses registered on-chain',
              value: statsStore.chainStats.addressCount.toString(),
            },
          ],
        },
        {
          items: [
            {
              title: 'Rewarded',
              tooltip: 'Total Koin rewarded to block producers',
              value: tokenAmount(
                statsStore.blockProduction.rewarded,
                8
              ).toFixed(),
            },
            {
              title: 'VHP',
              tooltip: 'Total VHP burned by producers',
              value: tokenAmount(
                statsStore.blockProduction.burned,
                8
              ).toFixed(),
            },
            {
              title: 'ROI',
              tooltip: 'Total ROI for all block producers',
              progress: `${statsStore.blockProduction.roi.toString()}%`,
              progressClass: 'green--text',
            },
          ],
        },
        {
          items: [
            {
              title: 'Tokens',
              tooltip: 'Total Token smart contracts',
              value: statsStore.tokenStats.contractCount.toString(),
            },
            {
              title: 'Transfers',
              tooltip: 'Total token transfers',
              value: statsStore.tokenStats.transferCount.toString(),
            },
          ],
        },
      ];
    };

    let intervalId = setInterval(scrollTicker, 15000);
    const tickerRow = ref(0);

    function scrollTicker() {
      if (scrollAreaRef.value) {
        scrollAreaRef.value.setScrollPosition(
          'vertical', tickerRow.value * 18, 30);
      }

      // Show next row
      tickerRow.value += 1;

      if (tickerRow.value === tickers.value.length) {
        // Back to first row
        tickerRow.value = 0;
      }
    }

    watch(
      statsStore,
      () => {
        reloadTicker();
      },
      { deep: true }
    );

    return {
      tickers,
      scrollAreaRef,
    };
  },
});
</script>
