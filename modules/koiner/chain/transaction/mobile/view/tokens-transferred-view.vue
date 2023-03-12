<template>
  <q-card flat class="details-transaction q-pt-none" v-if="tokenTransfer">
    <q-card-section>
      <q-separator class="q-mb-lg" />

      <div class="text-overline">Tokens Transferred</div>

      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label caption>Amount:</q-item-label>
            <q-item-label
              >{{ formattedTokenAmount(Number(tokenTransfer.value), 8) }}
              <router-link
                :to="{
                  name: 'mobile.token',
                  params: { id: tokenTransfer.contract.id },
                }"
              >
                <span>
                  {{ tokenTransfer.contract.symbol }}
                </span>
              </router-link>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Sender:</q-item-label>
            <q-item-label>
              <router-link
                :to="{
                  name: 'mobile.address',
                  params: { id: tokenTransfer.from },
                }"
                >{{ tokenTransfer.from }}</router-link
              ></q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Recipient:</q-item-label>
            <q-item-label
              ><router-link
                :to="{
                  name: 'mobile.address',
                  params: { id: tokenTransfer.to },
                }"
                >{{ tokenTransfer.to }}</router-link
              ></q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue';
import { useSearchManager } from '@appvise/search-manager';
import { formattedTokenAmount, timeToGo } from '@koiner/utils';
import { TokenOperationsOnChainSearchProvider } from '@koiner/tokenize/components/operation/search/token-operations-on-chain-search-provider';

export default defineComponent({
  methods: {
    formattedTokenAmount,
    timeToGo,
  },
  name: 'TokensTransferredView',
  setup(props) {
    const searchManager = useSearchManager('tokenOperations');
    const onChainProvider = new TokenOperationsOnChainSearchProvider();

    const executeTokenOperationsSearch = async () => {
      const request = {
        first: 30,
        filter: {
          AND: [
            {
              OR: [{ transactionId: { equals: props.transactionId } }],
            },
          ],
        },
      };

      if (props.live) {
        await onChainProvider.search(request);
      } else {
        await searchManager.search(request);
      }
    };

    watch(
      () => props.transactionId,
      async (newId) => {
        if (newId) {
          await executeTokenOperationsSearch();
        }
      }
    );

    onMounted(() => {
      executeTokenOperationsSearch();
    });

    return {
      tokenTransfer: computed(() => {
        let edges;

        if (props.live) {
          edges = onChainProvider.state.connection.value?.edges;
        } else {
          edges = searchManager.state.connection.value?.edges;
        }

        return edges && edges.length === 1 && edges[0].node.name === 'transfer'
          ? edges[0].node
          : undefined;
      }),
    };
  },

  props: {
    transactionId: {
      required: true,
      type: String,
    },
    live: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
});
</script>
