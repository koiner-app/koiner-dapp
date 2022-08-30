import { boot } from 'quasar/wrappers';
import searchClient from '@appvise/search-manager';
import { AddressesSearchProvider } from '@koiner/chain/address/search/addresses-search-provider';
import { BlocksSearchProvider } from '@koiner/chain/block/search/blocks-search-provider';
import { EventsSearchProvider } from '@koiner/chain/event/search/events-search-provider';
import { TransactionsSearchProvider } from '@koiner/chain/transaction/search/transactions-search-provider';
import { OperationsSearchProvider } from '@koiner/chain/operation/search/operations-search-provider';
import { ContractsSearchProvider } from '@koiner/contract/contract/search/contracts-search-provider';
import { ContractOperationsSearchProvider } from '@koiner/contract/contract/search/contract-operations-search-provider';
import { TokenBalancesSearchProvider } from '@koiner/contract/token/search/token-balance-search-provider';
import { TokenContractsSearchProvider } from '@koiner/contract/token/search/token-contract-search-provider';
import { TokenOperationsSearchProvider } from '@koiner/contract/token/search/token-operation-search-provider';

export default boot(({ app }) => {
  app.use(searchClient, {
    providers: {
      // Chain
      addresses: AddressesSearchProvider,
      blocks: BlocksSearchProvider,
      events: EventsSearchProvider,
      operations: OperationsSearchProvider,
      transactions: TransactionsSearchProvider,

      // Contracts
      contracts: ContractsSearchProvider,
      contractOperations: ContractOperationsSearchProvider,
      tokenBalances: TokenBalancesSearchProvider,
      tokenContracts: TokenContractsSearchProvider,
      tokenOperations: TokenOperationsSearchProvider,
    },
  });
});
