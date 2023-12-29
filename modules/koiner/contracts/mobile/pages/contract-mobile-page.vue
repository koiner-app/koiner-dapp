<template>
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

export default defineComponent({
  name: 'ContractMobilePage',
  components: {
    CopyToClipboard,
    ContractsEventsTable,
    ContractsOperationsTable,
    VueJsonPretty,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const route = useRoute();

    const tab: Ref<string> = ref('contract-details');
    const itemState = ItemState.create<Contract>();
    const variables: Ref<{ id: string }> = ref({ id: '' });

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

    onMounted(async () => {
      variables.value.id = route.params.id.toString();
      executeQuery();
    });

    watch(
      () => route.params.id,
      async (newId) => {
        variables.value.id = newId ? newId.toString() : '';
      }
    );

    return {
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
