<template>
  <q-card-section
    v-if="search !== '' && search.length > 1 && nameSearch.length > 0"
  >
    <span class="text-caption"> Contracts [{{ nameSearch.length }}] </span>

    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="result in nameSearch"
        :key="result.id"
        @click.prevent="
          router.push({ name: 'contract', params: { id: result.id } })
        "
      >
        <q-item-section v-if="mobile">
          <q-item-label>{{ result.name }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="!mobile">
          <q-item-label>{{ result.name }}</q-item-label>
        </q-item-section>
        <q-item-section side v-if="!mobile">
          <q-item-label caption>{{ result.id }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { contractsMap } from '@koiner/contracts/components/contract';

export default defineComponent({
  name: 'ContractsNameSearch',
  props: {
    search: {
      required: true,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
    },
  },

  setup(props) {
    const router = useRouter();

    const nameSearch = computed(() => {
      return Object.entries(contractsMap)
        .filter(([_, name]) =>
          name.toLowerCase().includes(props.search.toLowerCase())
        )
        .map(([id, name]) => ({ id, name }));
    });

    return {
      router,
      nameSearch,
    };
  },
});
</script>
