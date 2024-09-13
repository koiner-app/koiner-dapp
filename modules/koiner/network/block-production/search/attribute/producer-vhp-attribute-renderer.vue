<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span>
      <span>{{ vhpSize(mappedValue(result, 'vhpBalance')) }}%</span>
      {{
        localizedTokenAmount(
          parseInt(mappedValue(result, 'vhpBalance')),
          koinerStore.vhpContract.decimals,
          0
        )
      }}
      {{ koinerStore.vhpContract.symbol }}
    </span>
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
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';

export default defineComponent({
  name: 'ProducerVhpAttributeRenderer',
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
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    const attributeControl = useQuasarAttribute(useJsonAttribute(props));

    const vhpSize = (vhpBalance: string): string => {
      return (
        (parseInt(vhpBalance) /
          parseInt(statsStore.totalSupply.vhpTotalSupply)) *
        100
      ).toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

    return {
      koinerStore,
      ...attributeControl,
      vhpSize,
    };
  },
});
</script>
