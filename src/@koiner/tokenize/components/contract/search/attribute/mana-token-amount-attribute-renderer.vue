<template>
  <attribute-wrapper
    v-if="rawValue(result.node)"
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span :class="`${rawValue(result.node)}`">
      {{
        formattedTokenAmount(
          parseInt(rawValue(result.node)),
          koinerStore.koinContract.decimals,
          formattedDecimals
        )
      }}
      <span>
        Mana
        <q-tooltip :delay="500">Resource Credits</q-tooltip>
      </span>
    </span>
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import { formattedTokenAmount } from '@koiner/utils';
import {
  AttributeElement,
  AttributeWrapper,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'ManaTokenAmountAttributeRenderer',
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
    const koinerStore = useKoinerStore();
    const attributeControl = useQuasarAttribute(useJsonAttribute(props));
    const formattedDecimals = attributeControl.appliedOptions.value['decimals']
      ? parseInt(attributeControl.appliedOptions.value['decimals'])
      : koinerStore.koinContract.decimals;

    return {
      koinerStore,
      ...attributeControl,
      formattedTokenAmount,
      formattedDecimals,
    };
  },
});
</script>
