import { CombinedError } from '@urql/core';
import { Node } from '@appvise/search-manager';
import { ref, Ref } from 'vue';

export class ItemState<TNode extends Node> {
  public id: Ref<string | undefined>;
  public item: Ref<TNode | undefined>;
  public error: Ref<CombinedError | undefined>;
  public fetching: Ref<boolean>;
  public isPaused: Ref<boolean>;

  constructor(props: {
    id: Ref<string | undefined>;
    item: Ref<TNode | undefined>;
    error: Ref<CombinedError | undefined>;
    fetching: Ref<boolean>;
    isPaused: Ref<boolean>;
  }) {
    this.id = props.id;
    this.item = props.item;
    this.error = props.error;
    this.fetching = props.fetching;
    this.isPaused = props.isPaused;
  }

  static create<TNode extends Node>(): ItemState<TNode> {
    return new ItemState<TNode>({
      id: ref(),
      item: ref(),
      error: ref(),
      fetching: ref(false),
      isPaused: ref(false),
    });
  }

  public reset(): void {
    this.id.value = undefined;
    this.item.value = undefined;
    this.error.value = undefined;
    this.fetching.value = false;
    this.isPaused.value = false;
  }
}
