<template>
  <div v-if="error" class="text-center q-pa-md flex flex-center">
    <div v-if="isNotFound">
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Page not found...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';
import { CombinedError } from '@urql/core/dist/types/utils/error';

export default defineComponent({
  name: 'ErrorView',
  props: {
    error: {
      type: Object as PropType<Ref<CombinedError | undefined>>,
      required: true,
      default: null,
    },
  },

  setup(props) {
    return {
      isNotFound: computed(
        () =>
          props.error.value &&
          props.error.value.graphQLErrors?.length > 0 &&
          props.error.value.graphQLErrors[0].message.includes(
            'Entity was not found'
          )
      ),
    };
  },
});
</script>
