<template>
  <q-page class="row items-start mobile-tab-page" v-if="tokenContract">
    <q-header reveal elevated v-if="tokenContract">
      <q-toolbar>
        <back-button />

        <q-space />

        <q-toolbar-title>
          <q-avatar
            v-if="tokenLogo(tokenContract.id, tokenContract.symbol)"
            size="1.5rem"
          >
            <img
              :src="tokenLogo(tokenContract.id, tokenContract.symbol)"
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
          v-if="tokenContract.name === 'disabled'"
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
          :id="tokenContract.id"
          :url="`https://koiner.app/mobile/tokens/${tokenContract.id}`"
          :message="`Check ${tokenContract.name} on Koiner`"
        />
        <account-menu-mobile />
      </q-toolbar>
    </q-header>

    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated swipeable>
          <q-tab-panel name="token-details" class="tab--mobile-table">
            <q-card class="stats-card" flat>
              <q-card-section class="q-pb-sm">
                <div class="text-caption">Token</div>
                <div class="stat-title">
                  {{ tokenContract.name }}
                </div>

                <div
                  v-if="tradableTokens().includes(tokenContract.id)"
                  class="trade-token absolute-right q-mr-xl q-mt-md"
                >
                  <div class="text-caption">Trade</div>

                  <q-btn
                    :href="`https://app.koindx.com/swap?output=${tokenContract.id}`"
                    target="_blank"
                    color="primary"
                    style="
                      padding: 0.025rem 0.25rem !important;
                      min-height: 1rem;
                      font-size: 0.75rem;
                    "
                  >
                    @KoinDX
                  </q-btn>
                </div>
              </q-card-section>
              <q-card-section class="q-pb-sm">
                <div class="text-caption">Total Supply</div>
                <div class="stat-title">
                  {{
                    tokenAmount(
                      parseInt(tokenContract.totalSupply),
                      tokenContract.decimals
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: tokenContract.decimals,
                    })
                  }}<q-chip size="xs">{{ tokenContract.symbol }}</q-chip>
                </div>
              </q-card-section>
              <q-card-section class="q-py-none">
                <div class="text-caption">ID</div>
                <div>
                  <copy-to-clipboard
                    :source="tokenContract.id"
                    :tooltip="'Copy contract id to clipboard'"
                    button-class=""
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
import { tokenAmount, tokenLogo } from '../../../utils';
import ShareDialog from '@koiner/components/share-dialog.vue';
import AccountMenuMobile from '@koiner/components/account-menu-mobile.vue';
import BackButton from '@koiner/components/back-button.vue';
import { tradableTokens } from '@koiner/tokenize/tradable-tokens-map';

export default defineComponent({
  name: 'TokenMobilePage',
  methods: {
    tradableTokens() {
      return tradableTokens;
    },
    tokenLogo,
    tokenAmount,
  },
  components: {
    BackButton,
    AccountMenuMobile,
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

      watch(data, async (updatedData) => {
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
    };
  },
});
</script>
