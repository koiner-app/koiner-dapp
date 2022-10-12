import { boot } from 'quasar/wrappers';
import searchClient from '@appvise/search-manager';
import { AddressesSearchProvider } from '@koiner/chain/components/address/search/addresses-search-provider';
import { BlocksSearchProvider } from '@koiner/chain/components/block/search/blocks-search-provider';
import { BlocksHomeSearchProvider } from '@koiner/chain/components/block/search/blocks-home-search-provider';
import { EventsSearchProvider } from '@koiner/chain/components/event/search/events-search-provider';
import { TransactionsSearchProvider } from '@koiner/chain/components/transaction/search/transactions-search-provider';
import { OperationsSearchProvider } from '@koiner/chain/components/operation/search/operations-search-provider';
import { ContractsSearchProvider } from '@koiner/contracts/components/contract/search/contracts-search-provider';
import { ContractEventsSearchProvider } from '@koiner/contracts/components/contract/search/contract-events-search-provider';
import { ContractOperationsSearchProvider } from '@koiner/contracts/components/contract/search/contract-operations-search-provider';
import { BlockProducersSearchProvider } from '@koiner/network/components/block-production/search/block-producers-search-provider';
import { BlockRewardsSearchProvider } from '@koiner/network/components/block-production/search/block-rewards-search-provider';
import { TokenContractsSearchProvider } from '@koiner/tokenize/components//contract/search/token-contract-search-provider';
import { TokenEventsSearchProvider } from '@koiner/tokenize/components//event/search/token-events-search-provider';
import { TokenHoldersSearchProvider } from '@koiner/tokenize/components//holder/search/token-holder-search-provider';
import { TokenOperationsSearchProvider } from '@koiner/tokenize/components//operation/search/token-operation-search-provider';

export default boot(({ app }) => {
  app.use(searchClient, {
    providers: {
      // Chain
      addresses: AddressesSearchProvider,
      blocks: BlocksSearchProvider,
      blocksHome: BlocksHomeSearchProvider,
      events: EventsSearchProvider,
      operations: OperationsSearchProvider,
      transactions: TransactionsSearchProvider,

      // Contracts
      contracts: ContractsSearchProvider,
      contractEvents: ContractEventsSearchProvider,
      contractOperations: ContractOperationsSearchProvider,
      tokenContracts: TokenContractsSearchProvider,
      tokenEvents: TokenEventsSearchProvider,
      tokenHolders: TokenHoldersSearchProvider,
      tokenOperations: TokenOperationsSearchProvider,

      // Network
      blockProducers: BlockProducersSearchProvider,
      blockRewards: BlockRewardsSearchProvider,
    },
  });
});
