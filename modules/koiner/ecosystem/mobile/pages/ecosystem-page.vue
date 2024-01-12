<template>
  <q-page>
    <div class="row q-px-md full-width">
      <q-btn
        @click="selectAllTypes"
        :class="`project-tag-button ${
          selectedTypes.includes('all') ? 'selected' : ''
        }`"
      >
        <q-chip>All projects</q-chip>
      </q-btn>
      <q-btn
        @click="toggleType(type)"
        v-for="type in types"
        :key="type"
        :class="`project-tag-button ${
          selectedTypes.includes(type) ? 'selected' : ''
        }`"
      >
        <q-chip @click="toggleType(type)" size="md">
          {{ type }}
        </q-chip>
      </q-btn>
    </div>
    <div class="row q-px-md q-pt-none full-width hidden">
      <q-btn
        @click="selectAllTags"
        :class="`project-tag-button ${
          selectedTags.includes('all') ? 'selected' : ''
        }`"
      >
        <q-chip>All tags</q-chip>
      </q-btn>
      <q-btn
        @click="toggleTag(tag)"
        v-for="tag in tags"
        :key="tag"
        :class="`project-tag-button ${
          selectedTags.includes(tag) ? 'selected' : ''
        }`"
      >
        <q-chip size="md">
          {{ tag }}
        </q-chip>
      </q-btn>
    </div>

    <div class="row items-start project-cards">
      <project-card
        v-for="(project, projectIndex) in selectedProjects"
        :key="`project-${projectIndex}`"
        :project="project"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, Ref, ref, watch } from 'vue';
import { KoinosProjects } from '../../projects';
import { Project } from '../..';
import { ProjectTags, ProjectTypes } from '../../projects';
import AddProjectForm from '@koiner/ecosystem/components/form/add-project/add-project-form.vue';
import ProjectCard from '@koiner/ecosystem/components/project-card.vue';

export default defineComponent({
  name: 'EcosystemPage',
  components: { ProjectCard },

  setup() {
    const $q = useQuasar();
    const selectedTypes: Ref<string[]> = ref(['all']);
    const selectedTags: Ref<string[]> = ref(['all']);
    const selectedProjects: Ref<Project[]> = ref(KoinosProjects);

    const updateProjects = () => {
      selectedProjects.value = [];

      for (const project of KoinosProjects) {
        if (
          (selectedTags.value[0] === 'all' ||
            project.tags.find((tag) => selectedTags.value.includes(tag))) &&
          (selectedTypes.value[0] === 'all' ||
            project.types.find((type) => selectedTypes.value.includes(type)))
        ) {
          selectedProjects.value.push(project);
        }
      }
    };

    watch(selectedTypes, () => {
      updateProjects();
    });

    watch(selectedTags, () => {
      updateProjects();
    });

    /**
     * AddProjects dialog
     */
    const addProject = () => {
      $q.dialog({
        class: 'k-form-dialog',
        component: AddProjectForm,
        persistent: true,
      }).onOk(() => {
        alert('Done');
      });
    };

    return {
      selectedTypes,
      selectedTags,
      selectedProjects,
      types: ProjectTypes,
      tags: ProjectTags,
      toggleType: (type: string) => {
        if (
          selectedTypes.value.includes(type) &&
          selectedTypes.value.length > 1
        ) {
          // Deselect if there are more than 1 item selected
          selectedTypes.value = selectedTypes.value.filter(
            (selectedType) => selectedType !== type
          );
        } else if (!selectedTypes.value.includes(type)) {
          // Add new selection
          // selectedTypes.value.push(type); // OR
          selectedTypes.value = [type]; // AND/SINGLE
        }

        if (selectedTypes.value.length > 0) {
          // Filter out all option
          selectedTypes.value = selectedTypes.value.filter(
            (selectedType) => selectedType !== 'all'
          );
        }
      },
      toggleTag: (tag: string) => {
        if (selectedTags.value.includes(tag) && selectedTags.value.length > 1) {
          // Deselect if there are more than 1 item selected
          selectedTags.value = selectedTags.value.filter(
            (selectedTag) => selectedTag !== tag
          );
        } else if (!selectedTags.value.includes(tag)) {
          // Add new selection
          selectedTags.value.push(tag); // OR
          // selectedTags.value = [tag]; // AND/SINGLE
        }

        if (selectedTags.value.length > 0) {
          // Filter out all option
          selectedTags.value = selectedTags.value.filter(
            (selectedTag) => selectedTag !== 'all'
          );
        }
      },
      selectAllTypes: () => {
        selectedTypes.value =
          selectedTypes.value !== ['all'] ? ['all'] : selectedTypes.value;
      },
      selectAllTags: () => {
        selectedTags.value =
          selectedTags.value !== ['all'] ? ['all'] : selectedTags.value;
      },
      addProject,
      showAddProject: window.location.hostname !== 'koiner.app',
    };
  },
});
</script>

<style lang="scss">
.layout--mobile {
  .project-cards {
    padding: 0.5rem;
  }

  .project-card {
    width: 100%;
    margin: 0.5rem;

    @media (min-width: 768px) {
      min-width: calc(50% - 1rem);
      max-width: calc(50% - 1rem);
    }

    .project-title {
      font-size: 1rem;

      @media (min-width: 1200px) {
        font-size: 1.125rem;
      }
    }

    .project-description {
      min-height: 60px;

      @media (min-width: 768px) {
        min-height: 100px;
      }
    }

    .q-avatar__content {
      border-radius: 50%;
    }
  }

  .project-tag-button {
    margin-bottom: 0.5rem;
  }
}
</style>
