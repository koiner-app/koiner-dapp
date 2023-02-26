<template>
  <q-page class="row items-baseline justify-evenly" v-if="tokenContract">
    <q-card class="table-card">
      <q-card-section>
        <token-holders-table
          title="Token Holders"
          :contract-id="tokenContract.id"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TokenHoldersTable from '../../../../components/holder/search/view/token-holders-table.vue';
import { TokenContract } from '@koiner/sdk';

export default defineComponent({
  name: 'TokenHoldersPage',
  components: { TokenHoldersTable },
  props: {
    tokenContract: {
      required: true,
      type: Object as PropType<TokenContract>,
    },
  },
});
</script>
