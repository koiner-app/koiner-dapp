<template>
  <q-header reveal elevated v-if="contract">
    <q-toolbar>
      <q-btn
        size="0.675rem"
        icon="arrow_back_ios_new"
        @click="$router.go(-1)"
      />

      <q-space />
      <q-separator dark vertical inset class="lt-md" />

      <q-toolbar-title class="min-width: 150px">
        <span>
          {{ id }}
        </span>
      </q-toolbar-title>

      <q-space />

      <copy-to-clipboard
        :source="contract.id"
        :show-source="false"
        :tooltip="'Copy address to clipboard'"
        icon-size="1rem"
      />
      <bookmark-component
        :item="{ id: contract.id, type: 'contract' }"
        list-id="contracts"
        item-translation="koiner.contracts.item.contract"
        class="q-px-md"
        icon-size="1.25rem"
      />
      <share-dialog
        :id="contract.id"
        :url="`https://koiner.app/m/contracts/${id}`"
        :message="`Check this Koinos contract ${id} on Koiner`"
      />
    </q-toolbar>
  </q-header>

  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat v-if="contract">
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="contract-details" class="tab--mobile-table">
            <q-card class="stats-card" flat>
              <q-card-section>
                <div class="text-caption">Contract</div>
                <div class="stat-title">
                  <copy-to-clipboard
                    :source="contract.id"
                    :tooltip="'Copy contract id to clipboard'"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-mb-sm">Abi</div>

                <vue-json-pretty v-if="contract.abi" :data="abi" />
                <span v-else>No ABI</span>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="contract-operations" class="tab--mobile-table">
            <contracts-operations-table
              :contract-ids="[contract.id]"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="contract-events" class="tab--mobile-table">
            <contracts-events-table
              :contract-ids="[contract.id]"
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
          name="contract-details"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Operations"
          name="contract-operations"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Events"
          name="contract-events"
        />
      </q-tabs>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { Contract, useContractMobilePageQuery } from '@koiner/sdk';
import { ItemState } from '@appvise/search-manager';
import { useRoute } from 'vue-router';
import ContractsOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';
import ContractsEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import CopyToClipboard from '@koiner/components/copy-to-clipboard.vue';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import ShareDialog from '@koiner/components/share-dialog.vue';

export default defineComponent({
  name: 'ContractMobilePage',
  components: {
    ShareDialog,
    BookmarkComponent,
    CopyToClipboard,
    ContractsEventsTable,
    ContractsOperationsTable,
    VueJsonPretty,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const route = useRoute();

    const id: Ref<string | undefined> = ref();
    const tab: Ref<string> = ref('contract-details');
    const itemState = ItemState.create<Contract>();
    const variables: Ref<{ id: string }> = ref({ id: '' });

    onMounted(async () => {
      id.value = route.params.id.toString();
      variables.value.id = route.params.id.toString();
      executeQuery();
    });

    watch(
      () => route.params.id,
      async (newId) => {
        if (newId) {
          id.value = newId.toString();
          variables.value.id = newId ? newId.toString() : '';
        }
      }
    );

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useContractMobilePageQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.contract as Contract;
      });

      watch(error, (updatedError) => {
        itemState.error.value = updatedError;
      });

      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    return {
      id,
      itemState,
      contract: itemState.item,
      error: itemState.error,

      tab,
      koinerStore,
      statsStore,

      abi: computed(() => {
        if (itemState.item.value?.abi) {
          return JSON.parse(itemState.item.value.abi);
        }

        return {};
      }),
    };
  },
});
</script>
