<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin k-form-dialog">
      <q-json-forms
        form-class="assign-teams-form"
        :data="formData"
        :schema="schema"
        :uischema="uiSchema"
        @change="onChange"
        @submit="submit"
        @cancel="cancel"
      />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { JsonFormsChangeEvent } from '@jsonforms/vue';
import addProjectSchema from './add-project.schema.json';
import addProjectUiSchema from './add-project.uischema.json';
import { useI18n } from 'vue-i18n';
import QJsonForms from '@appvise/q-json-forms/QJsonForms.vue';

export default defineComponent({
  name: 'AddProjectForm',
  components: {
    QJsonForms,
  },

  emits: [
    // Required for dialog
    ...useDialogPluginComponent.emits,
  ],

  setup(props, { emit }) {
    const $q = useQuasar();

    // Required for dialog
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const formData: Ref<Record<string, unknown>> = ref({
      items: [{}],
    });
    const { t } = useI18n();

    const submit = () => {
      // const input = formData.value as AddTeamMembersInput;
      //
      // if (input.items.length > 0) {
      //   input.items.map((item) => {
      //     item.user = { connect: props.userId };
      //   });
      //
      //   addTeamMembers({
      //     data: input,
      //   }).then((result: any) => {
      //     if (
      //       result.errorCount > 0 ||
      //       !result.data.addTeamMembers ||
      //       !result.data.addTeamMembers.results
      //     ) {
      //       $q.notify({
      //         message: t('appvise.iam.team.form.addProject.messages.error'),
      //         type: 'negative',
      //       });
      //     } else {
      onDialogOK();
      //     }
      //   });
      // }
    };

    const cancel = () => {
      onDialogCancel();
    };

    return {
      // Required for dialog
      dialogRef,
      onDialogHide,

      formData,
      schema: addProjectSchema,
      uiSchema: addProjectUiSchema,
      submit,
      cancel,
    };
  },

  methods: {
    onChange(event: JsonFormsChangeEvent) {
      this.formData = event.data;
    },
  },
});
</script>
