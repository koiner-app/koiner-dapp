import { ref, Ref, watch } from 'vue';
import { CountableSearchProvider, SearchState } from '@appvise/search-manager';
import {
  QueryTokenContractsArgs,
  TokenContract,
  TokenContractEdge,
  TokenContractsConnection,
  TokenContractsSortField,
  useTokenContractsCountSearchQuery,
  useTokenContractsSearchQuery,
} from '@koiner/sdk';

export class TokenContractsSearchProvider
  implements
    CountableSearchProvider<
      QueryTokenContractsArgs,
      TokenContract,
      TokenContractEdge,
      TokenContractsConnection
    >
{
  public _state = SearchState.create<
    QueryTokenContractsArgs,
    TokenContract,
    TokenContractEdge,
    TokenContractsConnection
  >();

  public _countState = SearchState.create<
    any,
    TokenContract,
    TokenContractEdge,
    TokenContractsConnection
  >();

  public get sortFields(): typeof TokenContractsSortField {
    return this._sortFields;
  }

  private _totalCount: Ref<number | undefined> = ref();

  public _sortFields = TokenContractsSortField;

  constructor() {
    const { data, fetching, error, isPaused } = useTokenContractsSearchQuery({
      variables: this.state.request,
      pause: true,
    });

    watch(data, (updatedData) => {
      this._state.connection.value =
        updatedData?.tokenContracts as TokenContractsConnection;
    });

    this._state.error = error;
    this._state.fetching = fetching;
    this._state.isPaused = isPaused;

    // Counts query
    const {
      data: countData,
      fetching: countFetching,
      error: countError,
      isPaused: countIsPaused,
    } = useTokenContractsCountSearchQuery({
      variables: this.countState.request,
    });

    watch(countData, (updatedData) => {
      this._totalCount.value = updatedData?.tokenContracts.totalCount;
    });

    this._countState.error = countError;
    this._countState.fetching = countFetching;
    this._countState.isPaused = countIsPaused;
  }

  public get state(): SearchState<
    QueryTokenContractsArgs,
    TokenContract,
    TokenContractEdge,
    TokenContractsConnection
  > {
    return this._state;
  }

  public get countState(): SearchState<
    QueryTokenContractsArgs,
    TokenContract,
    TokenContractEdge,
    TokenContractsConnection
  > {
    return this._countState;
  }

  public get totalCount(): Ref<number | undefined> {
    return this._totalCount;
  }

  public search(
    request: QueryTokenContractsArgs
  ): Promise<
    SearchState<
      QueryTokenContractsArgs,
      TokenContract,
      TokenContractEdge,
      TokenContractsConnection
    >
  > {
    this._state.request.value = request;

    if (!request.after) {
      this._countState.request.value = { filter: request.filter };
    }

    return new Promise((resolve) => {
      resolve(this._state);
    });
  }

  public reset(): void {
    this._state.reset();
    this._countState.reset();
  }
}
