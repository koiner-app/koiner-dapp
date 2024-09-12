import {
  Scopable,
  Internationalizable,
  UISchemaElement,
} from '@jsonforms/core';
import { SearchProvider } from '@appvise/search-manager';
import { LabelDescription } from '@jsonforms/core/src/models/uischema';

/**
 * Represents a search view element which can render its attributes
 * in a specific way.
 */
export interface SearchViewElement
  extends UISchemaElement,
    Scopable,
    Internationalizable {
  /**
   * The child elements of this layout.
   */
  filters: UISchemaElement[];
  elements: UISchemaElement[];
  provider: SearchProvider<any, any, any, any>;
  scrollPosition?: number;

  /**
   * The parent data to be used for displaying in the SearchView
   * when using the RawDataProvider
   */
  result?: string | boolean | number | Record<string, unknown>;
}

export interface ExpansionPanelElement extends SearchViewElement {
  type: 'ExpansionPanel';
}

export interface ListElement extends SearchViewElement {
  type: 'List';
}

export interface TableViewElement extends SearchViewElement {
  type: 'Table';
}

/**
 * A attribute element. The scope property of the attribute determines
 * to which part of the schema the attribute should be bound.
 */
export interface FilterElement
  extends UISchemaElement,
    Scopable,
    Internationalizable {
  type: 'Filter';
  /**
   * An optional label that will be associated with the control
   */
  label?: string | boolean | LabelDescription;
  /**
   * The parent data to be used for displaying in the attribute
   */
  result: string | boolean | number | Record<string, unknown>;
}

/**
 * A attribute element. The scope property of the attribute determines
 * to which part of the schema the attribute should be bound.
 */
export interface AttributeElement
  extends UISchemaElement,
    Scopable,
    Internationalizable {
  type: 'Control'; // TODO: make possible to use type: 'Attribute'
  /**
   * An optional label that will be associated with the control
   */
  label?: string | boolean | LabelDescription;
  /**
   * The parent data to be used for displaying in the attribute
   */
  result: string | boolean | number | Record<string, unknown>;
}
