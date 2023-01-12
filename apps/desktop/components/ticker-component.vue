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
            <span v-html="tickerItem.title" />
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
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { formattedTokenAmount, localizedTokenAmount } from '@koiner/utils';

export default defineComponent({
  components: {},

  setup() {
    const koinosStore = useKoinosStore();
    const koinerStore = useKoinerStore();
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

    const reloadTicker = () => {
      tickers.value = [
        {
          items: [
            {
              title: 'KOIN',
              tooltip: 'Koin price',
              value: statsStore.formattedKoinPrice,
              // progress: koinosStore.formattedPriceChange24hPercentage,
              // progressClass:
              //   koinosStore.price.change24hPercentage &&
              //   koinosStore.price.change24hPercentage > 0
              //     ? 'green--text'
              //     : 'red--text',
            },
            {
              title: 'MC',
              tooltip: 'Market Cap',
              value: statsStore.formattedMarketCap,
            },
            {
              title: 'Txs',
              tooltip: 'Transactions',
              value: statsStore.chainStats.transactionCount.toLocaleString(
                undefined,
                { maximumFractionDigits: 2 }
              ),
            },
            {
              title: 'Users',
              tooltip: 'Amount of addresses registered on-chain',
              value: statsStore.chainStats.addressCount.toLocaleString(
                undefined,
                { maximumFractionDigits: 2 }
              ),
            },
          ],
        },
        {
          items: [
            {
              title: 'Burned',
              tooltip:
                '% of KOIN supply burned for block production',
              value: `${statsStore.totalSupply.burned.toLocaleString(
                undefined,
                {
                  maximumFractionDigits: 2,
                }
              )}%`,
            },
            {
              title: 'KOIN Sup',
              tooltip: 'Total supply of KOIN tokens in circulation',
              value: `${statsStore.formattedKoinTotalSupply()} ${
                koinerStore.koinContract.symbol
              }`,
            },
            {
              title: 'VHP Sup',
              tooltip: 'Total supply of VHP tokens in circulation',
              value: `${statsStore.formattedVhpTotalSupply()} ${
                koinerStore.vhpContract.symbol
              }`,
            },
          ],
        },
        {
          items: [
            {
              title: 'Producers',
              tooltip:
                'Total addresses that have produced blocks',
              value:
                statsStore.blockProduction.blockProducerCount.toLocaleString(
                  undefined,
                  { maximumFractionDigits: 2 }
                ),
            },
            {
              title: 'Rewarded',
              tooltip: 'Total Koin rewarded to block producers',
              value: `${localizedTokenAmount(
                statsStore.blockProduction.rewarded,
                koinerStore.koinContract.decimals,
                0
              )} ${koinerStore.koinContract.symbol}`,
            },
            {
              title: 'APY',
              tooltip: 'Estimated APY for producing blocks',
              progress: `${statsStore.blockProductionApy.toLocaleString(
                undefined,
                { maximumFractionDigits: 2 }
              )}%`,
              progressClass: 'green--text',
            },
          ],
        },
        {
          items: [
            {
              title: 'Tokens',
              tooltip: 'Total Token smart contracts',
              value: statsStore.tokenStats.contractCount.toLocaleString(
                undefined,
                { maximumFractionDigits: 2 }
              ),
            },
            {
              title: 'Transfers',
              tooltip: 'Total token transfers',
              value: statsStore.tokenStats.transferCount.toLocaleString(
                undefined,
                { maximumFractionDigits: 2 }
              ),
            },
          ],
        },
        {
          items: [
            {
              title:
                '<span style="color: #ef8fff;">Accelerating decentralization</span> by making Koinos blockchain data more accessible',
            },
          ],
        },
      ];
    };

    let intervalId = setInterval(scrollTicker, 5000);
    const tickerRow = ref(0);

    function scrollTicker() {
      if (scrollAreaRef.value) {
        scrollAreaRef.value.setScrollPosition(
          'vertical',
          tickerRow.value * 18,
          30
        );
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
