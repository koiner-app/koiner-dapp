<template>
  <q-page class="row items-baseline justify-evenly" v-if="contract">
    <q-card class="table-card">
      <q-card-section>
        <tokens-events-table
          v-if="contract.contractStandardType === 'token'"
          title="Events"
          :contract-ids="[contract.id]"
        />
        <contract-events-table
          v-else
          title="Events"
          :contract-ids="[contract.id]"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ContractEventsTable from '../../../../components/contract/search/view/contracts-events-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import { Contract } from '@koiner/sdk';

export default defineComponent({
  name: 'ContractEventsPage',
  components: { TokensEventsTable, ContractEventsTable },
  props: {
    contract: {
      required: true,
      type: Object as PropType<Contract>,
    },
  },
});
</script>
