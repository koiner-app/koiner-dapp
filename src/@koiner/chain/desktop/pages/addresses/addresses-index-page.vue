<template>
  <q-page class="row items-baseline justify-evenly page--addresses-search">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <addresses-table title="Accounts" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddressesTable from '@koiner/chain/components/address/search/view/addresses-table.vue';

export default defineComponent({
  name: 'AddressesIndexPage',
  components: { AddressesTable },
});
</script>
