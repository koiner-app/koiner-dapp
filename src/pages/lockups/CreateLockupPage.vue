<template>
  <q-page class="row q-pa-lg items-center justify-evenly">
    <q-card class="q-pa-md table-card" style="min-width: 440px">
      <q-card-section>
        <div class="text-h6">Lockup tokens</div>
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="formData.sender"
          label="Your address"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Please enter address of your account',
          ]"
        />

        <q-input
          filled
          v-model="formData.beneficiary"
          label="Beneficiary address"
          placeholder="Beneficiary address"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Please enter address of beneficiary',
          ]"
        />

        <q-input
          filled
          v-model="formData.tokenAddress"
          label="Token address"
          placeholder="Token address"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Please enter address of token you want to lockup',
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
              'Please enter the amount for your lockup',
          ]"
        />

        <q-input
          filled
          type="number"
          v-model="formData.releaseTime"
          label="Release time *"
          hint="Epoch timestamp when tokens should be released"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please enter the release time for your lockup',
          ]"
        />

        {{ transferResult }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :to="'/'">Cancel</q-btn>
        <q-btn color="primary" @click="lockTokens">Lock</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { kondor } from 'boot/kondor';
import { Contract, utils } from 'koilib';
import { useAccountStore } from 'stores/account';
import { smartLockerAbi } from './smart_locker.abi';

function useLockTokens() {
  const account = useAccountStore();

  const formData = ref({
    sender: account.address,
    beneficiary: '1Nx1mK3zxJdQts7JX7iSSCa53iFuFvo41k',
    tokenAddress: '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',
    amount: 0,
    releaseTime: Date.now() + 3600,
  });
  const transferResult = ref('');

  async function lockTokens() {
    try {
      // contract definition
      const smartLocker = new Contract({
        id: '1DhkxuJNmTjLwxjVSVoHu8LWdr2xqqpgdF',
        abi: smartLockerAbi,
        provider: kondor.provider,
        signer: kondor.signer,
      }).functions;

      const { transaction, receipt } = await smartLocker.lock(
        {
          beneficiary: formData.value.beneficiary,
          sender: formData.value.sender,
          tokenAddress: formData.value.tokenAddress,
          value: utils.parseUnits(formData.value.amount.toString(), 8),
          releaseTime: formData.value.releaseTime,
        },
        {
          payer: account.address,
        }
      );

      if (transaction) {
        console.log(`transaction ${transaction.id} submitted. Receipt:`);
        console.log(receipt);

        // Ignore for now. Contract still return logs for debugging
        // if (receipt!.logs) {
        //   throw new Error(receipt!.logs.join(', '));
        // }

        transferResult.value = `transaction ${
          transaction!.id
        } submitted. Waiting to be mined`;

        // wait to be mined
        const blockNumber = await transaction.wait();
        console.log(`Mined in block ${blockNumber}`);
        transferResult.value = `transaction ${transaction.id} submitted. Mined in block ${blockNumber}`;

        // read the balance
        // const { result } = await koin.balanceOf({ owner: formData.value.from });
        // console.log(result);
        // transferResult.value = `transaction ${transaction.id} submitted. Mined in block ${blockNumber}. New balance ${result.value}`;
      }
    } catch (error: any) {
      transferResult.value = `Error: ${error.message}`;
      console.error(error);
    }
  }

  return { formData, transferResult, lockTokens };
}

export default defineComponent({
  name: 'CreateLockupPage',
  setup() {
    const account = useAccountStore();

    return {
      account,

      ...useLockTokens(),
    };
  },
});
</script>
