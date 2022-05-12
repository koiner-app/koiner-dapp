import { Contract, utils } from 'koilib';
import { kondor } from 'boot/kondor';
import { Notify } from 'quasar';

export interface TokenTransferInput {
  contractId: string;
  from: string;
  to: string;
  value: string;
  payer: string;
}

export async function transferTokenTokens(input: TokenTransferInput) {
  try {
    const koin = new Contract({
      id: input.contractId,
      abi: utils.tokenAbi,
      provider: kondor.provider,
      signer: kondor.signer,
    }).functions;

    const { transaction, receipt } = await koin.transfer(
      {
        from: input.from,
        to: input.to,
        value: utils.parseUnits(input.value.toString(), 8),
      },
      {
        payer: input.payer,
      }
    );

    if (transaction) {
      console.log(`transaction ${transaction.id} submitted. Receipt:`);
      console.log(receipt);

      if (receipt!.logs) {
        throw new Error(receipt!.logs.join(', '));
      }

      // message: t('abk.iam.form.userSettings.messages.error'),
      Notify.create(
        `Transaction ${transaction!.id} submitted. Waiting to be mined`
      );

      // transferResult.value = `transaction ${transaction!.id} submitted. Waiting to be mined`;

      // wait to be mined
      const blockNumber = await transaction.wait();
      console.log(`Mined in block ${blockNumber}`);

      Notify.create(
        `transaction ${transaction.id} submitted. Mined in block ${blockNumber}`
      );

      // transferResult.value = `transaction ${transaction.id} submitted. Mined in block ${blockNumber}`;

      // read the balance
      const { result } = await koin.balanceOf({ owner: input.from });
      console.log(result);

      Notify.create(
        `transaction ${
          transaction.id
        } submitted. Mined in block ${blockNumber}. New balance ${
          result!.value
        }`
      );

      // transferResult.value = `transaction ${transaction.id} submitted. Mined in block ${blockNumber}. New balance ${result.value}`;
    }
  } catch (error: any) {
    // transferResult.value = `Error: ${error.message}`;
    Notify.create({
      message: `Error: ${error.message}`,
      type: 'negative',
    });

    console.error(error);
  }
}
