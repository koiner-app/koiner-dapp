<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <project-card :project="project" />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import ProjectCard from '@koiner/ecosystem/components/project-card.vue';
import { Project } from '@koiner/ecosystem';

export default defineComponent({
  name: 'AddProjectForm',
  components: {
    ProjectCard,
  },
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  emits: [
    // Required for dialog
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    // Required for dialog
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const close = () => {
      onDialogCancel();
    };

    return {
      // Required for dialog
      dialogRef,
      onDialogHide,

      close,
    };
  },
});
</script>
