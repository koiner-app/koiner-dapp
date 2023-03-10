import { Contract, Provider, Signer } from 'koilib';
import { Abi } from 'koilib/lib/interface';
import {
  ContractStandard,
  ContractStandards,
  ContractStandardType,
} from '../index';
import { Contract as KoinerContract } from '@koiner/sdk';
import {
  decodeArgs,
  fetchContractMeta,
  findEntryPoint,
  findEntryPointByTypes,
  potentialTypes,
} from './decoding-utils';
import { koinerConfig } from 'app/koiner.config';

export class ContractDecoder {
  private readonly provider: Provider;
  private readonly signer: Signer;

  constructor() {
    this.provider = new Provider(koinerConfig.production.rpc);
    this.signer = Signer.fromSeed('shizzle');
  }

  async decodeOperation(
    contract: KoinerContract,
    entryPoint: number,
    args: string,
    contractStandardType?: ContractStandardType
  ): Promise<{ name: string; data?: any }> {
    // Use koilib for known token standard (token)
    if (contractStandardType) {
      const contractStandard = await this.findOneByType(contractStandardType);

      const abi = contractStandard.abi as Abi;
      const $contract = new Contract({
        id: contract.id,
        abi,
        provider: this.provider,
        signer: this.signer,
      });

      const data = await $contract.decodeOperation({
        call_contract: {
          contract_id: contract.id,
          entry_point: entryPoint,
          args: args as any,
        },
      });

      return {
        name: data.name,
        data: data.args,
      };
    }

    // Otherwise decode using contract abi
    return this.decodeOperationWithProto(contract, entryPoint, args);
  }

  async findOneByType(type: ContractStandardType): Promise<ContractStandard> {
    const contractStandard = ContractStandards.find(
      (contractStandard) => contractStandard.type === type
    );

    if (contractStandard) {
      return Promise.resolve(contractStandard);
    } else {
      return Promise.reject('Not found');
    }
  }

  async find(): Promise<ContractStandard[]> {
    return Promise.resolve(ContractStandards);
  }

  async decodeOperationWithProto(
    contract: KoinerContract,
    entryPoint: number,
    args: string
  ): Promise<{ name: string; data?: any }> {
    if (contract && contract.abi) {
      try {
        const meta = await fetchContractMeta(contract.abi);

        if (!meta.root || !meta.abi) {
          // console.error('Could not decode args. No root or abi');

          return {
            name: 'unknown',
          };
        }

        const abi = meta.abi;
        const method = findEntryPoint(entryPoint, abi);
        const decoded = decodeArgs(entryPoint, args, abi, meta.root);

        return {
          name: method ?? 'unknown',
          data: decoded,
        };
      } catch (e) {
        // console.error('Could not decode args', e);
      }
    }

    return {
      name: 'unknown',
    };
  }

  async decodeEvent(
    contract: KoinerContract,
    name: string,
    args: string
  ): Promise<{ name: string; entryPoint?: number; data?: any }> {
    const potentialTypes1 = potentialTypes(name);

    if (contract && contract.abi) {
      try {
        const meta = await fetchContractMeta(contract.abi);

        if (!meta.root || !meta.abi) {
          // console.error('Could not decode args. No root or abi');

          return {
            name: 'unknown',
          };
        }

        const abi = meta.abi;
        const entryPoint = findEntryPointByTypes(potentialTypes1, abi);
        const decoded = decodeArgs(entryPoint, args, abi, meta.root);

        return {
          name,
          entryPoint,
          data: decoded,
        };
      } catch (e) {
        // console.error('Could not decode args', e);
      }
    }

    return {
      name: 'unknown',
    };
  }
}
