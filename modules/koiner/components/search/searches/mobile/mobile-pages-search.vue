<template>
  <q-card-section v-if="results.length > 0">
    <span class="text-caption"> Pages [{{ results.length }}] </span>

    <q-list dense>
      <q-item
        clickable
        v-ripple
        v-for="page in results"
        :key="page.name"
        :to="{ name: page.route }"
      >
        <q-item-section>
          <q-item-label>
            {{ page.name }}
          </q-item-label>
        </q-item-section>
        <q-item-section side
          ><q-item-label>
            <q-chip dense square size="sm" color="white" class="q-ml-sm">{{
              page.module
            }}</q-chip>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import { mobilePages } from './mobile-pages';

export default defineComponent({
  name: 'MobilePagesSearch',
  props: {
    search: {
      required: true,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
    }
  },

  setup(props) {
    const results: Ref<Array<{ name: string; route: string; module: string }>> =
      ref([]);

    watch(
      props,
      async () => {
        if (props.search !== '' && props.search.length > 1) {
          results.value = mobilePages.filter(
            (page) =>
              page.name.toLowerCase().includes(props.search.toLowerCase()) ||
              page.module.toLowerCase().includes(props.search.toLowerCase())
          );
        } else {
          results.value = [];
        }
      },
      { deep: true }
    );

    return {
      results,
    };
  },
});
</script>
