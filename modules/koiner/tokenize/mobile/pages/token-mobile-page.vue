<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat v-if="tokenContract">
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="token-details" class="tab--mobile-table">
            <q-card class="stats-card" flat>
              <q-card-section>
                <div class="text-caption">Token</div>
                <div class="stat-title">
                  {{ tokenContract.name
                  }}<q-chip size="xs">{{ tokenContract.symbol }}</q-chip>
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

export default defineComponent({
  name: 'TokenMobilePage',
  components: {
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
