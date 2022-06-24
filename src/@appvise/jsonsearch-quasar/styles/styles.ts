import { UISchemaElement } from '@jsonforms/core';
import { merge } from 'lodash';
import { defaultStyles } from './default-styles';
import { inject } from 'vue';

const createEmptyStyles = (): Styles => ({
  searchView: {},
  tableView: {},
  attribute: {},
});

export interface Styles {
  searchView: {
    root?: string;
  };
  tableView: {
    root?: string;
  };
  attribute: {
    root?: string;
    wrapper?: string;
    age?: string;
    button?: string;
    link?: string;
    numeric?: string;
    text?: string;
  };
}

export const useStyles = (element?: UISchemaElement): Styles => {
  const userStyles = inject('styles', defaultStyles);
  if (!element?.options?.styles) {
    return userStyles;
  }
  const styles = createEmptyStyles();
  if (userStyles) {
    merge(styles, userStyles);
  } else {
    merge(styles, defaultStyles);
  }
  if (element?.options?.styles) {
    merge(styles, element.options.styles);
  }
  return styles;
};
