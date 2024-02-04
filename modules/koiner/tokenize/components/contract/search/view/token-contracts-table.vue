<template>
  <!--  <div class="row no-wrap items-center">-->
  <!--    <div v-if="title" class="text-h6">{{ title }}</div>-->

  <!--    <q-space />-->

  <!--    <search-filters-->
  <!--      class="token-contracts-filters"-->
  <!--      :request="request"-->
  <!--      search-info="Search token name, symbol or contract id"-->
  <!--    />-->
  <!--  </div>-->

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    @change="onChange"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../token-contracts-search.schema.json';
import mobileUiSchema from './token-contracts-table.mobile-ui-schema.json';
import desktopUiSchema from './token-contracts-table.ui-schema.json';
import { TokenContractsConnection } from '@koiner/sdk';
import { koinerConfig } from 'app/koiner.config';

export default defineComponent({
  name: 'TokenContractsTable',
  components: { QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
    },
    liquidityPools: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  emits: ['contractCountUpdated'],

  setup(props, { emit }) {
    const onChange = async (data: TokenContractsConnection) => {
      emit('contractCountUpdated', data?.edges ? data.edges.length : 0);
    };

    return {
      onChange,
      schema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request: props.liquidityPools
        ? {
            first: 250,
            filter: {
              AND: [
                {
                  name: {
                    iContains: 'LIQUIDITY',
                  },
                },
                {
                  id: {
                    excludes: '17t977jJZ7DYKPQsjqtStbpvmde1DditXW',
                  },
                },
              ],
            },
          }
        : {
            first: 250,
            filter: {
              AND: [
                {
                  name: {
                    excludes: 'LIQUIDITY POOL',
                  },
                },
                {
                  name: {
                    excludes: 'Token',
                  },
                },
                {
                  name: {
                    excludes: 'Test',
                  },
                },
                {
                  name: {
                    excludes: 'test',
                  },
                },
                {
                  id: {
                    // Bitcoin
                    excludes: '1BzymN6NwNyQszkEPkmSjnCLxpLpxHF4p7',
                  },
                },
                {
                  id: {
                    // Test Ethereum
                    excludes: '1HZEzcttxD2HKVXdAHJwipLzix4NENMVjK',
                  },
                },
                {
                  id: {
                    excludes: '1Gov26MjgHcRP95p8WaqVNBRLVmZSThkxP',
                  },
                },
                {
                  id: {
                    excludes: '1H3NBeKhbjiviqNUqvf35ZgDJEWt9hrmmN',
                  },
                },
                {
                  id: {
                    excludes: '1LnmquvXUKPS18dFszBCvkLD9WiBsUt8eq',
                  },
                },
                {
                  id: {
                    excludes: '16QqxFiift3FhBBaNCJiGoZUivx44Seqxe',
                  },
                },
                {
                  id: {
                    excludes: koinerConfig.production.contracts.oldVhp.id,
                  },
                },
              ],
            },
          },
      renderers: KoinerRenderers,
    };
  },
});
</script>

<style lang="scss">
.token-contracts-filters .wildcard-search.q-field--highlighted {
  width: 400px !important;
}
</style>
