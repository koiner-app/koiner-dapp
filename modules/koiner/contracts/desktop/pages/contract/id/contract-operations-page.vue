<template>
  <q-page class="row items-baseline justify-evenly" v-if="contract">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <tokens-operations-table
          v-if="contract.contractStandardType === 'token'"
          title="Operations"
          :contract-ids="[id]"
        />
        <contract-operations-table
          v-else
          title="Operations"
          :contract-ids="[id]"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ContractOperationsTable from '../../../../components/contract/search/view/contracts-operations-table.vue';
import { Contract, useContractQuery } from '@koiner/sdk';
import { ItemState } from '@appvise/search-manager';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';

export default defineComponent({
  name: 'ContractOperationsPage',
  components: { TokensOperationsTable, ContractOperationsTable },

  setup() {
    let id: Ref<string | undefined> = ref();

    const itemState = ItemState.create<Contract>();
    const variables: Ref<{ id: string }> = ref({ id: '' });
    const route = useRoute();

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useContractQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.contract as Contract;
      });

      itemState.error = error;
      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    onMounted(async () => {
      id.value = route.params.id.toString();
      variables.value.id = route.params.id.toString();
      executeQuery();
      itemState.isPaused.value = true;
      itemState.isPaused.value = false;
    });

    watch(
      () => route.params.id,
      async (newId) => {
        itemState.isPaused.value = !newId;
        variables.value.id = newId ? newId.toString() : '';
      }
    );

    return {
      id,

      itemState,
      contract: itemState.item,
      error: itemState.error,
    };
  },
});
</script>
