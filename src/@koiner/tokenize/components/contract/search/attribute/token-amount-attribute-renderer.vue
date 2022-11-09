<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span>
      {{
        tokenAmount(
          parseInt(rawValue(result.node)),
          mappedValue(result.node, 'contract.decimals')
        )
      }}
      <router-link
        :to="to(mappedValue(result.node, 'contract.id'))"
        :class="`${styles.attribute.link}`"
      >
        <span>
          {{ mappedValue(result.node, 'contract.symbol') }}
          <q-tooltip :delay="500">{{
            mappedValue(result.node, 'contract.name')
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
import { tokenAmount } from '@koiner/utils';

export default defineComponent({
  name: 'TokenAmountAttributeRenderer',
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
        name: 'token',
        params: { id: data },
      };
    };

    return {
      ...attributeControl,
      to,
      tokenAmount,
    };
  },
});
</script>
