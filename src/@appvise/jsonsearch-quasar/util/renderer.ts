import {
  JsonFormsState,
  getCells,
  getConfig,
  getData,
  getRenderers,
  isInherentlyEnabled,
  OwnPropsOfRenderer,
  StatePropsOfRenderer,
  UISchemaElement,
  Resolve,
  hasShowRule,
  getAjv,
  isVisible,
  getSchema,
} from '@jsonforms/core';
import { SearchViewElement } from '@appvise/jsonsearch-quasar';

/**
 * State props of a search view;
 */
export type StatePropsOfSearchView = StatePropsOfRenderer;

export type SearchViewProps = StatePropsOfSearchView;

export interface OwnPropsOfSearchView extends OwnPropsOfRenderer {
  uischema: UISchemaElement;
}

export const searchViewDefaultProps: {
  visible: boolean;
  enabled: boolean;
  path: string;
} = {
  visible: true,
  enabled: true,
  path: '',
};

/**
 * Map state to searchView props.
 * @param state JSONForms state tree
 * @param ownProps any own props
 * @returns {StatePropsOfSearchView}
 */
export const mapStateToSearchViewProps = (
  state: JsonFormsState,
  ownProps: OwnPropsOfSearchView
): SearchViewProps => {
  const rootData = getData(state);
  const { uischema } = ownProps;
  const visible: boolean =
    ownProps.visible === undefined || hasShowRule(uischema)
      ? isVisible(
          ownProps.uischema,
          rootData,
          ownProps.path ?? '',
          getAjv(state)
        )
      : ownProps.visible;

  let data = {};
  if (ownProps.path != null) {
    data = Resolve.data(rootData, ownProps.path);
  }

  const searchViewElement = uischema as SearchViewElement;
  const rootSchema = getSchema(state);
  const resolvedSchema = Resolve.schema(
    ownProps.schema || rootSchema,
    searchViewElement.scope,
    rootSchema
  );

  const schema = resolvedSchema ?? rootSchema;
  const config = getConfig(state);
  const enabled: boolean = isInherentlyEnabled(
    state,
    ownProps,
    uischema,
    schema,
    rootData,
    config
  );

  return {
    ...searchViewDefaultProps,
    renderers: ownProps.renderers || getRenderers(state),
    cells: ownProps.cells || getCells(state),
    visible,
    enabled,
    path: ownProps.path ?? '',
    data,
    uischema: ownProps.uischema,
    schema,
    config,
  };
};
