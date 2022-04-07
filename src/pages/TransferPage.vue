<template>

  <q-page class="row q-pa-lg items-center justify-evenly">
    <q-card class="q-pa-md my-card" style="min-width: 440px">
      <q-card-section>
        <div class="text-h6">Transfer funds</div>
      </q-card-section>
      <q-card-section>
        {{ transferResult }}
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
          v-model="formData.amount"
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
        <q-btn color="primary" @click="transferKoin">Transfer</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { kondor } from 'boot/kondor';
import { Contract, utils } from 'koilib';
import { useAccountStore } from 'stores/account';

function useTransferKoin() {
  const account = useAccountStore();

  const formData = ref({
    from: account.address,
    to: '1Nx1mK3zxJdQts7JX7iSSCa53iFuFvo41k',
    amount: 0,
  });
  const transferResult = ref('');

  async function transferKoin() {
    try {
      // contract definition
      const koin = new Contract({
        id: '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',
        abi: utils.tokenAbi,
        provider: kondor.provider,
        signer: kondor.signer,
      }).functions;

      // transfer
      const { transaction, receipt } = await koin.transfer(
        {
          from: formData.value.from,
          to: formData.value.to,
          value: utils.parseUnits(formData.value.amount.toString(), 8),
        },
        {
          payer: formData.value.from,
        }
      );

      if (transaction) {
        console.log(`transaction ${transaction.id} submitted. Receipt:`);
        console.log(receipt);

        if (receipt!.logs) {
          throw new Error(receipt!.logs.join(', '));
        }

        transferResult.value = `transaction ${
          transaction!.id
        } submitted. Waiting to be mined`;

        // wait to be mined
        const blockNumber = await transaction.wait();
        console.log(`Mined in block ${blockNumber}`);
        transferResult.value = `transaction ${transaction.id} submitted. Mined in block ${blockNumber}`;

        // read the balance
        const { result } = await koin.balanceOf({ owner: formData.value.from });
        console.log(result);
        transferResult.value = `transaction ${transaction.id} submitted. Mined in block ${blockNumber}. New balance ${result.value}`;
      }
    } catch (error: any) {
      transferResult.value = `Error: ${error.message}`;
      console.error(error);
    }
  }

  return { formData, transferResult, transferKoin };
}

export default defineComponent({
  name: 'TransferPage',
  setup() {
    const account = useAccountStore();

    return {
      account,

      ...useTransferKoin(),
    };
  },
});
</script>
