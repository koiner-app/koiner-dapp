<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <q-linear-progress
      size="25px"
      :value="parseInt(rawValue(result)) / 100"
      color="accent"
    >
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="accent" :label="progressLabel" />
      </div>
    </q-linear-progress>
  </attribute-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import AttributeWrapper from './attribute-wrapper.vue';
import {
  AttributeElement,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';

export default defineComponent({
  name: 'ProgressAttributeRenderer',
  components: {
    AttributeWrapper,
  },
  props: {
    ...rendererProps<AttributeElement>(),

    result: {
      type: Object as PropType<any>,
      required: false,
      default: null,
    },
  },
  setup(props: RendererProps<AttributeElement>) {
    const controlFields = useQuasarAttribute(useJsonAttribute(props));
    return {
      ...controlFields,
      progressLabel: computed(
        // TODO: Fix123
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        () => controlFields.rawValue(props.result).toFixed(2) + '%'
      ),
    };
  },
});
</script>
