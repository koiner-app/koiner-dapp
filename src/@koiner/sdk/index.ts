import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Address = {
  __typename?: 'Address';
  blockProducers: BlockProducersConnection;
  blockRewards: BlockRewardsConnection;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  isContract: Scalars['Boolean'];
  isProducer: Scalars['Boolean'];
  isTokenContract: Scalars['Boolean'];
  timestamp: Scalars['BigInt'];
  tokenOperations: TokenOperationsConnection;
  tokens: TokenHoldersConnection;
  transactions: TransactionsConnection;
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type AddressBlockProducersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<BlockProducersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlockProducersSortInput>>;
};

export type AddressBlockRewardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<BlockRewardsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlockRewardsSortInput>>;
};

export type AddressTokenOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenOperationsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenOperationsSortInput>>;
};

export type AddressTokensArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenHoldersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenHoldersSortInput>>;
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
  isContract?: InputMaybe<BooleanFilter>;
  isProducer?: InputMaybe<BooleanFilter>;
  isTokenContract?: InputMaybe<BooleanFilter>;
  search?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum AddressesSortField {
  Timestamp = 'timestamp',
}

export type AddressesSortInput = {
  direction: Direction;
  field: AddressesSortField;
};

export type Block = {
  __typename?: 'Block';
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  events: EventsConnection;
  header: BlockHeader;
  height: Scalars['BigInt'];
  id: Scalars['String'];
  receipt: BlockReceipt;
  reward?: Maybe<BlockReward>;
  signature: Scalars['String'];
  transactionCount: Scalars['Int'];
  transactions: TransactionsConnection;
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type BlockEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<EventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<EventsSortInput>>;
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
  height: Scalars['BigInt'];
  previous: Scalars['String'];
  previousStateMerkleRoot?: Maybe<Scalars['String']>;
  signer: Scalars['String'];
  timestamp: Scalars['BigInt'];
  transactionMerkleRoot?: Maybe<Scalars['String']>;
};

export type BlockProducer = {
  __typename?: 'BlockProducer';
  address: Address;
  addressId: Scalars['String'];
  balance: Scalars['Float'];
  blocksProduced: Scalars['Float'];
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type BlockProducerEdge = {
  __typename?: 'BlockProducerEdge';
  cursor: Scalars['String'];
  node: BlockProducer;
};

export type BlockProducersConnection = {
  __typename?: 'BlockProducersConnection';
  edges: Array<BlockProducerEdge>;
  nodes: Array<BlockProducer>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlockProducersFilter = {
  AND?: InputMaybe<Array<BlockProducersFilter>>;
  OR?: InputMaybe<Array<BlockProducersFilter>>;
  addressId?: InputMaybe<StringFilter>;
  balance?: InputMaybe<NumericFilter>;
  blocksProduced?: InputMaybe<NumericFilter>;
  contractId?: InputMaybe<StringFilter>;
  search?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum BlockProducersSortField {
  Balance = 'balance',
  BlocksProduced = 'blocksProduced',
  CreatedAt = 'createdAt',
}

export type BlockProducersSortInput = {
  direction: Direction;
  field: BlockProducersSortField;
};

export type BlockReceipt = {
  __typename?: 'BlockReceipt';
  computeBandwidthUsed: Scalars['BigInt'];
  diskStorageUsed: Scalars['BigInt'];
  eventCount: Scalars['Int'];
  networkBandwidthUsed: Scalars['BigInt'];
};

export type BlockReward = {
  __typename?: 'BlockReward';
  blockHeight: Scalars['Float'];
  burnedContractId?: Maybe<Scalars['String']>;
  burnedValue?: Maybe<Scalars['Float']>;
  burner?: Maybe<Address>;
  burnerId?: Maybe<Scalars['String']>;
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  height: Scalars['Float'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  producer: BlockProducer;
  producerAddress?: Maybe<Address>;
  producerId: Scalars['String'];
  roi?: Maybe<Scalars['Float']>;
  timestamp: Scalars['Float'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type BlockRewardBulkResult = {
  __typename?: 'BlockRewardBulkResult';
  item?: Maybe<BlockReward>;
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
  burnedValue?: InputMaybe<NumericFilter>;
  burnerId?: InputMaybe<StringFilter>;
  producerId?: InputMaybe<StringFilter>;
  roi?: InputMaybe<NumericFilter>;
  search?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
  value?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum BlockRewardsSortField {
  BlockHeight = 'blockHeight',
  Timestamp = 'timestamp',
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
  search?: InputMaybe<StringFilter>;
  signer?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
  transactionCount?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum BlocksSortField {
  Height = 'height',
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
  timestamp: Scalars['Float'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type ContractBulkResult = {
  __typename?: 'ContractBulkResult';
  item?: Maybe<Contract>;
};

export type ContractEdge = {
  __typename?: 'ContractEdge';
  cursor: Scalars['String'];
  node: Contract;
};

export type ContractEvent = {
  __typename?: 'ContractEvent';
  blockHeight: Scalars['Int'];
  contract: Contract;
  contractId?: Maybe<Scalars['String']>;
  contractStandardType?: Maybe<ContractStandardType>;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  data?: Maybe<Scalars['String']>;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  impacted?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  parentId: Scalars['String'];
  parentType: Scalars['String'];
  sequence?: Maybe<Scalars['Float']>;
  timestamp: Scalars['Float'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type ContractEventEdge = {
  __typename?: 'ContractEventEdge';
  cursor: Scalars['String'];
  node: ContractEvent;
};

export type ContractEventsConnection = {
  __typename?: 'ContractEventsConnection';
  edges: Array<ContractEventEdge>;
  nodes: Array<ContractEvent>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ContractEventsFilter = {
  AND?: InputMaybe<Array<ContractEventsFilter>>;
  OR?: InputMaybe<Array<ContractEventsFilter>>;
  blockHeight?: InputMaybe<NumericFilter>;
  contractId?: InputMaybe<StringFilter>;
  contractStandardType?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  impacted?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  parentId?: InputMaybe<StringFilter>;
  parentType?: InputMaybe<StringFilter>;
  search?: InputMaybe<StringFilter>;
  sequence?: InputMaybe<NumericFilter>;
  timestamp?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum ContractEventsSortField {
  Timestamp = 'timestamp',
}

export type ContractEventsSortInput = {
  direction: Direction;
  field: ContractEventsSortField;
};

export type ContractOperation = {
  __typename?: 'ContractOperation';
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  fields?: Maybe<ContractOperationWithDetails>;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type ContractOperationBulkResult = {
  __typename?: 'ContractOperationBulkResult';
  item?: Maybe<ContractOperationWithDetails>;
};

export type ContractOperationEdge = {
  __typename?: 'ContractOperationEdge';
  cursor: Scalars['String'];
  node: ContractOperationWithDetails;
};

export type ContractOperationWithDetails = {
  __typename?: 'ContractOperationWithDetails';
  args?: Maybe<Scalars['String']>;
  blockHeight: Scalars['Int'];
  contract: Contract;
  contractId: Scalars['String'];
  contractStandardType?: Maybe<ContractStandardType>;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  entryPoint: Scalars['Float'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  timestamp: Scalars['Float'];
  transactionId: Scalars['String'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type ContractOperationsConnection = {
  __typename?: 'ContractOperationsConnection';
  edges: Array<ContractOperationEdge>;
  nodes: Array<ContractOperationWithDetails>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ContractOperationsFilter = {
  AND?: InputMaybe<Array<ContractOperationsFilter>>;
  OR?: InputMaybe<Array<ContractOperationsFilter>>;
  blockHeight?: InputMaybe<NumericFilter>;
  contractId?: InputMaybe<StringFilter>;
  entryPoint?: InputMaybe<NumericFilter>;
  id?: InputMaybe<StringFilter>;
  search?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum ContractOperationsSortField {
  Timestamp = 'timestamp',
}

export type ContractOperationsSortInput = {
  direction: Direction;
  field: ContractOperationsSortField;
};

/** Contract Standard type */
export enum ContractStandardType {
  Token = 'token',
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
  search?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum ContractsSortField {
  Timestamp = 'timestamp',
}

export type ContractsSortInput = {
  direction: Direction;
  field: ContractsSortField;
};

/** Sort direction */
export enum Direction {
  Asc = 'asc',
  Desc = 'desc',
}

export type Event = {
  __typename?: 'Event';
  blockHeight: Scalars['BigInt'];
  contractId?: Maybe<Scalars['String']>;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  data?: Maybe<Scalars['String']>;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  impacted?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  parentId: Scalars['String'];
  parentType: Scalars['String'];
  sequence?: Maybe<Scalars['Int']>;
  timestamp: Scalars['BigInt'];
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
  blockHeight?: InputMaybe<NumericFilter>;
  contractId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  impacted?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  parentId?: InputMaybe<StringFilter>;
  parentType?: InputMaybe<StringFilter>;
  search?: InputMaybe<StringFilter>;
  sequence?: InputMaybe<NumericFilter>;
  timestamp?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum EventsSortField {
  Timestamp = 'timestamp',
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
  blockHeight: Scalars['BigInt'];
  contractOperation?: Maybe<ContractOperationWithDetails>;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  details?: Maybe<OperationDetailsUnion>;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  index: Scalars['Int'];
  timestamp: Scalars['BigInt'];
  transactionId: Scalars['String'];
  type: OperationType;
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type OperationDetailsUnion =
  | ContractOperation
  | SystemCallOperation
  | SystemContractOperation
  | UploadContractOperation;

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
  UploadContract = 'uploadContract',
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
  search?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
  transactionId?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum OperationsSortField {
  Timestamp = 'timestamp',
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
  blockProducer: BlockProducer;
  blockProducers: BlockProducersConnection;
  blockReward: BlockReward;
  blockRewards: BlockRewardsConnection;
  blockRewardsBulk: Array<BlockRewardBulkResult>;
  blocks: BlocksConnection;
  contract: Contract;
  contractEvent: ContractEvent;
  contractEvents: ContractEventsConnection;
  contractOperation: ContractOperationWithDetails;
  contractOperations: ContractOperationsConnection;
  contractOperationsBulk: Array<ContractOperationBulkResult>;
  contracts: ContractsConnection;
  contractsBulk: Array<ContractBulkResult>;
  event: Event;
  events: EventsConnection;
  operation: Operation;
  operations: OperationsConnection;
  tokenContract: TokenContract;
  tokenContracts: TokenContractsConnection;
  tokenEvent: TokenEvent;
  tokenEvents: TokenEventsConnection;
  tokenHolder: TokenHolder;
  tokenHolders: TokenHoldersConnection;
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

export type QueryBlockProducerArgs = {
  id: Scalars['ID'];
};

export type QueryBlockProducersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<BlockProducersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlockProducersSortInput>>;
};

export type QueryBlockRewardArgs = {
  height: Scalars['ID'];
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

export type QueryContractEventArgs = {
  id: Scalars['ID'];
};

export type QueryContractEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ContractEventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ContractEventsSortInput>>;
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

export type QueryContractOperationsBulkArgs = {
  first?: InputMaybe<Scalars['Int']>;
  ids: Array<Scalars['String']>;
};

export type QueryContractsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ContractsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ContractsSortInput>>;
};

export type QueryContractsBulkArgs = {
  first?: InputMaybe<Scalars['Int']>;
  ids: Array<Scalars['String']>;
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

export type QueryTokenEventArgs = {
  id: Scalars['ID'];
};

export type QueryTokenEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenEventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenEventsSortInput>>;
};

export type QueryTokenHolderArgs = {
  id: Scalars['ID'];
};

export type QueryTokenHoldersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenHoldersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenHoldersSortInput>>;
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
  iContains?: InputMaybe<Scalars['String']>;
};

export type SystemCallOperation = {
  __typename?: 'SystemCallOperation';
  callId: Scalars['Int'];
  contract: Contract;
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
  contract: Contract;
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  systemContract: Scalars['Boolean'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type TokenContract = {
  __typename?: 'TokenContract';
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  decimals: Scalars['Float'];
  holders: TokenHoldersConnection;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  name: Scalars['String'];
  operations: TokenOperationsConnection;
  symbol: Scalars['String'];
  timestamp: Scalars['Float'];
  totalSupply: Scalars['Float'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type TokenContractHoldersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TokenHoldersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TokenHoldersSortInput>>;
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
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  search?: InputMaybe<StringFilter>;
  symbol?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
  totalSupply?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum TokenContractsSortField {
  Timestamp = 'timestamp',
}

export type TokenContractsSortInput = {
  direction: Direction;
  field: TokenContractsSortField;
};

export type TokenEvent = {
  __typename?: 'TokenEvent';
  contract: TokenContract;
  contractId?: Maybe<Scalars['String']>;
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  from?: Maybe<Scalars['String']>;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  name: Scalars['String'];
  timestamp: Scalars['Float'];
  to?: Maybe<Scalars['String']>;
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type TokenEventEdge = {
  __typename?: 'TokenEventEdge';
  cursor: Scalars['String'];
  node: TokenEvent;
};

export type TokenEventsConnection = {
  __typename?: 'TokenEventsConnection';
  edges: Array<TokenEventEdge>;
  nodes: Array<TokenEvent>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TokenEventsFilter = {
  AND?: InputMaybe<Array<TokenEventsFilter>>;
  OR?: InputMaybe<Array<TokenEventsFilter>>;
  contractId?: InputMaybe<StringFilter>;
  from?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  search?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
  to?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum TokenEventsSortField {
  Timestamp = 'timestamp',
}

export type TokenEventsSortInput = {
  direction: Direction;
  field: TokenEventsSortField;
};

export type TokenHolder = {
  __typename?: 'TokenHolder';
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

export type TokenHolderEdge = {
  __typename?: 'TokenHolderEdge';
  cursor: Scalars['String'];
  node: TokenHolder;
};

export type TokenHoldersConnection = {
  __typename?: 'TokenHoldersConnection';
  edges: Array<TokenHolderEdge>;
  nodes: Array<TokenHolder>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TokenHoldersFilter = {
  AND?: InputMaybe<Array<TokenHoldersFilter>>;
  OR?: InputMaybe<Array<TokenHoldersFilter>>;
  addressId?: InputMaybe<StringFilter>;
  balance?: InputMaybe<NumericFilter>;
  contractId?: InputMaybe<StringFilter>;
  search?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum TokenHoldersSortField {
  Balance = 'balance',
}

export type TokenHoldersSortInput = {
  direction: Direction;
  field: TokenHoldersSortField;
};

export type TokenOperation = {
  __typename?: 'TokenOperation';
  contract: TokenContract;
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  from?: Maybe<Scalars['String']>;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  name: Scalars['String'];
  timestamp: Scalars['Float'];
  to?: Maybe<Scalars['String']>;
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
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  search?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
  to?: InputMaybe<StringFilter>;
  transactionId?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

/** Sort field */
export enum TokenOperationsSortField {
  Timestamp = 'timestamp',
}

export type TokenOperationsSortInput = {
  direction: Direction;
  field: TokenOperationsSortField;
};

export type Transaction = {
  __typename?: 'Transaction';
  blockHeight: Scalars['BigInt'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  events: EventsConnection;
  header: TransactionHeader;
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  index: Scalars['Int'];
  operationCount: Scalars['Int'];
  operations: Array<Operation>;
  signature: Scalars['String'];
  timestamp: Scalars['BigInt'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type TransactionEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<EventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<EventsSortInput>>;
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
  search?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<NumericFilter>;
  transactionIndex?: InputMaybe<NumericFilter>;
};

/** Sort field */
export enum TransactionsSortField {
  Timestamp = 'timestamp',
}

export type TransactionsSortInput = {
  direction: Direction;
  field: TransactionsSortField;
};

export type UploadContractOperation = {
  __typename?: 'UploadContractOperation';
  abi?: Maybe<Scalars['String']>;
  bytecode: Scalars['String'];
  contract: Contract;
  contractId: Scalars['String'];
  /** Timestamp as to when this entity was created */
  createdAt: Scalars['DateTime'];
  /** Globally unique identifier for this entity */
  id: Scalars['ID'];
  /** Timestamp as to when this entity was last updated */
  updatedAt: Scalars['DateTime'];
};

export type AddressesSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<AddressesFilter>;
  sort?: InputMaybe<Array<AddressesSortInput> | AddressesSortInput>;
}>;

export type AddressesSearchQuery = {
  __typename?: 'Query';
  addresses: {
    __typename?: 'AddressesConnection';
    edges: Array<{
      __typename: 'AddressEdge';
      cursor: string;
      node: {
        __typename?: 'Address';
        id: string;
        isProducer: boolean;
        isContract: boolean;
        isTokenContract: boolean;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type BlocksHomeSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}>;

export type BlocksHomeSearchQuery = {
  __typename?: 'Query';
  blocks: {
    __typename?: 'BlocksConnection';
    edges: Array<{
      __typename: 'BlockEdge';
      cursor: string;
      node: {
        __typename?: 'Block';
        id: string;
        transactionCount: number;
        header: { __typename?: 'BlockHeader'; height: any; timestamp: any };
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type BlocksSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<BlocksFilter>;
  sort?: InputMaybe<Array<BlocksSortInput> | BlocksSortInput>;
}>;

export type BlocksSearchQuery = {
  __typename?: 'Query';
  blocks: {
    __typename?: 'BlocksConnection';
    edges: Array<{
      __typename: 'BlockEdge';
      cursor: string;
      node: {
        __typename?: 'Block';
        id: string;
        transactionCount: number;
        header: {
          __typename?: 'BlockHeader';
          height: any;
          previous: string;
          timestamp: any;
          previousStateMerkleRoot?: string | null;
          signer: string;
        };
        reward?: {
          __typename?: 'BlockReward';
          value: number;
          producerId: string;
          burnedValue?: number | null;
        } | null;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type EventsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<EventsFilter>;
  sort?: InputMaybe<Array<EventsSortInput> | EventsSortInput>;
}>;

export type EventsSearchQuery = {
  __typename?: 'Query';
  events: {
    __typename?: 'EventsConnection';
    edges: Array<{
      __typename: 'EventEdge';
      cursor: string;
      node: {
        __typename?: 'Event';
        id: string;
        blockHeight: any;
        parentId: string;
        parentType: string;
        sequence?: number | null;
        contractId?: string | null;
        name: string;
        data?: string | null;
        impacted?: Array<string> | null;
        timestamp: any;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type OperationsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<OperationsFilter>;
  sort?: InputMaybe<Array<OperationsSortInput> | OperationsSortInput>;
}>;

export type OperationsSearchQuery = {
  __typename?: 'Query';
  operations: {
    __typename?: 'OperationsConnection';
    edges: Array<{
      __typename: 'OperationEdge';
      cursor: string;
      node: {
        __typename?: 'Operation';
        id: string;
        blockHeight: any;
        transactionId: string;
        type: OperationType;
        timestamp: any;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type TransactionsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<TransactionsFilter>;
  sort?: InputMaybe<Array<TransactionsSortInput> | TransactionsSortInput>;
}>;

export type TransactionsSearchQuery = {
  __typename?: 'Query';
  transactions: {
    __typename?: 'TransactionsConnection';
    edges: Array<{
      __typename: 'TransactionEdge';
      cursor: string;
      node: {
        __typename?: 'Transaction';
        id: string;
        blockHeight: any;
        operationCount: number;
        timestamp: any;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type ContractEventsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<ContractEventsFilter>;
  sort?: InputMaybe<Array<ContractEventsSortInput> | ContractEventsSortInput>;
}>;

export type ContractEventsSearchQuery = {
  __typename?: 'Query';
  contractEvents: {
    __typename?: 'ContractEventsConnection';
    edges: Array<{
      __typename: 'ContractEventEdge';
      cursor: string;
      node: {
        __typename?: 'ContractEvent';
        id: string;
        blockHeight: number;
        contractId?: string | null;
        contractStandardType?: ContractStandardType | null;
        impacted?: Array<string> | null;
        name: string;
        parentType: string;
        parentId: string;
        timestamp: number;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type ContractOperationsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<ContractOperationsFilter>;
  sort?: InputMaybe<
    Array<ContractOperationsSortInput> | ContractOperationsSortInput
  >;
}>;

export type ContractOperationsSearchQuery = {
  __typename?: 'Query';
  contractOperations: {
    __typename?: 'ContractOperationsConnection';
    edges: Array<{
      __typename: 'ContractOperationEdge';
      cursor: string;
      node: {
        __typename?: 'ContractOperationWithDetails';
        id: string;
        blockHeight: number;
        contractId: string;
        transactionId: string;
        contractStandardType?: ContractStandardType | null;
        timestamp: number;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type ContractsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<ContractsFilter>;
  sort?: InputMaybe<Array<ContractsSortInput> | ContractsSortInput>;
}>;

export type ContractsSearchQuery = {
  __typename?: 'Query';
  contracts: {
    __typename?: 'ContractsConnection';
    edges: Array<{
      __typename: 'ContractEdge';
      cursor: string;
      node: {
        __typename?: 'Contract';
        id: string;
        contractStandardType?: ContractStandardType | null;
        timestamp: number;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type BlockProducersSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<BlockProducersFilter>;
  sort?: InputMaybe<Array<BlockProducersSortInput> | BlockProducersSortInput>;
}>;

export type BlockProducersSearchQuery = {
  __typename?: 'Query';
  blockProducers: {
    __typename?: 'BlockProducersConnection';
    edges: Array<{
      __typename: 'BlockProducerEdge';
      cursor: string;
      node: {
        __typename?: 'BlockProducer';
        id: string;
        addressId: string;
        balance: number;
        blocksProduced: number;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type BlockRewardsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<BlockRewardsFilter>;
  sort?: InputMaybe<Array<BlockRewardsSortInput> | BlockRewardsSortInput>;
}>;

export type BlockRewardsSearchQuery = {
  __typename?: 'Query';
  blockRewards: {
    __typename?: 'BlockRewardsConnection';
    edges: Array<{
      __typename: 'BlockRewardEdge';
      cursor: string;
      node: {
        __typename?: 'BlockReward';
        id: string;
        blockHeight: number;
        value: number;
        producerId: string;
        burnedValue?: number | null;
        timestamp: number;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type TokenContractsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<TokenContractsFilter>;
  sort?: InputMaybe<Array<TokenContractsSortInput> | TokenContractsSortInput>;
}>;

export type TokenContractsSearchQuery = {
  __typename?: 'Query';
  tokenContracts: {
    __typename?: 'TokenContractsConnection';
    edges: Array<{
      __typename: 'TokenContractEdge';
      cursor: string;
      node: {
        __typename?: 'TokenContract';
        id: string;
        name: string;
        symbol: string;
        decimals: number;
        totalSupply: number;
        timestamp: number;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type TokenEventsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<TokenEventsFilter>;
  sort?: InputMaybe<Array<TokenEventsSortInput> | TokenEventsSortInput>;
}>;

export type TokenEventsSearchQuery = {
  __typename?: 'Query';
  tokenEvents: {
    __typename?: 'TokenEventsConnection';
    edges: Array<{
      __typename: 'TokenEventEdge';
      cursor: string;
      node: {
        __typename?: 'TokenEvent';
        id: string;
        from?: string | null;
        to?: string | null;
        value: number;
        name: string;
        timestamp: number;
        contract: {
          __typename?: 'TokenContract';
          id: string;
          name: string;
          symbol: string;
          decimals: number;
        };
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type TokenHoldersSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<TokenHoldersFilter>;
  sort?: InputMaybe<Array<TokenHoldersSortInput> | TokenHoldersSortInput>;
}>;

export type TokenHoldersSearchQuery = {
  __typename?: 'Query';
  tokenHolders: {
    __typename?: 'TokenHoldersConnection';
    edges: Array<{
      __typename: 'TokenHolderEdge';
      cursor: string;
      node: {
        __typename?: 'TokenHolder';
        id: string;
        addressId: string;
        contractId: string;
        balance: number;
        contract: {
          __typename?: 'TokenContract';
          id: string;
          name: string;
          decimals: number;
          symbol: string;
        };
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type TokenOperationsSearchQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<TokenOperationsFilter>;
  sort?: InputMaybe<Array<TokenOperationsSortInput> | TokenOperationsSortInput>;
}>;

export type TokenOperationsSearchQuery = {
  __typename?: 'Query';
  tokenOperations: {
    __typename?: 'TokenOperationsConnection';
    edges: Array<{
      __typename: 'TokenOperationEdge';
      cursor: string;
      node: {
        __typename?: 'TokenOperation';
        id: string;
        transactionId: string;
        contractId: string;
        from?: string | null;
        to?: string | null;
        value: number;
        name: string;
        timestamp: number;
        contract: {
          __typename?: 'TokenContract';
          id: string;
          name: string;
          decimals: number;
          symbol: string;
        };
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

export type GetTokenLayoutQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetTokenLayoutQuery = {
  __typename?: 'Query';
  tokenContract: {
    __typename?: 'TokenContract';
    id: string;
    name: string;
    symbol: string;
    decimals: number;
  };
};

export type BlockPageQueryVariables = Exact<{
  height: Scalars['ID'];
}>;

export type BlockPageQuery = {
  __typename?: 'Query';
  block: {
    __typename?: 'Block';
    id: string;
    signature: string;
    transactionCount: number;
    createdAt: any;
    updatedAt: any;
    header: {
      __typename?: 'BlockHeader';
      height: any;
      previous: string;
      previousStateMerkleRoot?: string | null;
      signer: string;
      timestamp: any;
      transactionMerkleRoot?: string | null;
    };
    receipt: {
      __typename?: 'BlockReceipt';
      diskStorageUsed: any;
      networkBandwidthUsed: any;
      computeBandwidthUsed: any;
      eventCount: number;
    };
    reward?: {
      __typename?: 'BlockReward';
      producerId: string;
      value: number;
      burnedValue?: number | null;
    } | null;
  };
};

export type TransactionPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TransactionPageQuery = {
  __typename?: 'Query';
  transaction: {
    __typename?: 'Transaction';
    id: string;
    blockHeight: any;
    operationCount: number;
    index: number;
    signature: string;
    header: {
      __typename?: 'TransactionHeader';
      payer: string;
      nonce?: string | null;
      operationMerkleRoot?: string | null;
      rcLimit: string;
    };
  };
};

export type ChainCountsQueryVariables = Exact<{ [key: string]: never }>;

export type ChainCountsQuery = {
  __typename?: 'Query';
  blockProducers: {
    __typename?: 'BlockProducersConnection';
    totalCount: number;
  };
  transactions: { __typename?: 'TransactionsConnection'; totalCount: number };
};

export const AddressesSearchDocument = gql`
  query AddressesSearch(
    $after: String
    $before: String
    $first: Int
    $filter: AddressesFilter
    $sort: [AddressesSortInput!]
  ) {
    addresses(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          isProducer
          isContract
          isTokenContract
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

export function useAddressesSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, AddressesSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<AddressesSearchQuery>({
    query: AddressesSearchDocument,
    ...options,
  });
}
export const BlocksHomeSearchDocument = gql`
  query BlocksHomeSearch($after: String, $before: String, $first: Int) {
    blocks(after: $after, before: $before, first: $first) {
      edges {
        cursor
        node {
          id
          header {
            height
            timestamp
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

export function useBlocksHomeSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, BlocksHomeSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<BlocksHomeSearchQuery>({
    query: BlocksHomeSearchDocument,
    ...options,
  });
}
export const BlocksSearchDocument = gql`
  query BlocksSearch(
    $after: String
    $before: String
    $first: Int
    $filter: BlocksFilter
    $sort: [BlocksSortInput!]
  ) {
    blocks(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
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
            burnedValue
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

export function useBlocksSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, BlocksSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<BlocksSearchQuery>({
    query: BlocksSearchDocument,
    ...options,
  });
}
export const EventsSearchDocument = gql`
  query EventsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: EventsFilter
    $sort: [EventsSortInput!]
  ) {
    events(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          blockHeight
          parentId
          parentType
          sequence
          contractId
          name
          data
          impacted
          timestamp
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

export function useEventsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, EventsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<EventsSearchQuery>({
    query: EventsSearchDocument,
    ...options,
  });
}
export const OperationsSearchDocument = gql`
  query OperationsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: OperationsFilter
    $sort: [OperationsSortInput!]
  ) {
    operations(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          blockHeight
          transactionId
          type
          timestamp
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

export function useOperationsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, OperationsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<OperationsSearchQuery>({
    query: OperationsSearchDocument,
    ...options,
  });
}
export const TransactionsSearchDocument = gql`
  query TransactionsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: TransactionsFilter
    $sort: [TransactionsSortInput!]
  ) {
    transactions(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          blockHeight
          operationCount
          timestamp
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

export function useTransactionsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, TransactionsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<TransactionsSearchQuery>({
    query: TransactionsSearchDocument,
    ...options,
  });
}
export const ContractEventsSearchDocument = gql`
  query ContractEventsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: ContractEventsFilter
    $sort: [ContractEventsSortInput!]
  ) {
    contractEvents(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          blockHeight
          contractId
          contractStandardType
          impacted
          name
          parentType
          parentId
          timestamp
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

export function useContractEventsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, ContractEventsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<ContractEventsSearchQuery>({
    query: ContractEventsSearchDocument,
    ...options,
  });
}
export const ContractOperationsSearchDocument = gql`
  query ContractOperationsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: ContractOperationsFilter
    $sort: [ContractOperationsSortInput!]
  ) {
    contractOperations(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          blockHeight
          contractId
          transactionId
          contractStandardType
          timestamp
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

export function useContractOperationsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, ContractOperationsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<ContractOperationsSearchQuery>({
    query: ContractOperationsSearchDocument,
    ...options,
  });
}
export const ContractsSearchDocument = gql`
  query ContractsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: ContractsFilter
    $sort: [ContractsSortInput!]
  ) {
    contracts(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          contractStandardType
          timestamp
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

export function useContractsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, ContractsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<ContractsSearchQuery>({
    query: ContractsSearchDocument,
    ...options,
  });
}
export const BlockProducersSearchDocument = gql`
  query BlockProducersSearch(
    $after: String
    $before: String
    $first: Int
    $filter: BlockProducersFilter
    $sort: [BlockProducersSortInput!]
  ) {
    blockProducers(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          addressId
          balance
          blocksProduced
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

export function useBlockProducersSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, BlockProducersSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<BlockProducersSearchQuery>({
    query: BlockProducersSearchDocument,
    ...options,
  });
}
export const BlockRewardsSearchDocument = gql`
  query BlockRewardsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: BlockRewardsFilter
    $sort: [BlockRewardsSortInput!]
  ) {
    blockRewards(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          blockHeight
          value
          producerId
          burnedValue
          timestamp
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

export function useBlockRewardsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, BlockRewardsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<BlockRewardsSearchQuery>({
    query: BlockRewardsSearchDocument,
    ...options,
  });
}
export const TokenContractsSearchDocument = gql`
  query TokenContractsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: TokenContractsFilter
    $sort: [TokenContractsSortInput!]
  ) {
    tokenContracts(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          name
          symbol
          decimals
          totalSupply
          timestamp
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

export function useTokenContractsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, TokenContractsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<TokenContractsSearchQuery>({
    query: TokenContractsSearchDocument,
    ...options,
  });
}
export const TokenEventsSearchDocument = gql`
  query TokenEventsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: TokenEventsFilter
    $sort: [TokenEventsSortInput!]
  ) {
    tokenEvents(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          contract {
            id
            name
            symbol
            decimals
          }
          from
          to
          value
          name
          timestamp
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

export function useTokenEventsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, TokenEventsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<TokenEventsSearchQuery>({
    query: TokenEventsSearchDocument,
    ...options,
  });
}
export const TokenHoldersSearchDocument = gql`
  query TokenHoldersSearch(
    $after: String
    $before: String
    $first: Int
    $filter: TokenHoldersFilter
    $sort: [TokenHoldersSortInput!]
  ) {
    tokenHolders(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          addressId
          contractId
          balance
          contract {
            id
            name
            decimals
            symbol
          }
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

export function useTokenHoldersSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, TokenHoldersSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<TokenHoldersSearchQuery>({
    query: TokenHoldersSearchDocument,
    ...options,
  });
}
export const TokenOperationsSearchDocument = gql`
  query TokenOperationsSearch(
    $after: String
    $before: String
    $first: Int
    $filter: TokenOperationsFilter
    $sort: [TokenOperationsSortInput!]
  ) {
    tokenOperations(
      after: $after
      before: $before
      first: $first
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          transactionId
          contractId
          contract {
            id
            name
            decimals
            symbol
          }
          from
          to
          value
          name
          timestamp
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

export function useTokenOperationsSearchQuery(
  options: Omit<
    Urql.UseQueryArgs<never, TokenOperationsSearchQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<TokenOperationsSearchQuery>({
    query: TokenOperationsSearchDocument,
    ...options,
  });
}
export const GetTokenLayoutDocument = gql`
  query getTokenLayout($id: ID!) {
    tokenContract(id: $id) {
      id
      name
      symbol
      decimals
    }
  }
`;

export function useGetTokenLayoutQuery(
  options: Omit<
    Urql.UseQueryArgs<never, GetTokenLayoutQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<GetTokenLayoutQuery>({
    query: GetTokenLayoutDocument,
    ...options,
  });
}
export const BlockPageDocument = gql`
  query BlockPage($height: ID!) {
    block(height: $height) {
      header {
        height
        previous
        previousStateMerkleRoot
        signer
        timestamp
        transactionMerkleRoot
      }
      receipt {
        diskStorageUsed
        networkBandwidthUsed
        computeBandwidthUsed
        eventCount
      }
      reward {
        producerId
        value
        burnedValue
      }
      id
      signature
      transactionCount
      createdAt
      updatedAt
    }
  }
`;

export function useBlockPageQuery(
  options: Omit<Urql.UseQueryArgs<never, BlockPageQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<BlockPageQuery>({
    query: BlockPageDocument,
    ...options,
  });
}
export const TransactionPageDocument = gql`
  query TransactionPage($id: ID!) {
    transaction(id: $id) {
      id
      id
      blockHeight
      operationCount
      header {
        payer
        nonce
        operationMerkleRoot
        rcLimit
      }
      index
      signature
    }
  }
`;

export function useTransactionPageQuery(
  options: Omit<
    Urql.UseQueryArgs<never, TransactionPageQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<TransactionPageQuery>({
    query: TransactionPageDocument,
    ...options,
  });
}
export const ChainCountsDocument = gql`
  query ChainCounts {
    blockProducers {
      totalCount
    }
    transactions {
      totalCount
    }
  }
`;

export function useChainCountsQuery(
  options: Omit<
    Urql.UseQueryArgs<never, ChainCountsQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<ChainCountsQuery>({
    query: ChainCountsDocument,
    ...options,
  });
}
