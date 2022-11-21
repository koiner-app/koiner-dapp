<template>
  <div :class="`text-grey-8 q-gutter-xs attribute-group ${customClass}`">
    <span v-if="before" class="before-attribute-group">{{ before }}</span>
    <dispatch-renderer
      v-for="(attribute, index) in control.uischema.elements"
      :key="`${control.path}-attribute-${index}`"
      :schema="control.schema"
      :uischema="attribute"
      :path="control.path"
      :enabled="control.enabled"
      :renderers="control.renderers"
      :cells="control.cells"
      :result="result"
    />
    <span v-if="after" class="after-attribute-group">{{ after }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { DispatchRenderer, RendererProps, rendererProps } from '@jsonforms/vue';
import {
  AttributeElement,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';

export default defineComponent({
  name: 'AttributeGroupRenderer',
  components: { DispatchRenderer },
  props: {
    ...rendererProps<AttributeElement>(),

    result: {
      type: Object as PropType<any>,
      required: false,
      default: null,
    },
  },
  setup(props: RendererProps<AttributeElement>) {
    const attribute = useQuasarAttribute(useJsonAttribute(props));
    return {
      control: attribute.control,

      customClass: computed(() => {
        return attribute.control.value?.uischema?.options?.class ?? '';
      }),
      before: computed(() => {
        return attribute.control.value?.uischema?.options?.before;
      }),
      after: computed(() => {
        return attribute.control.value?.uischema?.options?.after;
      }),
    };
  },
});
</script>
