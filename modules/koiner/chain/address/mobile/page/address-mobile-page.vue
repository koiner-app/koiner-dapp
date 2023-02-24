<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat bordered v-if="id">
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="portfolio"
            style="padding: 0 !important; min-height: 100vh"
          >
            <q-card class="stats-card" flat>
              <q-card-section>
                <div class="text-caption">Address</div>
                <div class="stat-title">{{ id }}</div>
              </q-card-section>
              <q-card-section>
                <div class="stat-title">Virtual Koin Balance</div>
                <div class="stat-content" style="font-size: 1.5rem">
                  ${{
                    virtualKoinValue?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  }}
                  <br /><span :class="`stat-unit`" style="font-size: 0.875rem"
                    >{{
                      virtualKoin?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                    }}
                    Virtual KOIN</span
                  >
                </div>
              </q-card-section>
            </q-card>

            <token-balances-component
              v-if="tokenHolders"
              :token-balances="tokenHolders"
              :show-group-balances="false"
            />
          </q-tab-panel>

          <q-tab-panel
            name="rewards"
            class="tab--mobile-network"
            style="padding: 0 !important; min-height: 100vh"
          >
            <token-holder-balances-metric
              v-if="blockProducers && blockProducers.length > 0"
              title="Total Rewards"
              :token-holders="blockProducers"
              :tooltip-hide-delay="3000"
            />

            <block-rewards-table
              v-if="blockProducers && blockProducers.length > 0"
              :producer-ids="[id]"
              :mobile="true"
            />

            <div v-if="!blockProducers || blockProducers.length === 0">
              <div class="q-pa-md text-body1">Not a producer</div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Portfolio"
          name="portfolio"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Rewards"
          name="rewards"
        />
      </q-tabs>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import TokenBalancesComponent from '@koiner/account/mobile/components/token-balances-component.vue';
import BlockRewardsTable from '@koiner/network/components/block-production/search/view/block-rewards-table.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { TokenHolder } from '@koiner/sdk';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';
import { useRoute } from 'vue-router';
import { tokenAmount } from '@koiner/utils';

export default defineComponent({
  name: 'AddressMobilePage',
  components: {
    TokenHolderBalancesMetric,
    BlockRewardsTable,
    TokenBalancesComponent,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const route = useRoute();

    const id: Ref<string | undefined> = ref();
    const tab: Ref<string> = ref('portfolio');
    const totalVhp: Ref<number | undefined> = ref();
    const virtualKoin: Ref<number | undefined> = ref();
    const virtualKoinValue: Ref<number | undefined> = ref();

    const tokenHolderSearch = useSearchManager('tokenHolders');
    const blockProducersSearch = useSearchManager('blockProducers');

    onMounted(async () => {
      id.value = route.params.id.toString();
    });

    watch(
      () => route.params.id,
      async (newId) => {
        if (newId) {
          id.value = newId.toString();

          await loadTokenHolders();
          await loadBlockProducers();
        }
      }
    );

    const loadTokenHolders = async () => {
      const request: SearchRequestType = {
        first: 100,
        filter: {
          addressId: {
            equals: id.value,
          },
        },
      };

      await tokenHolderSearch.search(request);
    };

    const loadBlockProducers = async () => {
      const request: SearchRequestType = {
        first: 100,
        filter: {
          addressId: {
            equals: id.value,
          },
        },
      };

      await blockProducersSearch.search(request);
    };

    const loadTotals = () => {
      const edges = tokenHolderSearch.connection.value?.edges?.filter(
        (tokenBalance) =>
          tokenBalance.node.contractId === koinerStore.koinContract.id ||
          tokenBalance.node.contractId === koinerStore.vhpContract.id
      );

      if (!edges) {
        return 0;
      }

      const decimals = 8;
      const balances = edges.map((edge) => edge.node.balance);

      let totalBalance = 0;
      balances.forEach((balance) => {
        totalBalance += parseInt(balance);
      });

      virtualKoin.value = tokenAmount(totalBalance, decimals);
      virtualKoinValue.value = virtualKoin.value * statsStore.koinStats.price;
    };

    onMounted(async () => {
      await loadTokenHolders();
      await loadBlockProducers();
    });

    watch(
      tokenHolderSearch.connection,
      () => {
        loadTotals();
      },
      { deep: true }
    );

    return {
      id,
      tab,
      koinerStore,
      statsStore,

      totalVhp,
      virtualKoin,
      virtualKoinValue,

      tokenHolders: computed((): TokenHolder[] => {
        return tokenHolderSearch.connection.value?.edges?.map(
          (edge) => edge.node
        ) as TokenHolder[];
      }),

      blockProducers: computed(() => {
        // Transform BlockProducer profits to TokenHolder for input of component
        return blockProducersSearch.connection.value?.edges?.map((edge) => {
          return {
            addressId: edge.node.addressId,
            balance: edge.node.balance,
            contract: koinerStore.koinContract,
            contractId: koinerStore.koinContract.id,
          } as TokenHolder;
        });
      }),
    };
  },
});
</script>
