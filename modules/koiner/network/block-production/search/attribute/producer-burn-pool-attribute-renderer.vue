<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <a
      v-if="
        blockProducersMap[rawValue(result.node)] &&
        !blockProducersMap[rawValue(result.node)].includes('BurnKoin')
      "
      :href="`https://fogata.io/pools/${rawValue(result.node)}`"
      target="_blank"
      :class="`${styles.attribute.link} address-attribute`"
    >
      <img
        src="/projects/dapp/fogata.png"
        alt="Fogata Burn Pool"
        style="max-width: 2.5rem"
      />
    </a>
    <a
      v-if="
        blockProducersMap[rawValue(result.node)] &&
        blockProducersMap[rawValue(result.node)].includes('BurnKoin')
      "
      :href="`https://burnkoin.com`"
      target="_blank"
      :class="`${styles.attribute.link} address-attribute`"
    >
      <img
        class="dark-logo"
        src="/projects/dapp/burnkoin-dark.jpg"
        alt="BurnKoin"
        style="max-width: 2.5rem"
      />
    </a>
    <a
      v-if="
        blockProducersMap[rawValue(result.node)] &&
        blockProducersMap[rawValue(result.node)].includes('BurnKoin')
      "
      :href="`https://burnkoin.com`"
      target="_blank"
      :class="`${styles.attribute.link} address-attribute`"
    >
      <img
        class="light-logo"
        src="/projects/dapp/burnkoin.svg"
        alt="BurnKoin"
        style="max-width: 2.5rem"
      />
    </a>
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import { localizedTokenAmount, timeAgo } from '@koiner/utils';
import {
  AttributeElement,
  AttributeWrapper,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';
import { blockProducersMap } from '@koiner/network/block-producers-map';

export default defineComponent({
  name: 'ProducerBurnPoolAttributeRenderer',
  computed: {
    blockProducersMap() {
      return blockProducersMap;
    },
  },
  methods: { localizedTokenAmount, timeAgo },
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
