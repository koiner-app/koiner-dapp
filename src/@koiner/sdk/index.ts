import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Address = {
  __typename?: 'Address';
  blockRewardBalances: BlockRewardBalancesConnection;
  blockRewards: BlockRewardsConnection;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  isProducer: Scalars['Boolean'];
  tokenBalances: TokenBalancesConnection;
  tokenOperations: TokenOperationsConnection;
  transactions: TransactionsConnection;
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};


export type AddressBlockRewardBalancesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<BlockRewardBalancesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlockRewardBalancesSortInput>>;
};


export type AddressBlockRewardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<BlockRewardsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlockRewardsSortInput>>;
};


export type AddressTokenBalancesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenBalancesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenBalancesSortInput>>;
};


export type AddressTokenOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenOperationsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenOperationsSortInput>>;
};


export type AddressTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TransactionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TransactionsSortInput>>;
};

export type AddressEdge = {
  __typename?: 'AddressEdge';
  cursor: Scalars['String'];
  node: Address;
};

export type AddressesConnection = {
  __typename?: 'AddressesConnection';
  edges: Array<AddressEdge>;
  nodes: Array<Address>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AddressesFilter = {
  AND?: InputMaybe<Array<AddressesFilter>>;
  OR?: InputMaybe<Array<AddressesFilter>>;
  id?: InputMaybe<StringFilter>;
  isProducer?: InputMaybe<BooleanFilter>;
};

/** Sort field */
export enum AddressesSortField {
  CreatedAt = 'createdAt'
}

export type AddressesSortInput = {
  direction: Direction;
  field: AddressesSortField;
};

export type Block = {
  __typename?: 'Block';
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  header: BlockHeader;
  height: Scalars['Int'];
  id: Scalars['String'];
  receipt: BlockReceipt;
  reward?: Maybe<BlockReward>;
  signature: Scalars['String'];
  transactionCount: Scalars['Int'];
  transactions: TransactionsConnection;
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};


export type BlockTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TransactionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TransactionsSortInput>>;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String'];
  node: Block;
};

export type BlockHeader = {
  __typename?: 'BlockHeader';
  height: Scalars['Int'];
  previous: Scalars['String'];
  previousStateMerkleRoot?: Maybe<Scalars['String']>;
  signer: Scalars['String'];
  timestamp: Scalars['Float'];
  transactionMerkleRoot?: Maybe<Scalars['String']>;
};

export type BlockReceipt = {
  __typename?: 'BlockReceipt';
  computeBandwidthUsed: Scalars['Int'];
  diskStorageUsed: Scalars['Int'];
  eventCount: Scalars['Int'];
  networkBandwidthUsed: Scalars['Int'];
};

export type BlockReward = {
  __typename?: 'BlockReward';
  blockHeight: Scalars['Float'];
  contract?: Maybe<TokenContract>;
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  height: Scalars['Float'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  producer?: Maybe<Address>;
  producerId: Scalars['String'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type BlockRewardBalance = {
  __typename?: 'BlockRewardBalance';
  addressId: Scalars['String'];
  balance: Scalars['Float'];
  contract: TokenContract;
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type BlockRewardBalanceEdge = {
  __typename?: 'BlockRewardBalanceEdge';
  cursor: Scalars['String'];
  node: BlockRewardBalance;
};

export type BlockRewardBalancesConnection = {
  __typename?: 'BlockRewardBalancesConnection';
  edges: Array<BlockRewardBalanceEdge>;
  nodes: Array<BlockRewardBalance>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlockRewardBalancesFilter = {
  AND?: InputMaybe<Array<BlockRewardBalancesFilter>>;
  OR?: InputMaybe<Array<BlockRewardBalancesFilter>>;
  addressId?: InputMaybe<StringFilter>;
  balance?: InputMaybe<StringFilter>;
  contractId?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum BlockRewardBalancesSortField {
  Balance = 'balance',
  CreatedAt = 'createdAt'
}

export type BlockRewardBalancesSortInput = {
  direction: Direction;
  field: BlockRewardBalancesSortField;
};

export type BlockRewardEdge = {
  __typename?: 'BlockRewardEdge';
  cursor: Scalars['String'];
  node: BlockReward;
};

export type BlockRewardsConnection = {
  __typename?: 'BlockRewardsConnection';
  edges: Array<BlockRewardEdge>;
  nodes: Array<BlockReward>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlockRewardsFilter = {
  AND?: InputMaybe<Array<BlockRewardsFilter>>;
  OR?: InputMaybe<Array<BlockRewardsFilter>>;
  blockHeight?: InputMaybe<NumericFilter>;
  contractId?: InputMaybe<StringFilter>;
  producerId?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum BlockRewardsSortField {
  BlockHeight = 'blockHeight',
  CreatedAt = 'createdAt'
}

export type BlockRewardsSortInput = {
  direction: Direction;
  field: BlockRewardsSortField;
};

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  nodes: Array<Block>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlocksFilter = {
  AND?: InputMaybe<Array<BlocksFilter>>;
  OR?: InputMaybe<Array<BlocksFilter>>;
  height?: InputMaybe<NumericFilter>;
  id?: InputMaybe<StringFilter>;
  signer?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
  transactionCount?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum BlocksSortField {
  Height = 'height',
  Id = 'id'
}

export type BlocksSortInput = {
  direction: Direction;
  field: BlocksSortField;
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
};

export type Contract = {
  __typename?: 'Contract';
  abi?: Maybe<Scalars['String']>;
  contractStandardType?: Maybe<ContractStandardType>;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type ContractEdge = {
  __typename?: 'ContractEdge';
  cursor: Scalars['String'];
  node: Contract;
};

export type ContractOperation = {
  __typename?: 'ContractOperation';
  args: Scalars['String'];
  contractId: Scalars['String'];
  contractStandardType?: Maybe<ContractStandardType>;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  details?: Maybe<ContractOperationDetailsUnion>;
  entryPoint: Scalars['Float'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  transactionId: Scalars['String'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type ContractOperationDetailsUnion = TokenOperation;

export type ContractOperationEdge = {
  __typename?: 'ContractOperationEdge';
  cursor: Scalars['String'];
  node: ContractOperation;
};

export type ContractOperationsConnection = {
  __typename?: 'ContractOperationsConnection';
  edges: Array<ContractOperationEdge>;
  nodes: Array<ContractOperation>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ContractOperationsFilter = {
  AND?: InputMaybe<Array<ContractOperationsFilter>>;
  OR?: InputMaybe<Array<ContractOperationsFilter>>;
  contractId?: InputMaybe<StringFilter>;
  entryPoint?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum ContractOperationsSortField {
  CreatedAt = 'createdAt'
}

export type ContractOperationsSortInput = {
  direction: Direction;
  field: ContractOperationsSortField;
};

/** Token Standard type */
export enum ContractStandardType {
  Token = 'token'
}

export type ContractsConnection = {
  __typename?: 'ContractsConnection';
  edges: Array<ContractEdge>;
  nodes: Array<Contract>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ContractsFilter = {
  AND?: InputMaybe<Array<ContractsFilter>>;
  OR?: InputMaybe<Array<ContractsFilter>>;
  id?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum ContractsSortField {
  CreatedAt = 'createdAt'
}

export type ContractsSortInput = {
  direction: Direction;
  field: ContractsSortField;
};

/** Sort direction */
export enum Direction {
  Asc = 'asc',
  Desc = 'desc'
}

export type Event = {
  __typename?: 'Event';
  contractId?: Maybe<Scalars['String']>;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  data: Scalars['String'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  impacted?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  sequence: Scalars['Float'];
  transactionId: Scalars['String'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String'];
  node: Event;
};

export type EventsConnection = {
  __typename?: 'EventsConnection';
  edges: Array<EventEdge>;
  nodes: Array<Event>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type EventsFilter = {
  AND?: InputMaybe<Array<EventsFilter>>;
  OR?: InputMaybe<Array<EventsFilter>>;
  contractId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  impacted?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  sequence?: InputMaybe<NumericFilter>;
  transactionId?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum EventsSortField {
  CreatedAt = 'createdAt'
}

export type EventsSortInput = {
  direction: Direction;
  field: EventsSortField;
};

export type NumericFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
};

export type Operation = {
  __typename?: 'Operation';
  blockHeight: Scalars['Float'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  details?: Maybe<OperationDetailsUnion>;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  index: Scalars['Float'];
  transactionId: Scalars['String'];
  type: OperationType;
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type OperationDetailsUnion = SystemCallOperation | SystemContractOperation | UploadContractOperation;

export type OperationEdge = {
  __typename?: 'OperationEdge';
  cursor: Scalars['String'];
  node: Operation;
};

/** Operation type */
export enum OperationType {
  ContractOperation = 'contractOperation',
  SystemCall = 'systemCall',
  SystemContract = 'systemContract',
  UploadContract = 'uploadContract'
}

export type OperationsConnection = {
  __typename?: 'OperationsConnection';
  edges: Array<OperationEdge>;
  nodes: Array<Operation>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type OperationsFilter = {
  AND?: InputMaybe<Array<OperationsFilter>>;
  OR?: InputMaybe<Array<OperationsFilter>>;
  blockHeight?: InputMaybe<NumericFilter>;
  id?: InputMaybe<StringFilter>;
  operationIndex?: InputMaybe<NumericFilter>;
  transactionId?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum OperationsSortField {
  CreatedAt = 'createdAt',
  Id = 'id'
}

export type OperationsSortInput = {
  direction: Direction;
  field: OperationsSortField;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  address: Address;
  addresses: AddressesConnection;
  addressesBulk: Array<Address>;
  block: Block;
  blockReward: BlockReward;
  blockRewardBalance: BlockRewardBalance;
  blockRewardBalances: BlockRewardBalancesConnection;
  blockRewards: BlockRewardsConnection;
  blockRewardsBulk: Array<BlockReward>;
  blocks: BlocksConnection;
  contract: Contract;
  contractOperation: ContractOperation;
  contractOperations: ContractOperationsConnection;
  contracts: ContractsConnection;
  event: Event;
  events: EventsConnection;
  operation: Operation;
  operations: OperationsConnection;
  tokenBalance: TokenBalance;
  tokenBalances: TokenBalancesConnection;
  tokenContract: TokenContract;
  tokenContracts: TokenContractsConnection;
  tokenOperation: TokenOperation;
  tokenOperations: TokenOperationsConnection;
  transaction: Transaction;
  transactions: TransactionsConnection;
};


export type QueryAddressArgs = {
  id: Scalars['ID'];
};


export type QueryAddressesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AddressesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<AddressesSortInput>>;
};


export type QueryAddressesBulkArgs = {
  first?: InputMaybe<Scalars['Int']>;
  ids: Array<Scalars['String']>;
};


export type QueryBlockArgs = {
  height: Scalars['ID'];
};


export type QueryBlockRewardArgs = {
  height: Scalars['ID'];
};


export type QueryBlockRewardBalanceArgs = {
  id: Scalars['ID'];
};


export type QueryBlockRewardBalancesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<BlockRewardBalancesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlockRewardBalancesSortInput>>;
};


export type QueryBlockRewardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<BlockRewardsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlockRewardsSortInput>>;
};


export type QueryBlockRewardsBulkArgs = {
  first?: InputMaybe<Scalars['Int']>;
  heights?: InputMaybe<Array<Scalars['Int']>>;
  producerIds?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryBlocksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<BlocksFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlocksSortInput>>;
};


export type QueryContractArgs = {
  id: Scalars['ID'];
};


export type QueryContractOperationArgs = {
  id: Scalars['ID'];
};


export type QueryContractOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ContractOperationsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ContractOperationsSortInput>>;
};


export type QueryContractsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ContractsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ContractsSortInput>>;
};


export type QueryEventArgs = {
  id: Scalars['ID'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<EventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<EventsSortInput>>;
};


export type QueryOperationArgs = {
  id: Scalars['ID'];
};


export type QueryOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<OperationsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<OperationsSortInput>>;
};


export type QueryTokenBalanceArgs = {
  id: Scalars['ID'];
};


export type QueryTokenBalancesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenBalancesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenBalancesSortInput>>;
};


export type QueryTokenContractArgs = {
  id: Scalars['ID'];
};


export type QueryTokenContractsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenContractsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenContractsSortInput>>;
};


export type QueryTokenOperationArgs = {
  id: Scalars['ID'];
};


export type QueryTokenOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenOperationsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenOperationsSortInput>>;
};


export type QueryTransactionArgs = {
  id: Scalars['ID'];
};


export type QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TransactionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TransactionsSortInput>>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  excludes?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  blockCreated: Block;
  blockRewardCreated: BlockReward;
};

export type SystemCallOperation = {
  __typename?: 'SystemCallOperation';
  callId: Scalars['Float'];
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type SystemContractOperation = {
  __typename?: 'SystemContractOperation';
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  systemContract: Scalars['Boolean'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type TokenBalance = {
  __typename?: 'TokenBalance';
  addressId: Scalars['String'];
  balance: Scalars['Float'];
  contract: TokenContract;
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type TokenBalanceEdge = {
  __typename?: 'TokenBalanceEdge';
  cursor: Scalars['String'];
  node: TokenBalance;
};

export type TokenBalancesConnection = {
  __typename?: 'TokenBalancesConnection';
  edges: Array<TokenBalanceEdge>;
  nodes: Array<TokenBalance>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TokenBalancesFilter = {
  AND?: InputMaybe<Array<TokenBalancesFilter>>;
  OR?: InputMaybe<Array<TokenBalancesFilter>>;
  addressId?: InputMaybe<StringFilter>;
  balance?: InputMaybe<StringFilter>;
  contractId?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum TokenBalancesSortField {
  Balance = 'balance',
  CreatedAt = 'createdAt'
}

export type TokenBalancesSortInput = {
  direction: Direction;
  field: TokenBalancesSortField;
};

export type TokenContract = {
  __typename?: 'TokenContract';
  balances: TokenBalancesConnection;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  decimals: Scalars['Float'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  name: Scalars['String'];
  operations: TokenOperationsConnection;
  symbol: Scalars['String'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};


export type TokenContractBalancesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenBalancesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenBalancesSortInput>>;
};


export type TokenContractOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenOperationsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenOperationsSortInput>>;
};

export type TokenContractEdge = {
  __typename?: 'TokenContractEdge';
  cursor: Scalars['String'];
  node: TokenContract;
};

export type TokenContractsConnection = {
  __typename?: 'TokenContractsConnection';
  edges: Array<TokenContractEdge>;
  nodes: Array<TokenContract>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TokenContractsFilter = {
  AND?: InputMaybe<Array<TokenContractsFilter>>;
  OR?: InputMaybe<Array<TokenContractsFilter>>;
  name?: InputMaybe<StringFilter>;
  symbol?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum TokenContractsSortField {
  CreatedAt = 'createdAt'
}

export type TokenContractsSortInput = {
  direction: Direction;
  field: TokenContractsSortField;
};

export type TokenOperation = {
  __typename?: 'TokenOperation';
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  from?: Maybe<Scalars['String']>;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  name: Scalars['String'];
  to: Scalars['String'];
  transactionId: Scalars['String'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type TokenOperationEdge = {
  __typename?: 'TokenOperationEdge';
  cursor: Scalars['String'];
  node: TokenOperation;
};

export type TokenOperationsConnection = {
  __typename?: 'TokenOperationsConnection';
  edges: Array<TokenOperationEdge>;
  nodes: Array<TokenOperation>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TokenOperationsFilter = {
  AND?: InputMaybe<Array<TokenOperationsFilter>>;
  OR?: InputMaybe<Array<TokenOperationsFilter>>;
  contractId?: InputMaybe<StringFilter>;
  from?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  to?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum TokenOperationsSortField {
  CreatedAt = 'createdAt'
}

export type TokenOperationsSortInput = {
  direction: Direction;
  field: TokenOperationsSortField;
};

export type Transaction = {
  __typename?: 'Transaction';
  blockHeight: Scalars['Float'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  header: TransactionHeader;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  index: Scalars['Float'];
  operationCount: Scalars['Float'];
  operations: Array<Operation>;
  signature: Scalars['String'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  cursor: Scalars['String'];
  node: Transaction;
};

export type TransactionHeader = {
  __typename?: 'TransactionHeader';
  nonce?: Maybe<Scalars['String']>;
  operationMerkleRoot?: Maybe<Scalars['String']>;
  payer: Scalars['String'];
  rcLimit: Scalars['String'];
};

export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  edges: Array<TransactionEdge>;
  nodes: Array<Transaction>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TransactionsFilter = {
  AND?: InputMaybe<Array<TransactionsFilter>>;
  OR?: InputMaybe<Array<TransactionsFilter>>;
  blockHeight?: InputMaybe<NumericFilter>;
  id?: InputMaybe<StringFilter>;
  nonce?: InputMaybe<StringFilter>;
  operationCount?: InputMaybe<NumericFilter>;
  payer?: InputMaybe<StringFilter>;
  rcLimit?: InputMaybe<StringFilter>;
  transactionIndex?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum TransactionsSortField {
  CreatedAt = 'createdAt',
  Id = 'id'
}

export type TransactionsSortInput = {
  direction: Direction;
  field: TransactionsSortField;
};

export type UploadContractOperation = {
  __typename?: 'UploadContractOperation';
  abi?: Maybe<Scalars['String']>;
  bytecode: Scalars['String'];
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type BlocksSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<BlocksFilter>;
  sort?: InputMaybe<Array<BlocksSortInput> | BlocksSortInput>;
}>;


export type BlocksSearchQuery = { __typename?: 'Query', blocks: { __typename?: 'BlocksConnection', totalCount: number, edges: Array<{ __typename: 'BlockEdge', cursor: string, node: { __typename?: 'Block', id: string, transactionCount: number, header: { __typename?: 'BlockHeader', height: number, previous: string, timestamp: number, previousStateMerkleRoot?: string | null, signer: string }, reward?: { __typename?: 'BlockReward', value: number, producerId: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };


export const BlocksSearchDocument = gql`
    query BlocksSearch($after: String, $before: String, $first: Int, $filter: BlocksFilter, $sort: [BlocksSortInput!]) {
  blocks(
    after: $after
    before: $before
    first: $first
    filter: $filter
    sort: $sort
  ) {
    totalCount
    edges {
      cursor
      node {
        id
        header {
          height
          previous
          timestamp
          previousStateMerkleRoot
          signer
        }
        reward {
          value
          producerId
        }
        transactionCount
      }
      __typename
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
    `;

export function useBlocksSearchQuery(options: Omit<Urql.UseQueryArgs<never, BlocksSearchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BlocksSearchQuery>({ query: BlocksSearchDocument, ...options });
};