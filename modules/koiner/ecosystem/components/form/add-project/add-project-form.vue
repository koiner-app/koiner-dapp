<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin k-form-dialog">
      <q-json-forms
        form-class="submit-project-form"
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
import schema from './add-project.schema.json';
import uiSchema from './add-project.uischema.json';
import { useI18n } from 'vue-i18n';
import QJsonForms from '@appvise/q-json-forms/QJsonForms.vue';
import axios from 'axios';

export default defineComponent({
  name: 'AddProjectForm',
  components: {
    QJsonForms,
  },

  emits: [
    // Required for dialog
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    const $q = useQuasar();

    // Required for dialog
    const { dialogRef, onDialogHide, onDialogCancel } =
      useDialogPluginComponent();

    const formData: Ref<Record<string, unknown>> = ref({
      items: [{}],
    });
    const { t } = useI18n();

    const submit = () => {
      const input = formData.value as any;

      axios({
        method: 'POST',
        url:
          window.location.hostname === 'dapp.local'
            ? '/mailtrap/api/send'
            : 'https://send.api.mailtrap.io/api/send',
        headers: {
          'Api-Token': '3747136eef286658cb671cb6698e6e9e',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          to: [
            {
              email: 'hello@frankweijers.me',
              name: 'Frank',
            },
          ],
          subject: 'Project Submission',
          html:
            `<p><<strong>Project name</strong>${input.name}</p>` +
            `<p><<strong>Description</strong>${input.description}</p>` +
            `<p><<strong>Links</strong>${input.links}</p>` +
            `<p><<strong>Contact name</strong>${input.contactName}</p>` +
            `<p><<strong>Contact discord</strong>${input.contactDiscord}</p>`,
          from: {
            email: 'info@koiner.app',
            name: 'Koiner',
          },
        },
      })
        .then(() => {
          $q.notify({
            message: t(
              'koiner.ecosystem.project.form.addProject.messages.success'
            ),
            type: 'positive',
          });
        })
        .catch((error) => {
          console.error(error);

          $q.notify({
            message: t(
              'koiner.ecosystem.project.form.addProject.messages.error'
            ),
            type: 'negative',
          });
        });
    };

    const cancel = () => {
      onDialogCancel();
    };

    return {
      // Required for dialog
      dialogRef,
      onDialogHide,

      formData,
      schema,
      uiSchema,
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
