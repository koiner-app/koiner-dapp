/* eslint-disable */
export class Field {
  name!: string;
  label!: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  field!: string | Function;
  sortable = false;
  toggleable = false;
  isFilter = false;
  visible = true;
  sort = false;
  align = 'left';
  customized = false;

  constructor(props: {
    name: any;
    label: any;
    field: any;
    align: any;
    sortable: any;
    toggleable?: any;
    isFilter?: any;
    sort?: any;
    visible?: any;
    customized?: boolean;
  }) {
    this.name = props.name;
    this.label = props.label;
    this.field = props.field;

    if (props.sortable != null) {
      this.sortable = props.sortable;
    }

    if (props.toggleable != null) {
      this.toggleable = props.toggleable;
    }

    if (props.isFilter != null) {
      this.isFilter = props.isFilter;
    }

    if (props.visible != null) {
      this.visible = props.visible;
    }

    if (props.sort != null) {
      this.sort = props.sort;
    }

    if (
      props.align != null &&
      (props.align === 'left' || props.align === 'right')
    ) {
      this.align = props.align;
    }

    if (props.customized != null) {
      this.customized = props.customized;
    }
  }

  public getHeader(): object {
    return {
      text: this.label,
      value: this.field,
      sortable: this.sortable,
      toggleable: this.toggleable,
      visible: this.visible,
      sort: this.sort,
      align: this.align,
    };
  }
}
