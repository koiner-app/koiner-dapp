import { boot } from 'quasar/wrappers';
import searchClient from '@appvise/search-manager';
import { AddressesSearchProvider } from '@koiner/chain/address/search/addresses-search-provider';
import { BlocksSearchProvider } from '@koiner/chain/block/search/blocks-search-provider';
import { BlocksGlobalSearchProvider } from '@koiner/chain/block/search/blocks-global-search-provider';
import { BlocksHomeSearchProvider } from '@koiner/chain/block/search/blocks-home-search-provider';
import { EventsSearchProvider } from '@koiner/chain/event/search/events-search-provider';
import { TransactionsSearchProvider } from '@koiner/chain/transaction/search/transactions-search-provider';
import { OperationsSearchProvider } from '@koiner/chain/operation/search/operations-search-provider';
import { ContractsSearchProvider } from '@koiner/contracts/components/contract/search/contracts-search-provider';
import { ContractsWithAbiSearchProvider } from '@koiner/contracts/components/contract/search/contracts-with-abi-search-provider';
import { ContractEventsSearchProvider } from '@koiner/contracts/components/contract/search/contract-events-search-provider';
import { ContractEventsOnChainSearchProvider } from '@koiner/contracts/components/contract/search/contract-events-on-chain-search-provider';
import { ContractOperationsSearchProvider } from '@koiner/contracts/components/contract/search/contract-operations-search-provider';
import { ContractOperationOnChainSearchProvider } from '@koiner/contracts/components/contract/search/contract-operations-on-chain-search-provider';
import { BlockProducersSearchProvider } from '@koiner/network/block-production/search/block-producers-search-provider';
import { BlockRewardsSearchProvider } from '@koiner/network/block-production/search/block-rewards-search-provider';
import { TokenContractsSearchProvider } from '@koiner/tokenize/components//contract/search/token-contract-search-provider';
import { TokenEventsSearchProvider } from '@koiner/tokenize/components//event/search/token-events-search-provider';
import { TokenHoldersSearchProvider } from '@koiner/tokenize/components//holder/search/token-holder-search-provider';
import { TokenEventsOnChainSearchProvider } from '@koiner/tokenize/components/event/search/token-events-on-chain-search-provider';
import { TokenOperationsSearchProvider } from '@koiner/tokenize/components//operation/search/token-operation-search-provider';
import { TokenOperationOnChainSearchProvider } from '@koiner/tokenize/components/operation/search/token-operation-on-chain-search-provider';
import { TransactionsOnChainSearchProvider } from '@koiner/chain/transaction/search/transactions-on-chain-search-provider';

export default boot(({ app }) => {
  app.use(searchClient, {
    providers: {
      // Chain
      addresses: AddressesSearchProvider,
      blocks: BlocksSearchProvider,
      blocksGlobal: BlocksGlobalSearchProvider,
      blocksHome: BlocksHomeSearchProvider,
      events: EventsSearchProvider,
      operations: OperationsSearchProvider,
      transactions: TransactionsSearchProvider,

      // Contracts
      contracts: ContractsSearchProvider,
      contractsWithAbi: ContractsWithAbiSearchProvider,
      contractEvents: ContractEventsSearchProvider,
      contractOperations: ContractOperationsSearchProvider,
      tokenContracts: TokenContractsSearchProvider,
      tokenEvents: TokenEventsSearchProvider,
      tokenHolders: TokenHoldersSearchProvider,
      tokenOperations: TokenOperationsSearchProvider,

      onChainTransactions: TransactionsOnChainSearchProvider,
      onChainContractOperations: ContractOperationOnChainSearchProvider,
      onChainContractEvents: ContractEventsOnChainSearchProvider,
      onChainTokenEvents: TokenEventsOnChainSearchProvider,
      onChainTokenOperations: TokenOperationOnChainSearchProvider,

      // Network
      blockProducers: BlockProducersSearchProvider,
      blockRewards: BlockRewardsSearchProvider,
    },
  });
});
