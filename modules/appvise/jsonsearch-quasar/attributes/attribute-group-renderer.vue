<template>
  <div class="text-grey-8 q-gutter-xs attribute-group">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
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
    return useQuasarAttribute(useJsonAttribute(props));
  },
});
</script>
