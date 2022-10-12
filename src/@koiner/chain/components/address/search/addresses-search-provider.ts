import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  AddressesConnection,
  Address,
  AddressEdge,
  useAddressesSearchQuery,
  QueryAddressesArgs,
} from '@koiner/sdk';

export class AddressesSearchProvider
  implements
    SearchProvider<
      QueryAddressesArgs,
      Address,
      AddressEdge,
      AddressesConnection
    >
{
  private loaded = false;
  public _state = SearchState.create<
    QueryAddressesArgs,
    Address,
    AddressEdge,
    AddressesConnection
  >();

  public get state(): SearchState<
    QueryAddressesArgs,
    Address,
    AddressEdge,
    AddressesConnection
  > {
    return this._state;
  }

  public search(
    request: QueryAddressesArgs
  ): Promise<
    SearchState<QueryAddressesArgs, Address, AddressEdge, AddressesConnection>
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      if (!this.loaded) {
        const { data, fetching, error, isPaused } = useAddressesSearchQuery({
          variables: this.state.request,
        });

        watch(data, (updatedData) => {
          this._state.connection.value =
            updatedData?.addresses as AddressesConnection;
        });

        this._state.error = error;
        this._state.fetching = fetching;
        this._state.isPaused = isPaused;

        this.loaded = true;

        resolve(this._state);
      }

      resolve(this._state);
    });
  }
}
