<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span v-if="rawValue(result) === 'burn'">
      <q-icon
        name="whatshot"
        color="red"
        style="background: #f443361c; border-radius: 100%; padding: 4px"
      >
        <q-tooltip class="bg-red" anchor="center right" self="center left"
          >Tokens burned</q-tooltip
        >
      </q-icon>
    </span>
    <span v-if="rawValue(result) === 'mint'">
      <q-icon
        name="add"
        color="#64aeea"
        style="background: #64aeea1a; border-radius: 100%; padding: 4px"
      >
        <q-tooltip
          style="background: #64aeea"
          anchor="center right"
          self="center left"
          >Tokens minted</q-tooltip
        >
      </q-icon>
    </span>
    <span v-if="rawValue(result) === 'transfer'">
      <q-icon
        name="east"
        color="green"
        style="background: #4caf5021; border-radius: 100%; padding: 4px"
      >
        <q-tooltip class="bg-green" anchor="center right" self="center left"
          >Tokens transferred</q-tooltip
        >
      </q-icon>
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
  name: 'TokenEventNameAttributeRenderer',
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

    return {
      ...attributeControl,
    };
  },
});
</script>
