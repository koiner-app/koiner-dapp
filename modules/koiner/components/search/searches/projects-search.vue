<template>
  <q-card-section v-if="results.length > 0">
    <span class="text-caption"> Projects [{{ results.length }}] </span>

    <q-list dense>
      <q-item v-ripple v-for="project in results" :key="project.name">
        <q-item-section>
          <q-item-label class="text-white">
            {{ project.name }}
            <q-chip dense square size="sm" color="white" class="q-ml-sm">{{
                project.types[0]
              }}</q-chip>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            <q-btn
              v-for="(link, linkIndex) in project.links"
              :key="`project-name-link-${linkIndex}`"
              :href="link.url"
              target="_blank"
              flat
              round
              :icon="link.icon"
              size="sm"
              style="color: #ffffffc4 !important"
              class="project-link"
            />
            <span>
              <q-icon
                name="info"
                style="color: #ffffffc4 !important; margin-left: 0.25rem"
                size="xs"
              />
              <q-tooltip class="bg-white text-primary shadow-1">
                {{ project.description }}
              </q-tooltip>
            </span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import { KoinosProjects, Project } from '@koiner/ecosystem';

export default defineComponent({
  name: 'ProjectsSearch',
  props: {
    search: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    const results: Ref<Array<Project>> = ref([]);

    watch(
      props,
      async () => {
        if (props.search !== '' && props.search.length > 1) {
          results.value = KoinosProjects.filter(
            (project) =>
              project.name.toLowerCase().includes(props.search.toLowerCase()) ||
              project.token?.name.toLowerCase().includes(props.search.toLowerCase())
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
