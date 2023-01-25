<template>
  <q-card flat class="q-mt-md q-mr-md project-card">
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
        :key="`project-${project.name}-link-${linkIndex}`"
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Project } from '../projects';

export default defineComponent({
  name: 'ProjectCard',
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
});
</script>
