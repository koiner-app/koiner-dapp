<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <router-link
      v-if="result.node.parentType === 'transaction'"
      :to="to(result.node.parentId, result.node.parentType)"
      :class="`${styles.attribute.link} transaction--attribute`"
    >
      <q-icon name="receipt" />
      <q-tooltip> Transaction: {{ result.node.parentId }} </q-tooltip>
    </router-link>
    <router-link
      v-else-if="result.node.parentType === 'block'"
      :to="to(result.node.parentId, result.node.parentType)"
      :class="`${styles.attribute.link} block--attribute`"
    >
      <q-icon name="token" />
      <q-tooltip> Block: {{ result.node.parentId }} </q-tooltip>
    </router-link>
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
import { contractsMap } from '../../contracts-map';
import { getContractName } from '../../get-contract-name';

export default defineComponent({
  name: 'ContractEventParentAttributeRenderer',
  methods: { getContractName },
  computed: {
    contractsMap() {
      return contractsMap;
    },
  },
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

    const to = (id: string, parentType: string) => {
      return {
        name: parentType,
        params: { id },
      };
    };

    return {
      ...attributeControl,
      to,
    };
  },
});
</script>
