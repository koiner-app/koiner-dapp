<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span>
      <router-link
        :to="to(mappedValue(result, 'contract.id'))"
        :class="`${styles.attribute.link}`"
      >
        <span>
          {{ mappedValue(result, 'contract.name') }}
          <q-tooltip :delay="500">{{
            mappedValue(result, 'contract.symbol')
          }}</q-tooltip>
        </span>
      </router-link>
    </span>
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import {
  AttributeElement,
  AttributeWrapper,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';

export default defineComponent({
  name: 'TokenAttributeRenderer',
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
    const attributeControl = useQuasarAttribute(useJsonAttribute(props));

    const to = (data: Record<string, unknown>) => {
      // Use route with params
      return {
        name: attributeControl.appliedOptions.value['route'] ?? 'token',
        params: { id: data },
      };
    };

    return {
      ...attributeControl,
      to,
    };
  },
});
</script>
