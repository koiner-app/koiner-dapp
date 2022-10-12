<template>
  <q-page class="row q-pa-lg items-center justify-evenly">
    <q-card class="q-pa-md table-card" style="min-width: 440px">
      <q-card-section>
        <div class="text-h6">Transfer funds</div>
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="formData.from"
          label="Your address"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Please enter address of your account',
          ]"
        />

        <q-input
          filled
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
          filled
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
        <q-btn flat :to="'/'">Cancel</q-btn>
        <q-btn color="primary" @click="executeTransfer">Transfer</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useAccountStore } from 'stores/account';
import {
  TokenTransferInput,
  transferTokenTokens,
} from '@koiner/contracts/components/calls/transfer';

export default defineComponent({
  name: 'TransferPage',
  setup() {
    const account = useAccountStore();

    const formData: Ref<TokenTransferInput> = ref({
      contractId: '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',
      from: account.address,
      to: '1Nx1mK3zxJdQts7JX7iSSCa53iFuFvo41k',
      value: '',
      payer: account.address,
    });

    const executeTransfer = () => {
      transferTokenTokens(formData.value);
    };

    return {
      formData,
      account,

      executeTransfer,
    };
  },
});
</script>
