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
          koinerStore.vhpContract.decimals,
          displayedDecimals
        )
      }}
      <router-link
        :to="{
          name: 'token',
          params: { id: '1JZqj7dDrK5LzvdJgufYBJNUFo88xBoWC8' },
        }"
        :class="`${styles.attribute.link}`"
      >
        <span>
          {{ koinerStore.vhpContract.symbol }}
          <q-tooltip :delay="500">{{ koinerStore.vhpContract.name }}</q-tooltip>
        </span>
      </router-link>
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
  name: 'VhpTokenAmountAttributeRenderer',
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
    const displayedDecimals =
      attributeControl.appliedOptions.value['decimals'] != null
        ? parseInt(attributeControl.appliedOptions.value['decimals'])
        : undefined;

    return {
      koinerStore,
      ...attributeControl,
      formattedTokenAmount,
      displayedDecimals,
    };
  },
});
</script>
