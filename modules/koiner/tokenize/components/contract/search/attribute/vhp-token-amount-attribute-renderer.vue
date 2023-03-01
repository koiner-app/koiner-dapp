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
        v-if="linkToken"
        :to="{
          name: isMobile ? 'mobile.token' : 'token',
          params: { id: koinerStore.vhpContract.id  },
        }"
        :class="`${styles.attribute.link}`"
      >
        <span>
          {{ koinerStore.vhpContract.symbol }}
          <q-tooltip :delay="500">{{ koinerStore.vhpContract.name }}</q-tooltip>
        </span>
      </router-link>
      <span v-else>
        <span
          >{{ koinerStore.vhpContract.symbol
          }}<q-tooltip :delay="500">{{
            koinerStore.vhpContract.name
          }}</q-tooltip>
        </span>
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
    const linkToken: boolean =
      attributeControl.appliedOptions.value['linkToken'] != null
        ? attributeControl.appliedOptions.value['linkToken']
        : true;
    const isMobile: boolean =
      attributeControl.appliedOptions.value['mobile'] != null
        ? attributeControl.appliedOptions.value['mobile']
        : false;

    return {
      koinerStore,
      ...attributeControl,
      formattedTokenAmount,

      displayedDecimals,
      linkToken,
      isMobile,
    };
  },
});
</script>
