<template>
  <q-page class="row items-baseline justify-evenly" v-if="contract">
    <q-card class="table-card">
      <q-card-section>
        <tokens-operations-table
          v-if="contract.contractStandardType === 'token'"
          title="Operations"
          :contract-ids="[contract.id]"
        />
        <contract-operations-table
          v-else
          title="Operations"
          :contract-ids="[contract.id]"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Contract } from '@koiner/sdk';
import ContractOperationsTable from '../../../../components/contract/search/view/contracts-operations-table.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';

export default defineComponent({
  name: 'ContractOperationsPage',
  components: { TokensOperationsTable, ContractOperationsTable },
  props: {
    contract: {
      required: true,
      type: Object as PropType<Contract>,
    },
  },
});
</script>
