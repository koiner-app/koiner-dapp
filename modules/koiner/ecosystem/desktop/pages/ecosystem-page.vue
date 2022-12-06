<template>
  <q-page>
    <div class="row q-px-md full-width">
      <h1 class="text-h5">Ecosystem</h1>

      <q-space />

      <q-btn
        class="q-mr-sm"
        color="primary"
        unelevated
        @click="addProject"
        flat
        style="
          height: 1rem;
          margin-top: 1rem;
          text-transform: none;
          padding: 0.25rem;
        "
      >
        <q-icon name="add" class="q-mr-sm" size="xs" />
        Submit your project
      </q-btn>
    </div>

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

    <div class="row items-start">
      <q-card
        v-for="(project, projectIndex) in selectedProjects"
        :key="`project-${projectIndex}`"
        flat
        class="q-mt-md q-mr-md project-card"
      >
        <q-card-section class="q-pb-sm">
          <div class="row no-wrap items-center">
            <q-avatar class="q-mr-sm">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.name"
                style="max-width: 50px; max-height: 50px"
              />
              <q-icon v-if="project.icon" :name="project.icon" size="lg" />
            </q-avatar>
            <div class="project-title">
              {{ project.name }}
              <div class="text-caption" v-if="project.caption">
                {{ project.caption }}
              </div>
            </div>

            <div
              v-if="project.token"
              class="text-grey absolute-right q-mr-lg q-mt-md q-pt-xs"
            >
              <span class="text-caption">
                <router-link
                  v-if="project.token.contractId"
                  :to="{
                    name: 'token',
                    params: { id: project.token.contractId },
                  }"
                >
                  <q-icon name="toll" />
                  {{ project.token.name }}
                </router-link>
                <span v-else>
                  <q-icon name="toll" />
                  {{ project.token.name }}</span
                >
              </span>
            </div>
          </div>

          <div class="q-py-sm">
            <q-chip v-for="tag in project.tags" :key="tag" size="sm">
              {{ tag }}
            </q-chip>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-xs">
          <div class="text-caption text-grey project-description">
            {{ project.description }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            v-for="(link, linkIndex) in project.links"
            :key="`project-${projectIndex}-link-${linkIndex}`"
            :href="link.url"
            target="_blank"
            flat
            round
            :icon="link.icon"
            size="sm"
            class="project-link"
          />
        </q-card-actions>
      </q-card>
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

export default defineComponent({
  name: 'EcosystemPage',

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
    };
  },
});
</script>

<style lang="scss">
.project-card {
  min-width: calc(33.33% - 18px);
  max-width: calc(33.33% - 18px);

  .project-title {
    font-weight: bold;
    font-size: 1rem;

    @media (min-width: 1200px) {
      font-size: 1.125rem;
    }
  }

  .q-avatar {
    border-radius: 0 !important;
  }

  .fa-brands {
    &.fa-youtube {
      color: #ff0001;
    }

    &.fa-telegram {
      color: #2da1d3;
    }

    &.fa-twitter {
      color: #1b9bf0;
    }

    &.fa-apple {
      color: #666666;
    }

    &.fa-discord {
      color: #5662eb;
    }
  }

  .fa-solid {
    color: grey;
  }

  .project-link {
    padding: 0 !important;
    color: grey !important;

    .fa-brands {
      &.fa-youtube,
      &.fa-telegram,
      &.fa-twitter,
      &.fa-apple,
      &.fa-discord {
        color: grey !important;
      }
    }
  }

  .project-description {
    min-height: 100px;

    @media (min-width: 1200px) {
      min-height: 80px;
    }

    @media (min-width: 1440px) {
      min-height: 60px;
    }
  }
}

.project-tag-button {
  border-radius: 16px;
  height: 28px;
  margin: 4px;
  padding: 0;
  min-height: 28px;

  &:before {
    box-shadow: 0 3px 2px -1px rgb(0 0 0 / 2%), 0 5px 2px rgb(0 0 0 / 3%),
      0 1px 6px rgb(0 0 0 / 2%);
  }

  .q-chip {
    margin: 0 !important;
    text-transform: none;
    background-color: #eeeeee;
    color: #333;
    opacity: 0.8;
  }

  &.selected {
    .q-chip {
      background-color: $primary;
      color: white;
    }

    &:before {
      box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
        0 3px 1px -2px rgb(0 0 0 / 12%);
    }
  }
}
</style>
