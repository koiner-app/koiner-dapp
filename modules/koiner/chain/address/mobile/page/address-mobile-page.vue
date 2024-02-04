<template>
  <q-page class="row items-start mobile-tab-page" v-if="id">
    <q-header reveal elevated>
      <q-toolbar>
        <back-button />

        <q-toolbar-title>
          <span class="page-title"> Address </span>
        </q-toolbar-title>

        <q-space />

        <copy-to-clipboard
          :source="id"
          :show-source="false"
          :tooltip="'Copy address to clipboard'"
          icon-size="xs"
        />
        <bookmark-component
          :item="{ id, type: 'address' }"
          list-id="addresses"
          item-translation="koiner.chain.item.address"
          class="q-px-md"
          icon-size="1.25rem"
        />
        <share-dialog
          :id="id"
          :url="`https://koiner.app/mobile/addresses/${id}`"
          :message="`Check this Koinos wallet ${id} on Koiner`"
        />
      </q-toolbar>
    </q-header>

    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated swipeable>
          <q-tab-panel
            name="tokens"
            style="padding: 0 !important; min-height: 100vh"
          >
            <q-card class="stats-card" flat style="margin: 0.5rem 1rem 0">
              <q-card-section>
                <div class="text-caption">Address</div>
                <div class="stat-title q-pb-none">
                  <copy-to-clipboard
                    :source="id"
                    :tooltip="'Copy address to clipboard'"
                  />
                </div>
              </q-card-section>
            </q-card>

            <div class="q-pa-md row items-start q-gutter-md">
              <q-card
                class="stats-card"
                flat
                style="width: calc(50% - 1rem) !important"
              >
                <q-card-section>
                  <div class="stat-title">
                    <span style="font-size: 0.675rem !important"
                      >Virtual Koin</span
                    >
                  </div>
                  <div class="stat-content" style="font-size: 1.5rem">
                    <span :class="`stat-unit`" style="font-size: 1rem"
                      >${{
                        virtualKoinValue?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                      }}
                    </span>
                    <p
                      :class="`stat-unit`"
                      style="font-size: 0.675rem; margin-top: 0.5rem"
                    >
                      {{
                        virtualKoin?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                      }}
                      <span
                        :class="`stat-unit`"
                        style="font-size: 0.5rem; opacity: 0.8"
                        >KOIN/VHP
                      </span>
                    </p>
                  </div>
                </q-card-section>
              </q-card>

              <q-card
                class="stats-card"
                flat
                style="width: calc(50% - 1rem) !important"
              >
                <q-card-section>
                  <div class="stat-title">
                    <span style="font-size: 0.675rem !important">Assets</span>
                  </div>
                  <div class="stat-content" style="font-size: 1.5rem">
                    <span :class="`stat-unit`" style="font-size: 1rem"
                      >{{ tokenHolders?.length }}x tokens
                    </span>
                    <p
                      :class="`stat-unit`"
                      style="font-size: 0.675rem; margin-top: 0.5rem"
                    >
                      &nbsp;
                    </p>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <token-balances-component
              v-if="tokenHolders"
              :token-balances="tokenHolders"
              :show-group-balances="false"
            />
          </q-tab-panel>

          <q-tab-panel name="history" class="tab--mobile-table">
            <q-card class="stats-card" flat style="margin: 0.5rem 1rem 1rem">
              <q-card-section>
                <div class="text-caption">Address</div>
                <div class="stat-title q-pb-none">
                  <copy-to-clipboard
                    :source="id"
                    :tooltip="'Copy address to clipboard'"
                  />
                </div>
              </q-card-section>
            </q-card>

            <address-mobile-history v-if="id" :addresses="[id]" />
          </q-tab-panel>

          <q-tab-panel name="nfts" class="tab--mobile-table">
            <q-card class="stats-card" flat>
              <q-card-section>
                <div class="text-center text-h6 text-bold">Coming soon</div>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <q-tab-panel
            name="mining"
            class="tab--mobile-table"
            v-if="blockProducers && blockProducers.length > 0"
          >
            <div class="q-pa-md row items-start q-gutter-md">
              <token-holder-balances-metric
                title="Total Rewards"
                :token-holders="blockProducers"
                :tooltip-hide-delay="3000"
                class="col-6"
              />
            </div>

            <block-rewards-table :producer-ids="[id]" :mobile="true" />
          </q-tab-panel>

          <q-tab-panel name="liquidity" class="tab--mobile-table">
            <token-balances-component
              v-if="tokenHolders.length > 0"
              :token-balances="tokenHolders"
              :show-group-balances="false"
              :liquidity-pools="true"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Tokens"
          name="tokens"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="History"
          name="history"
        />
        <q-tab class="text-overline" :ripple="false" label="NFTs" name="nfts" />
        <q-tab
          v-if="blockProducers && blockProducers.length > 0"
          class="text-overline"
          :ripple="false"
          label="Mining"
          name="mining"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Liquidity"
          name="liquidity"
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
import BlockRewardsTable from '@koiner/network/block-production/search/view/block-rewards-table.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { TokenHolder } from '@koiner/sdk';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';
import { useRoute } from 'vue-router';
import { timeAgo, tokenAmount } from '@koiner/utils';
import AddressMobileHistory from '@koiner/chain/address/mobile/components/address-mobile-history.vue';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import CopyToClipboard from '@koiner/components/copy-to-clipboard.vue';
import ShareDialog from '@koiner/components/share-dialog.vue';
import BackButton from '@koiner/components/back-button.vue';

export default defineComponent({
  name: 'AddressMobilePage',
  methods: { timeAgo },
  components: {
    BackButton,
    ShareDialog,
    CopyToClipboard,
    BookmarkComponent,
    AddressMobileHistory,
    TokenHolderBalancesMetric,
    BlockRewardsTable,
    TokenBalancesComponent,
  },

  setup() {
    const route = useRoute();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    const id: Ref<string | undefined> = ref();
    const tab: Ref<string> = ref('tokens');
    const totalVhp: Ref<number | undefined> = ref();
    const virtualKoin: Ref<number | undefined> = ref();
    const virtualKoinValue: Ref<number | undefined> = ref();

    const tokenHolderSearch = useSearchManager('tokenHolders');
    const blockProducersSearch = useSearchManager('blockProducers');

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
      id.value = route.params.id.toString();

      if (route.query['tab']) {
        tab.value = route.query['tab'].toString();
      }

      if (route.name === 'mobile.address.history') {
        tab.value = 'history';
      }

      await loadTokenHolders();
      await loadBlockProducers();
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

    watch(
      tokenHolderSearch.connection,
      async () => {
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
