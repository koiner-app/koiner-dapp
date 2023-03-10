import { ref } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  ContractOperationsConnection,
  ContractOperationEdge,
  QueryContractOperationsArgs,
  ContractOperationWithDetails,
} from '@koiner/sdk';
import { useOnChainStore } from '@koiner/onchain';

export class ContractOperationOnChainSearchProvider
  implements
    SearchProvider<
      QueryContractOperationsArgs,
      ContractOperationWithDetails,
      ContractOperationEdge,
      ContractOperationsConnection
    >
{
  public _state = SearchState.create<
    QueryContractOperationsArgs,
    ContractOperationWithDetails,
    ContractOperationEdge,
    ContractOperationsConnection
  >();

  constructor() {
    this._state.error = ref();
    this._state.fetching = ref(false);
    this._state.isPaused = ref(false);
  }

  public get state(): SearchState<
    QueryContractOperationsArgs,
    ContractOperationWithDetails,
    ContractOperationEdge,
    ContractOperationsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryContractOperationsArgs
  ): Promise<
    SearchState<
      QueryContractOperationsArgs,
      ContractOperationWithDetails,
      ContractOperationEdge,
      ContractOperationsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise(async (resolve) => {
      if (this._state.isPaused.value) {
        resolve(this._state);
      }

      let transactionId;

      request.filter?.AND?.forEach((filter) => {
        if (filter.transactionId?.equals) {
          transactionId = filter.transactionId?.equals;
        }
      });

      if (transactionId) {
        const onChainStore = useOnChainStore();

        const contractOperations =
          onChainStore.contractOperationsByTransaction(transactionId);

        if (contractOperations) {
          this._state.connection.value = contractOperations;
          this._state.isPaused.value = true;
        }
      }

      resolve(this._state);
    });
  }
}
