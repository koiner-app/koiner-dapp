<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card">
      <q-card-section>
        <tokens-events-table title="Events" :contract-ids="[id]" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import TokensEventsTable from '../../../../components/event/search/view/tokens-events-table.vue';

export default defineComponent({
  name: 'TokenEventsPage',
  components: { TokensEventsTable },

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
