import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import {
  BlockEdge,
  BlockHeader,
  Contract as KoinerContract,
  ContractEventEdge,
  ContractEventsConnection,
  ContractOperationEdge,
  ContractOperationsConnection,
  TokenContract,
  TokenEventEdge,
  TokenEventsConnection,
  TokenOperationEdge,
  TokenOperationsConnection,
  TransactionEdge,
  TransactionHeader,
} from '@koiner/sdk';
import {
  ContractDecoder,
  ContractStandardType,
} from '@koiner/onchain/contract-decoder';
import { Provider } from 'koilib';
import { TransactionJson } from 'koilib/lib/interface';
import { RawBlock } from '@koiner/onchain/raw-block';
import { koinerConfig } from 'app/koiner.config';
import { Direction } from '@appvise/search-manager';
import { ContractsSearchProvider } from '@koiner/contracts/components/contract/search/contracts-search-provider';
import { TokenContractsSearchProvider } from '@koiner/tokenize/components/contract/search/token-contract-search-provider';

export const useOnChainStore = defineStore({
  id: 'onChain',
  state: () => ({
    environment: 'production' as 'production' | 'test' | 'local',
    production: {
      blocks: new Map<
        string,
        {
          edge: BlockEdge;
          raw: RawBlock;
        }
      >(),
      transactions: new Map<
        string,
        {
          edge: TransactionEdge;
          raw: TransactionJson;
          blockIds: string[];
        }
      >(),
      contracts: new Map<string, KoinerContract>(),
      contractEvents: new Map<string, ContractEventsConnection>(),
      contractOperations: new Map<string, ContractOperationsConnection>(),
      tokenContracts: new Map<string, TokenContract>(),
      tokenEvents: new Map<string, TokenEventsConnection>(),
      tokenOperations: new Map<string, TokenOperationsConnection>(),
    },
    test: {
      blocks: new Map<
        string,
        {
          edge: BlockEdge;
          raw: RawBlock;
        }
      >(),
      transactions: new Map<
        string,
        {
          edge: TransactionEdge;
          raw: TransactionJson;
          blockIds: string[];
        }
      >(),
      contracts: new Map<string, KoinerContract>(),
      contractEvents: new Map<string, ContractEventsConnection>(),
      contractOperations: new Map<string, ContractOperationsConnection>(),
      tokenContracts: new Map<string, TokenContract>(),
      tokenEvents: new Map<string, TokenEventsConnection>(),
      tokenOperations: new Map<string, TokenOperationsConnection>(),
    },
    local: {
      blocks: new Map<
        string,
        {
          edge: BlockEdge;
          raw: RawBlock;
        }
      >(),
      transactions: new Map<
        string,
        {
          edge: TransactionEdge;
          raw: TransactionJson;
          blockIds: string[];
        }
      >(),
      contracts: new Map<string, KoinerContract>(),
      contractEvents: new Map<string, ContractEventsConnection>(),
      contractOperations: new Map<string, ContractOperationsConnection>(),
      tokenContracts: new Map<string, TokenContract>(),
      tokenEvents: new Map<string, TokenEventsConnection>(),
      tokenOperations: new Map<string, TokenOperationsConnection>(),
    },
  }),
  getters: {
    rpcUrl: (state): string => {
      if (state.environment === 'local') {
        return koinerConfig.local.rpc;
      }

      if (state.environment === 'test') {
        return koinerConfig.test.rpc;
      }

      return koinerConfig.production.rpc;
    },
    block: (state) => {
      return (id: string) => state[state.environment].blocks.get(id);
    },
    blocks: (state) => state[state.environment].blocks,
    contract: (state) => {
      return (id: string) => state[state.environment].contracts.get(id);
    },
    contracts: (state) => state[state.environment].contracts,
    contractEvents: (state) => state[state.environment].contractEvents,
    contractEventsByTransaction: (state) => {
      return (transactionId: string) =>
        state[state.environment].contractEvents.get(transactionId);
    },
    contractOperations: (state) => state[state.environment].contractOperations,
    contractOperationsByTransaction: (state) => {
      return (transactionId: string) =>
        state[state.environment].contractOperations.get(transactionId);
    },
    transaction: (state) => {
      return (id: string) => state[state.environment].transactions.get(id);
    },
    transactions: (state) => state[state.environment].transactions,
    tokenContract: (state) => {
      return (id: string) => state[state.environment].tokenContracts.get(id);
    },
    tokenContracts: (state) => state[state.environment].tokenContracts,
    tokenEvents: (state) => state[state.environment].tokenEvents,
    tokenEventsByTransaction: (state) => {
      return (transactionId: string) =>
        state[state.environment].tokenEvents.get(transactionId);
    },
    tokenOperations: (state) => state[state.environment].tokenOperations,
    tokenOperationsByTransaction: (state) => {
      return (transactionId: string) =>
        state[state.environment].tokenOperations.get(transactionId);
    },
  },
  actions: {
    load(environment: 'production' | 'test' | 'local') {
      this.$patch({
        environment: environment,
      });
    },

    async loadBlock(blockId: string) {
      const block = this.block(blockId);

      if (!block) {
        const provider = new Provider([this.rpcUrl]);

        const blocks = await provider.call<{
          block_items: RawBlock[];
        }>('block_store.get_blocks_by_id', {
          block_ids: [blockId],
          return_block: true,
          return_receipt: true,
        });

        if (blocks.block_items.length > 0) {
          const block = blocks.block_items[0];

          this.blocks.set(blockId, {
            raw: block,
            edge: {
              cursor: block.block_id,
              node: {
                createdAt: '',
                events: {
                  edges: [],
                  nodes: [],
                  totalCount: 0,
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                },
                header: {
                  height: Number(block.block.header?.height),
                  previous: block.block.header?.previous,
                  previousStateMerkleRoot: block.block.header?.previous,
                  signer: block.block.header?.signer,
                  timestamp: Number(block.block.header?.timestamp),
                  transactionMerkleRoot:
                    block.block.header?.transaction_merkle_root,
                } as BlockHeader,
                height: Number(block.block.header?.height),
                id: block.block_id,
                receipt: {
                  diskStorageUsed: block.receipt.disk_storage_used ?? '0',
                  networkBandwidthUsed:
                    block.receipt.network_bandwidth_used ?? '0',
                  computeBandwidthUsed:
                    block.receipt.compute_bandwidth_used ?? '0',
                  eventCount: block.receipt.events
                    ? block.receipt.events.length
                    : 0,
                },
                reward: undefined,
                signature: <string>block.block.signature,
                transactionCount: block.block.transactions
                  ? block.block.transactions.length
                  : 0,
                transactions: {
                  edges: [],
                  nodes: [],
                  totalCount: 0,
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                },
                updatedAt: '',
              },
            } as BlockEdge,
          });

          // TODO: Save transactions
          //
        }
      }
    },

    async loadTransaction(
      transactionId: string,
      contractsSearch: ContractsSearchProvider,
      tokenContractsSearch: TokenContractsSearchProvider
    ) {
      const transaction = this.transaction(transactionId);

      if (!transaction) {
        const provider = new Provider([this.rpcUrl]);

        try {
          const { transactions } = await provider.getTransactionsById([
            transactionId,
          ]);

          const transaction = transactions[0];

          if (
            transaction?.transaction.operations &&
            transaction?.transaction.operations.length > 0 &&
            transaction.containing_blocks.length > 0
          ) {
            const blockId = transaction.containing_blocks[0];

            await this.loadBlock(blockId);

            const block = this.block(blockId);

            console.log({ txBlock: block });

            if (block) {
              const receipt = block.raw.receipt.transaction_receipts.find(
                (receipt) => receipt.id
              );

              if (receipt) {
                console.log({
                  receipt,
                });
                this.transactions.set(transactionId, {
                  raw: transaction.transaction,
                  blockIds: transaction.containing_blocks,
                  edge: {
                    cursor: transactionId,
                    node: {
                      blockHeight: block.edge.node.height,
                      events: {
                        edges: [],
                        nodes: [],
                        totalCount: 0,
                        pageInfo: {
                          hasNextPage: false,
                          hasPreviousPage: false,
                        },
                      }, //EventsConnection;
                      header: {
                        nonce: block.edge.node.header.signer,
                        operationMerkleRoot:
                          transaction.transaction.header?.operation_merkle_root,
                        payee: transaction.transaction.header?.payee,
                        payer: transaction.transaction.header?.payer,
                        rcLimit: transaction.transaction.header?.rc_limit,
                      } as TransactionHeader,
                      id: transactionId,
                      index: 0,
                      operationCount: transaction.transaction.operations.length,
                      operations: [],
                      receipt: {
                        payer: receipt.payer,
                        maxPayerRc: receipt.max_payer_rc ?? '0',
                        rcLimit: receipt.rc_limit ?? '0',
                        rcUsed: receipt.rc_used ?? '0',
                        reverted: receipt.reverted ?? false,
                        diskStorageUsed: receipt.disk_storage_used ?? '0',
                        networkBandwidthUsed:
                          receipt.network_bandwidth_used ?? '0',
                        computeBandwidthUsed:
                          receipt.compute_bandwidth_used ?? '0',
                        eventCount: receipt.events ? receipt.events.length : 0,
                      },
                      signatures: [],
                      timestamp: Date.now() - 60000, //block.edge.node.header.timestamp,
                      createdAt: '',
                      updatedAt: '',
                    },
                  },
                });
              }

              await this.loadContractEventsByTransaction(
                transactionId,
                contractsSearch,
                tokenContractsSearch
              );

              await this.loadContractOperationsByTransaction(
                transactionId,
                contractsSearch,
                tokenContractsSearch
              );
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    },

    async loadContractOperationsByTransaction(
      transactionId: string,
      contractsSearch: ContractsSearchProvider,
      tokenContractsSearch: TokenContractsSearchProvider
    ) {
      const contractDecoder = new ContractDecoder();

      const transaction = this.transaction(transactionId);

      const contractOperations = {
        edges: [] as ContractOperationEdge[],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
        },
        totalCount: 0,
      } as ContractOperationsConnection;

      const tokenOperations = {
        edges: [] as TokenOperationEdge[],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
        },
        totalCount: 0,
      } as TokenOperationsConnection;

      if (
        transaction?.raw.operations &&
        transaction?.raw.operations.length > 0 &&
        transaction.blockIds.length > 0
      ) {
        for (const operation of transaction?.raw.operations) {
          if (operation.call_contract) {
            const contractId = operation.call_contract.contract_id;

            await this.loadContract(contractId, contractsSearch);
            const contract = this.contract(contractId);

            if (contract) {
              const decodedOperation = await contractDecoder.decodeOperation(
                contract,
                operation.call_contract.entry_point,
                operation.call_contract.args,
                contract.contractStandardType
                  ? (contract.contractStandardType.toString() as ContractStandardType)
                  : undefined
              );

              if (decodedOperation) {
                /**
                 * Token operations
                 */
                if (contract.contractStandardType === 'token') {
                  await this.loadTokenContract(
                    contractId,
                    tokenContractsSearch
                  );

                  const tokenContract = this.tokenContract(contractId);

                  if (tokenContract) {
                    // Add to token operations
                    tokenOperations.edges.push({
                      cursor: transactionId,
                      node: {
                        from: decodedOperation.data.from,
                        to: decodedOperation.data.to,
                        value: decodedOperation.data.value,
                        name: decodedOperation.name,
                        transactionId,
                        blockHeight: transaction.edge.node.blockHeight,
                        timestamp: transaction.edge.node.timestamp,
                        contractId: operation.call_contract.contract_id,
                        id: tokenContract.id,
                        createdAt: tokenContract.createdAt,
                        updatedAt: tokenContract.updatedAt,
                        contract: {
                          id: contract.id,
                          name: tokenContract.name,
                          symbol: tokenContract.symbol,
                          decimals: tokenContract.decimals,
                          totalSupply: tokenContract.totalSupply,
                          burnCount: tokenContract.burnCount,
                          mintCount: tokenContract.mintCount,
                          transferCount: tokenContract.transferCount,
                          holders: tokenContract.holders as any,
                          operations: tokenContract.operations as any,
                          timestamp: tokenContract.timestamp,
                          updatedAt: tokenContract.updatedAt,
                          createdAt: tokenContract.createdAt,
                        },
                      },
                    });
                  }

                  tokenOperations.totalCount += 1;
                } else {
                  /**
                   * Contract operations
                   */
                  contractOperations.edges.push({
                    cursor: transactionId,
                    node: {
                      blockHeight: transaction.edge.node.blockHeight,
                      contract: {
                        id: contract.id,
                        abi: contract.abi,
                        timestamp: contract.timestamp,
                        updatedAt: '',
                        createdAt: '',
                      },
                      contractId: operation.call_contract.contract_id,
                      contractStandardType: contract.contractStandardType,
                      data: decodedOperation.data,
                      entryPoint: operation.call_contract.entry_point,
                      id: '',
                      name: decodedOperation.name,
                      timestamp: transaction.edge.node.timestamp,
                      transactionId,
                      updatedAt: '',
                      createdAt: '',
                    },
                  });

                  contractOperations.totalCount += 1;
                }
              }
            }
          }
        }
      }

      this.contractOperations.set(transactionId, contractOperations);
      this.tokenOperations.set(transactionId, tokenOperations);
    },

    async loadContractEventsByTransaction(
      transactionId: string,
      contractsSearch: ContractsSearchProvider,
      tokenContractsSearch: TokenContractsSearchProvider
    ) {
      const contractDecoder = new ContractDecoder();

      const transaction = this.transaction(transactionId);

      if (!transaction || transaction?.blockIds.length < 1) {
        return;
      }

      const block = await this.block(transaction.blockIds[0]);

      if (!block?.raw.receipt) {
        return;
      }

      const txReceipt = block.raw.receipt?.transaction_receipts.find(
        (txReceipt) => txReceipt.id === transactionId
      );

      const contractEvents = {
        edges: [] as ContractEventEdge[],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
        },
        totalCount: 0,
      } as ContractEventsConnection;

      const tokenEvents = {
        edges: [] as TokenEventEdge[],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
        },
        totalCount: 0,
      } as TokenEventsConnection;

      if (txReceipt && Array.isArray(txReceipt.events)) {
        for (
          let eventIndex = 0;
          eventIndex < txReceipt.events.length;
          eventIndex++
        ) {
          const transactionEvent = txReceipt.events[eventIndex];

          if (transactionEvent.source) {
            let contractStandardType = undefined;

            await this.loadContract(transactionEvent.source, contractsSearch);
            const contract = this.contract(transactionEvent.source);

            if (contract) {
              contractStandardType = contract.contractStandardType;

              if (contract.contractStandardType === 'token') {
                /**
                 * Token events
                 */
                // Ignore invalid events
                if (!transactionEvent.data) {
                  return;
                }

                await this.loadTokenContract(contract.id, tokenContractsSearch);

                const tokenContract = this.tokenContract(contract.id);

                if (tokenContract) {
                  let entryPoint = 0x27f576ca;

                  if (transactionEvent.name.includes('transfer')) {
                    entryPoint = 0x27f576ca;
                  } else if (transactionEvent.name.includes('mint')) {
                    entryPoint = 0xdc6f17bb;
                  } else if (transactionEvent.name.includes('burn')) {
                    entryPoint = 0x859facc5;
                  }

                  const decodedEvent = await contractDecoder.decodeOperation(
                    contract,
                    entryPoint,
                    transactionEvent.data,
                    ContractStandardType.token
                  );

                  const edge: TokenEventEdge = {
                    cursor: '123',
                    node: {
                      id: '123',
                      blockHeight: block.edge.node.height,
                      parentId: transactionId,
                      parentType: 'transaction',
                      name: decodedEvent.name,
                      from: <string>decodedEvent.data.from,
                      to: <string>decodedEvent.data.to,
                      value: <string>decodedEvent.data.value,
                      contract: {
                        id: contract.id,
                        name: tokenContract.name,
                        symbol: tokenContract.symbol,
                        decimals: tokenContract.decimals,
                        totalSupply: tokenContract.totalSupply,
                        burnCount: tokenContract.burnCount,
                        mintCount: tokenContract.mintCount,
                        transferCount: tokenContract.transferCount,
                        holders: tokenContract.holders as any,
                        operations: tokenContract.operations as any,
                        timestamp: tokenContract.timestamp,
                        updatedAt: tokenContract.updatedAt,
                        createdAt: tokenContract.createdAt,
                      } as TokenContract,
                      timestamp: block.edge.node.header.timestamp,
                      updatedAt: block.edge.node.updatedAt,
                      createdAt: block.edge.node.createdAt,
                    },
                  };

                  tokenEvents.edges.push(edge);
                  tokenEvents.totalCount += 1;
                }
              } else {
                /**
                 * Contract events
                 */
                try {
                  const decodedOperation = await contractDecoder.decodeEvent(
                    contract,
                    transactionEvent.name,
                    transactionEvent.data
                  );

                  const edge: ContractEventEdge = {
                    cursor: '',
                    node: {
                      id: '123',
                      blockHeight: block.edge.node.height,
                      parentId: transactionId,
                      parentType: 'transaction',
                      sequence: transactionEvent.sequence,
                      contractId: transactionEvent.source,
                      impacted: transactionEvent.impacted
                        ? transactionEvent.impacted.filter(
                            (impactedItem) => impactedItem !== '' // Filter out empty items
                          )
                        : [],
                      timestamp: block.edge.node.header.timestamp,
                      contractStandardType,
                      name: decodedOperation.name,
                      data: transactionEvent.data,
                      decodedData: decodedOperation.data,
                      contract: {
                        id: contract.id,
                        abi: contract.abi,
                        timestamp: contract.timestamp,
                        updatedAt: contract.updatedAt,
                        createdAt: contract.createdAt,
                      },
                      updatedAt: block.edge.node.updatedAt,
                      createdAt: block.edge.node.createdAt,
                    },
                  };

                  contractEvents.edges.push(edge);
                  contractEvents.totalCount += 1;
                } catch (error) {
                  console.log('decoded error', error);
                }
              }
            }
          }
        }
      }

      console.log({
        contractEvents,
        tokenEvents,
      });

      this.contractEvents.set(transactionId, contractEvents);
      this.tokenEvents.set(transactionId, tokenEvents);
    },

    async loadContract(
      contractId: string,
      contractsSearch: ContractsSearchProvider
    ): Promise<void> {
      if (this.contract(contractId)) {
        return;
      }

      const request: any = {
        first: 1,
        filter: {
          id: { equals: contractId },
        },
        sort: [{ field: 'timestamp', direction: Direction.Asc }],
      };

      const state = contractsSearch.state;
      await contractsSearch.search(request);

      // Manually trigger search
      state.isPaused.value = true;
      state.isPaused.value = false;

      // Watch state because we need results right away
      const watchState = ref(false);

      watch(
        () => state.connection.value,
        () => {
          watchState.value = true;
        },
        { deep: true }
      );

      return await new Promise<void>((resolve) => {
        const finalize = () => {
          if (
            state.connection &&
            state.connection.value?.edges &&
            state.connection.value?.edges?.length > 0 &&
            state.connection.value?.edges[0].node
          ) {
            const contract = state.connection.value.edges[0].node;
            this.contracts.set(contract.id, contract);
            resolve();
          }
        };

        if (watchState.value) {
          finalize();
        } else {
          const unwatch = watch(watchState, (newVal) => {
            if (newVal) {
              unwatch();
              finalize();
            }
          });
        }
      });
    },

    async loadTokenContract(
      contractId: string,
      tokenContractsSearch: TokenContractsSearchProvider
    ): Promise<void> {
      if (this.tokenContract(contractId)) {
        return;
      }

      const request: any = {
        first: 1,
        filter: {
          id: { equals: contractId },
        },
        sort: [{ field: 'timestamp', direction: Direction.Asc }],
      };

      const state = tokenContractsSearch.state;
      await tokenContractsSearch.search(request);

      // Manually trigger search
      state.isPaused.value = true;
      state.isPaused.value = false;

      // Watch state because we need results right away
      const watchState = ref(false);

      watch(
        () => state.connection.value,
        () => {
          watchState.value = true;
        },
        { deep: true }
      );

      return await new Promise<void>((resolve) => {
        const finalize = () => {
          if (
            state.connection &&
            state.connection.value?.edges &&
            state.connection.value?.edges?.length > 0 &&
            state.connection.value?.edges[0].node
          ) {
            const contract = state.connection.value.edges[0].node;
            this.tokenContracts.set(contract.id, contract);
            resolve();
          }
        };

        if (watchState.value) {
          finalize();
        } else {
          const unwatch = watch(watchState, (newVal) => {
            if (newVal) {
              unwatch();
              finalize();
            }
          });
        }
      });
    },

    reset() {
      this.$patch({
        environment: 'production',
        production: {
          blocks: new Map<
            string,
            {
              edge: BlockEdge;
              raw: RawBlock;
            }
          >(),
          transactions: new Map<
            string,
            {
              edge: TransactionEdge;
              raw: TransactionJson;
              blockIds: string[];
            }
          >(),
          contracts: new Map<string, KoinerContract>(),
          contractEvents: new Map<string, ContractEventsConnection>(),
          contractOperations: new Map<string, ContractOperationsConnection>(),
          tokenContracts: new Map<string, TokenContract>(),
          tokenEvents: new Map<string, TokenEventsConnection>(),
          tokenOperations: new Map<string, TokenOperationsConnection>(),
        },
        test: {
          blocks: new Map<
            string,
            {
              edge: BlockEdge;
              raw: RawBlock;
            }
          >(),
          transactions: new Map<
            string,
            {
              edge: TransactionEdge;
              raw: TransactionJson;
              blockIds: string[];
            }
          >(),
          contracts: new Map<string, KoinerContract>(),
          contractEvents: new Map<string, ContractEventsConnection>(),
          contractOperations: new Map<string, ContractOperationsConnection>(),
          tokenContracts: new Map<string, TokenContract>(),
          tokenEvents: new Map<string, TokenEventsConnection>(),
          tokenOperations: new Map<string, TokenOperationsConnection>(),
        },
        local: {
          blocks: new Map<
            string,
            {
              edge: BlockEdge;
              raw: RawBlock;
            }
          >(),
          transactions: new Map<
            string,
            {
              edge: TransactionEdge;
              raw: TransactionJson;
              blockIds: string[];
            }
          >(),
          contracts: new Map<string, KoinerContract>(),
          contractEvents: new Map<string, ContractEventsConnection>(),
          contractOperations: new Map<string, ContractOperationsConnection>(),
          tokenContracts: new Map<string, TokenContract>(),
          tokenEvents: new Map<string, TokenEventsConnection>(),
          tokenOperations: new Map<string, TokenOperationsConnection>(),
        },
      });
    },
  },
});
