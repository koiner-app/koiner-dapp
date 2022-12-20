<template>
  <div class="row no-wrap items-center" v-if="title">
    <div v-if="title" class="text-h6">{{ title }}</div>
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, watch } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import blockRewardsSearchSchema from '..//block-rewards-search.schema.json';
import { QueryBlockRewardsArgs } from '@koiner/sdk';
import mobileUiSchema from './block-rewards-table.mobile-ui-schema.json';
import desktopUiSchema from './block-rewards-table.ui-schema.json';

export default defineComponent({
  name: 'BlockRewardsComponent',
  components: { QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    contractIds: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    producerIds: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
    }
  },

  setup(props) {
    let request: Ref<QueryBlockRewardsArgs> = ref({ filter: {} });
    let contractIdsFilter: any;
    let producerIdFilter: any;

    const updateFilters = () => {
      request.value.filter = { AND: [] };

      if (props.contractIds && props.contractIds.length > 0) {
        contractIdsFilter = {
          OR: props.contractIds.map((contractId) => {
            return {
              contractId: { equals: contractId },
            };
          }),
        };
      }

      if (props.producerIds && props.producerIds.length > 0) {
        producerIdFilter = {
          OR: props.producerIds.map((producerId) => {
            return {
              producerId: { equals: producerId },
            };
          }),
        };
      }

      if (contractIdsFilter) {
        request.value.filter.AND?.push(contractIdsFilter);
      }

      if (producerIdFilter) {
        request.value.filter.AND?.push(producerIdFilter);
      }
    };

    onMounted(() => {
      updateFilters();
    });

    // Update filters when addresses change
    watch(
      props,
      () => {
        updateFilters();
      },
      { deep: true }
    );

    return {
      schema: blockRewardsSearchSchema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request: request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
