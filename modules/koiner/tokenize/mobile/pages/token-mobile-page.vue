<template>
  <q-page class="row items-start mobile-tab-page" v-if="tokenContract">
    <q-header reveal elevated v-if="tokenContract">
      <q-toolbar>
        <q-btn
          size="0.675rem"
          icon="arrow_back_ios_new"
          @click="$router.go(-1)"
        />

        <q-space />

        <q-toolbar-title class="min-width: 150px">
          <q-avatar v-if="tokenLogo(tokenContract.symbol)" size="1rem">
            <img
              :src="`/tokens/${tokenLogo(tokenContract.symbol)}`"
              :alt="tokenContract.symbol"
            />
          </q-avatar>
          <q-avatar v-else color="primary" size="xs" text-color="white">
            <span style="font-size: 0.75rem">{{
              tokenContract.symbol.substring(0, 3)
            }}</span>
          </q-avatar>
          <span>
            {{ tokenContract.symbol }}
          </span>
        </q-toolbar-title>

        <q-space />

        <copy-to-clipboard
          :source="tokenContract.id"
          :show-source="false"
          :tooltip="'Copy address to clipboard'"
          icon-size="1rem"
        />
        <bookmark-component
          :item="{
            id: tokenContract.id,
            type: 'token',
            name: tokenContract.name,
            symbol: tokenContract.symbol,
          }"
          list-id="tokens"
          item-translation="koiner.chain.item.address"
          class="q-px-md"
          icon-size="1.25rem"
        />

        <share-dialog
          :url="`https://koiner.app/m/tokens/${tokenContract.id}`"
          :message="`Check ${tokenContract.name} on Koiner`"
        />
      </q-toolbar>
    </q-header>

    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="token-details" class="tab--mobile-table">
            <q-card class="stats-card" flat>
              <q-card-section class="q-pb-sm">
                <div class="text-caption">Token</div>
                <div class="stat-title">
                  {{ tokenContract.name }}
                </div>
              </q-card-section>
              <q-card-section class="q-pb-sm">
                <div class="text-caption">Total Supply</div>
                <div class="stat-title">
                  {{
                    tokenAmount(
                      parseInt(tokenContract.totalSupply),
                      tokenContract.decimals
                    )
                  }}<q-chip size="xs">{{ tokenContract.symbol }}</q-chip>
                </div>
              </q-card-section>
              <q-card-section class="q-py-none">
                <div class="text-caption">ID</div>
                <div>
                  <copy-to-clipboard
                    :source="tokenContract.id"
                    :tooltip="'Copy contract id to clipboard'"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-caption">Token Holders</div>
              </q-card-section>
            </q-card>

            <token-holders-table
              :contract-id="tokenContract.id"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="token-operations" class="tab--mobile-table">
            <tokens-operations-table
              :contract-ids="[tokenContract.id]"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="token-events" class="tab--mobile-table">
            <tokens-events-table
              :contract-ids="[tokenContract.id]"
              :mobile="true"
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
          label="Details"
          name="token-details"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Operations"
          name="token-operations"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Events"
          name="token-events"
        />
      </q-tabs>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { TokenContract, useTokenMobilePageQuery } from '@koiner/sdk';
import { ItemState } from '@appvise/search-manager';
import { useRoute } from 'vue-router';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import TokenHoldersTable from '@koiner/tokenize/components/holder/search/view/token-holders-table.vue';
import CopyToClipboard from '@koiner/components/copy-to-clipboard.vue';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import { tokenAmount } from '../../../utils';
import ShareDialog from '@koiner/components/share-dialog.vue';

export default defineComponent({
  name: 'TokenMobilePage',
  methods: { tokenAmount },
  components: {
    ShareDialog,
    BookmarkComponent,
    CopyToClipboard,
    TokenHoldersTable,
    TokensEventsTable,
    TokensOperationsTable,
  },

  setup() {
    const route = useRoute();

    const tab: Ref<string> = ref('token-details');
    const itemState = ItemState.create<TokenContract>();
    const variables: Ref<{ id: string }> = ref({ id: '' });

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useTokenMobilePageQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.tokenContract as TokenContract;
      });

      watch(error, (updatedError) => {
        itemState.error.value = updatedError;
      });

      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    onMounted(async () => {
      variables.value.id = route.params.id.toString();
      executeQuery();

      if (route.query['tab']) {
        tab.value = route.query['tab'].toString();
      }
    });

    watch(
      () => route.params.id,
      async (newId) => {
        variables.value.id = newId ? newId.toString() : '';
      }
    );

    return {
      tab,
      itemState,
      tokenContract: itemState.item,
      error: itemState.error,

      tokenLogo: (symbol: string): string => {
        const logos: Record<string, string> = {
          btk: 'bitkoin.png',
          drugs: 'drugs.png',
          dgk: 'dogekoin.png',
          eth: 'eth.png',
          egg: 'egg.png',
          mars: 'elonkoin.jpg',
          fr: 'frenchie.png',
          gold: 'gold.png',
          kan: 'kan.png',
          kdbln: 'kdbln.png',
          kct: 'kct.png',
          koin: 'koin.svg',
          koindx: 'koindx.svg',
          'koindx-lp': 'koindx.svg',
          punksk: 'punksk.png',
          meow: 'meow.jpg',
          mk: 'mk.png',
          noik: 'noik.jpg',
          ogas: 'ogas.png',
          pvhp: 'pvhp.png',
          rad: 'rad.png',
          rwa: 'rwa.jpg',
          shit: 'shit.jpg',
          tate: 'tate.png',
          up: 'up.png',
          usdt: 'usdt.png',
          vapor: 'vapor.svg',
          vhp: 'vhp.png',
        };

        return logos[symbol.toLowerCase()] ?? null;
      },
    };
  },
});
</script>
