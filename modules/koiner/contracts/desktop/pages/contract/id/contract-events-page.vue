<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <contract-events-table title="Events" :contract-ids="[id]" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import ContractEventsTable from '../../../../components/contract/search/view/contracts-events-table.vue';

export default defineComponent({
  name: 'ContractEventsPage',
  components: { ContractEventsTable },

  setup() {
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
    });

    return {
      id,
    };
  },
});
</script>
