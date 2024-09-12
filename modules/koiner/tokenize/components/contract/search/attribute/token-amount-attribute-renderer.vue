<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span>
      <span
        >{{
          formattedTokenAmount(
            parseInt(rawValue(result)),
            mappedValue(result, 'contract.decimals'),
            displayedDecimals
          )
        }}
      </span>
      <router-link
        v-if="linkToken"
        :to="to(mappedValue(result, 'contract.id'))"
        :class="`${styles.attribute.link} q-ml-xs`"
      >
        <span>
          {{ mappedValue(result, 'contract.symbol') }}
          <q-tooltip :delay="500">{{
            mappedValue(result, 'contract.name')
          }}</q-tooltip>
        </span>
      </router-link>
      <span v-else>
        {{ mappedValue(result, 'contract.symbol') }}
        <q-tooltip :delay="500">{{
          mappedValue(result, 'contract.name')
        }}</q-tooltip>
      </span>
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
import { formattedTokenAmount } from '@koiner/utils';

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
    const displayedDecimals =
      attributeControl.appliedOptions.value['decimals'] != null
        ? parseInt(attributeControl.appliedOptions.value['decimals'])
        : undefined;
    const linkToken: boolean =
      attributeControl.appliedOptions.value['linkToken'] != null
        ? attributeControl.appliedOptions.value['linkToken']
        : true;
    const isMobile: boolean =
      attributeControl.appliedOptions.value['mobile'] != null
        ? attributeControl.appliedOptions.value['mobile']
        : false;

    const to = (data: Record<string, unknown>) => {
      // Use route with params
      return {
        name:
          attributeControl.appliedOptions.value['route'] ??
          (isMobile ? 'mobile.token' : 'token'),
        params: { id: data },
      };
    };

    return {
      ...attributeControl,
      to,
      formattedTokenAmount,

      displayedDecimals,
      linkToken,
      isMobile,
    };
  },
});
</script>
