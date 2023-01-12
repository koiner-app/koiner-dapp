<template>
  <q-btn
    class="show-love-button"
    label="Donate"
    target="_blank"
    flat
    dense
    size="md"
    color="accent"
    @click="dialog = true"
    ><q-icon name="favorite_border"
  /></q-btn>

  <q-dialog
    v-model="dialog"
    transition-show="fade-in"
    transition-hide="fade-out"
  >
    <q-card
      style="width: 700px; max-width: 80vw; max-height: 80vh"
    >
      <q-bar>
        <span class="text-caption">Donate</span>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pt-lg">
        <q-input
          dense
          standout
          autofocus
          v-model="formData.from"
          label="Your address"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Please enter address of your account',
          ]"
        />

        <q-input

          dense
          standout
          v-model="formData.to"
          label="Recipient address"
          placeholder="Recipient address"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Please enter address of recipient',
          ]"
        />

        <q-input

          dense
          standout
          type="number"
          v-model="formData.value"
          label="Amount *"
          placeholder="1000"
          hint="Insert the amount you want to transfer"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please enter the amount for your transfer',
          ]"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat @click="dialog = false">Cancel</q-btn>
        <q-btn color="primary" @click="executeTransfer">Donate</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import posthog from 'posthog-js';
import {
  TokenTransferInput,
  transferTokenTokens,
} from '@koiner/contracts/components/calls/transfer';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'DonateDialog',
  props: {
    openDialog: {
      required: false,
      type: Boolean,
    },
    mobile: {
      required: false,
      type: Boolean,
    },
  },
  emits: ['closed'],

  setup(props, { emit }) {
    const koinerStore = useKoinerStore();

    const dialog = ref(false);

    watch(
      props,
      () => {
        if (props.openDialog) {
          dialog.value = true;
        }
      },
      { deep: true }
    );

    watch(dialog, (newValue) => {
      if (!newValue) {
        emit('closed');
      }
    });

    const formData: Ref<TokenTransferInput> = ref({
      contractId: koinerStore.koinContract.id,
      from: '',
      to: koinerStore.koinerAddress,
      value: '',
      payer: koinerStore.koinerAddress,
    });

    const executeTransfer = () => {
      posthog.capture('donate', { property: formData.value });

      transferTokenTokens(formData.value);
    };

    return {
      formData,
      dialog,
      executeTransfer,
    };
  },
});
</script>

<style lang="scss">
.btn-search-dialog {
  .q-icon.on-left {
    margin-right: 0.25rem;
    font-size: 0.75rem;
  }
}

.q-dialog .q-item__section--side .favorite-icon {
  color: yellow !important;
}
.q-dialog {
  .q-card__section > .text-caption {
    padding-bottom: 0.5rem;
    display: inline-block;
  }
  .q-list > .q-item,
  .q-item {
    min-height: 32px;
    padding: 2px 16px;
  }
  .favorite-icon .q-icon {
    padding: 0.25rem 1rem;
  }
}
</style>
