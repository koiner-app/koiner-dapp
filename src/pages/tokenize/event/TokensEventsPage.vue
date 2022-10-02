<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Token events</div>
          <q-space />

          <div class="search-filters">
            <q-btn :label="computedTokenLabel" flat icon="toll">
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <q-toggle v-model="koin" label="KOIN" />
                    <q-toggle v-model="vhp" label="VHP" />
                  </div>
                </div>
              </q-menu>
            </q-btn>

            <q-btn :label="computedEventLabel" flat icon="toll">
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <q-toggle v-model="transfer" label="Transfer" />
                    <q-toggle v-model="mint" label="Mint" />
                    <q-toggle v-model="burn" label="Burn" />
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>

          <search-filters
            :request="request"
            search-placeholder="Search by event id, parent (block id or transaction id), contract id, name or impacted addresses"
          />
        </div>

        <q-json-search
          :schema="schema"
          :uischema="uiSchema"
          :request="request"
          :data="{}"
          @on-scroll="onScroll"
          :scroll-position="position"
          :additional-renderers="renderers"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import tokenEventsSearchSchema from '@koiner/tokenize/event/search/token-events-search.schema.json';
import tokenEventsSearchUiSchema from '@koiner/tokenize/event/search/view/token-events-table.ui-schema.json';

export default defineComponent({
  name: 'TokensEventsPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    const searchStore = useSearchStore();
    const transfer: Ref<boolean> = ref(true);
    const mint: Ref<boolean> = ref(false);
    const burn: Ref<boolean> = ref(false);

    const updateNameFilter = () => {
      if (!searchStore.tokenEvents.request.filter) {
        searchStore.tokenEvents.request.filter = {};
      }

      if (transfer.value && mint.value && burn.value) {
        // No filter necessary
        if (searchStore.tokenEvents.request.filter?.OR) {
          delete searchStore.tokenEvents.request.filter.OR;
        }
      } else {
        searchStore.tokenEvents.request.filter.OR = [];

        if (transfer.value) {
          searchStore.tokenEvents.request.filter.OR.push({
            name: { contains: 'transfer' },
          });
        }

        if (mint.value) {
          searchStore.tokenEvents.request.filter.OR.push({
            name: { contains: 'mint' },
          });
        }

        if (burn.value) {
          searchStore.tokenEvents.request.filter.OR.push({
            name: { contains: 'burn' },
          });
        }
      }
    };

    onMounted(() => {
      updateNameFilter();
    });

    watch(transfer, () => {
      updateNameFilter();
    });

    watch(mint, () => {
      updateNameFilter();
    });

    watch(burn, () => {
      updateNameFilter();
    });

    const onScroll = (newScrollPosition: number) => {
      searchStore.tokenEvents.position = newScrollPosition;
    };

    return {
      transfer,
      mint,
      burn,
      onScroll,
      schema: tokenEventsSearchSchema,
      uiSchema: tokenEventsSearchUiSchema,
      request: searchStore.tokenEvents.request,
      position: searchStore.tokenEvents.position,
      renderers: KoinerRenderers,

      computedTokenLabel: computed(() => {
        const tokens: string[] = [];

        // if (transfer.value) {
        //   events.push('transfer');
        // }

        if (tokens.length === 0) {
          return 'All tokens';
        }

        if (tokens.length === 1) {
          return tokens[0];
        }

        return 'All tokens';
      }),
      computedEventLabel: computed(() => {
        const events = [];

        if (transfer.value) {
          events.push('transfer');
        }

        if (mint.value) {
          events.push('mint');
        }

        if (burn.value) {
          events.push('burn');
        }

        return events.length === 0 || events.length === 3
          ? 'All events'
          : `${events.join(' & ')} events`;
      }),
    };
  },
});
</script>
