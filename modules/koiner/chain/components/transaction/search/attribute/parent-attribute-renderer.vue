<template>
  <attribute-wrapper
    v-if="result.node.parentId != null"
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <router-link
      :to="
        to(
          result.node.parentType === 'block'
            ? result.node.blockHeight
            : result.node.parentId,
          result.node.parentType
        )
      "
      :class="`${styles.attribute.link} parent--attribute`"
    >
      <q-icon
        v-if="appliedOptions.icon"
        :name="
          result.node.parentType === 'block' ? 'token' : appliedOptions.icon
        "
      />
      <span v-if="!appliedOptions.icon">{{ result.node.parentId }}</span>
      <q-tooltip>
        Parent {{ result.node.parentType }}: {{ result.node.parentId }}
      </q-tooltip>
    </router-link>
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import {
  AttributeWrapper,
  AttributeElement,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';

export default defineComponent({
  name: 'ParentAttributeRenderer',
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

    const to = (parentId: string, parentType: string) => {
      // Use route with params
      return {
        name: parentType,
        params:
          parentType === 'block' ? { height: parentId } : { id: parentId },
      };
    };

    return {
      ...attributeControl,
      to,
    };
  },
});
</script>
