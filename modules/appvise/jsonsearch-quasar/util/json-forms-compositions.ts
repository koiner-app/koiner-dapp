import { RendererProps, useControl } from '@jsonforms/vue';
import { SearchViewElement } from './uischema';
import { mapStateToSearchViewProps } from './renderer';
import { unref } from 'vue';
import {
  ControlElement,
  CoreActions,
  Dispatch,
  JsonFormsState,
  mapDispatchToControlProps,
  mapStateToControlProps,
} from '@jsonforms/core';
import { Required } from '@jsonforms/vue/src/jsonFormsCompositions';

export interface SearchViewRendererProps extends RendererProps {
  uischema: SearchViewElement;
  result?: Record<string, any>;
}

/**
 * Add result prop to control
 * @param props
 * @param stateMap
 * @param dispatchMap
 */
export function useControlWithResult<R, D, P extends Record<any, any>>(
  props: P,
  stateMap: (state: JsonFormsState, props: P) => R,
  dispatchMap: (dispatch: Dispatch<CoreActions>) => D
): { control: Required<R> & { result?: any } } & D {
  return useControl(props, stateMap, dispatchMap);
}

/**
 * Provides bindings for 'SearchView' elements, e.g. TableSearchView, ListSearchView.
 *
 * Access bindings via the provided reactive 'searchView' object.
 */
export const useJsonFormsSearchView = (props: SearchViewRendererProps) => {
  const { control, ...other } = useControlWithResult(
    props,
    mapStateToSearchViewProps,
    mapDispatchToControlProps
  );

  const rawControl = unref(control);

  return {
    control,
    ...other,
    request: rawControl.data.request ?? {},
    scrollPosition: rawControl.data.scrollPosition,
    additionalData: rawControl.data.additionalData,
    connection: rawControl.data.connection,
  };
};

export interface AttributeProps extends RendererProps {
  uischema: ControlElement;
}

/**
 * Provides generic bindings for 'Attribute' elements.
 * Should be used when no specialized bindings are appropriate.
 *
 * Access bindings via the provided reactive `attribute` object.
 */
export const useJsonAttribute = (props: AttributeProps) => {
  return useControl(props, mapStateToControlProps, mapDispatchToControlProps);
};
