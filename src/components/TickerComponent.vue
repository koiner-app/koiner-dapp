<template>
  <div class="tickers">
    <!--    <q-icon>mdi-pencil</q-icon>-->
    <q-scroll-area style="height: 18px; width: 600px">
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
          <!--          <span v-else>{{ tickerItem.title }}</span>-->
          <span
            v-if="tickerItem.progress !== undefined"
            :class="
              tickerItem.progressClass !== undefined
                ? tickerItem.progressClass
                : ''
            "
            >{{ tickerItem.progress }}</span
          >
          <span v-if="tickerItem.value !== undefined">{{
            tickerItem.value
          }}</span>
        </span>
      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},

  setup() {
    const tickers: {
      items: {
        title: string;
        tooltip?: string;
        progress?: string;
        progressClass?: string;
        value?: string;
      }[];
    }[] = [
      {
        items: [
          {
            title: 'MC',
            tooltip: 'Market Cap',
            value: '$ 35,620,884',
          },
          {
            title: 'MRR GR',
            tooltip: 'Monthly Recurring Revenue Growth Rate',
            progress: '+250%',
            progressClass: 'green--text',
            value: '3x',
          },
          {
            title: 'Net MRR Churn',
            tooltip: 'Net MRR Churn Rate',
            progress: '20%',
            progressClass: 'red--text',
          },
        ],
      },
      {
        items: [
          {
            title: 'Total users',
            value: '120.507',
          },
          {
            title: 'DAU',
            tooltip: 'Daily Active Users',
            progress: '+2.5%',
            progressClass: 'green--text',
            value: '3015',
          },
          {
            title: 'MAU',
            tooltip: 'Monthly Active Users',
            progress: '+4.3%',
            progressClass: 'green--text',
            value: '1251',
          },
        ],
      },
      {
        items: [
          {
            title: 'Support tickets',
            value: '120.507',
          },
          {
            title: 'DAU',
            tooltip: 'Daily Active Users',
            progress: '+2.5%',
            progressClass: 'green--text',
            value: '3015',
          },
          {
            title: 'MAU',
            tooltip: 'Monthly Active Users',
            progress: '+4.3%',
            progressClass: 'green--text',
            value: '1251',
          },
        ],
      },
    ];

    return {
      tickers,
    };
  },
});
</script>
