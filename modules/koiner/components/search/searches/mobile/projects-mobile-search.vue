<template>
  <q-card-section v-if="results.length > 0">
    <span class="text-caption"> Projects [{{ results.length }}] </span>

    <q-list dense>
      <q-item
        v-ripple
        v-for="project in results"
        :key="project.name"
        clickable
        @click="openProject(project)"
      >
        <q-item-section>
          <q-item-label>
            {{ project.name }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            <q-chip dense square size="sm" class="q-ml-sm">{{
              project.types[0]
            }}</q-chip>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import { KoinosProjects, Project } from '@koiner/ecosystem';
import { useQuasar } from 'quasar';
import ProjectCardDialog from '@koiner/ecosystem/components/project-card-dialog.vue';

export default defineComponent({
  name: 'ProjectsMobileSearch',
  props: {
    search: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const results: Ref<Array<Project>> = ref([]);

    watch(
      props,
      async () => {
        if (props.search !== '' && props.search.length > 1) {
          results.value = KoinosProjects.filter(
            (project) =>
              project.name.toLowerCase().includes(props.search.toLowerCase()) ||
              project.token?.name
                .toLowerCase()
                .includes(props.search.toLowerCase())
          );
        } else {
          results.value = [];
        }
      },
      { deep: true }
    );

    /**
     * Project dialog
     */
    const openProject = (project: Project) => {
      $q.dialog({
        class: 'k-form-dialog',
        component: ProjectCardDialog,
        persistent: true,
        componentProps: {
          project,
        },
      }).onOk(() => {
        alert('Done');
      });
    };

    return {
      results,
      openProject,
    };
  },
});
</script>
