import { RendererProps, useControl } from '@jsonforms/vue';
import { SearchViewElement } from './uischema';
import { mapStateToSearchViewProps } from './renderer';
import { unref } from 'vue';
import {
  ControlElement,
  mapDispatchToControlProps,
  mapStateToControlProps,
} from '@jsonforms/core';

export interface SearchViewRendererProps extends RendererProps {
  uischema: SearchViewElement;
}

/**
 * Provides bindings for 'SearchView' elements, e.g. TableSearchView, ListSearchView.
 *
 * Access bindings via the provided reactive 'searchView' object.
 */
export const useJsonFormsSearchView = (props: SearchViewRendererProps) => {
  const { control, ...other } = useControl(
    props,
    mapStateToSearchViewProps,
    mapDispatchToControlProps
  );
  const rawControl = unref(control);
  const request = rawControl.data.request ?? {};
  const scrollPosition = rawControl.data.scrollPosition;

  return {
    searchView: control,
    ...other,
    request,
    scrollPosition,
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
  return useControl(props, mapStateToControlProps);
};
