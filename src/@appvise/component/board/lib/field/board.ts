/* eslint-disable */

import { Field } from '@appvise/vue3-component-board/field/field';
import { SortDirection } from '@appvise/search-manager';

export class Board {
  private readonly fields!: Array<Field>;
  private fixedFields!: Array<Field>;
  private readonly toggleableFields!: Array<Field>;
  private sortField?: Field;
  private sortDescending: boolean = false;
  private readonly allowNoSort: boolean = false;
  private readonly allowDescSort: boolean = false;

  constructor(fields: Array<Field>, options: any) {
    this.fields = fields;
    this.fixedFields = this.fields.filter((field) => {
      return !field.toggleable;
    });
    this.toggleableFields = this.fields.filter((field) => {
      return field.toggleable;
    });

    this.sortField = this.getDefaultSortField();

    if (options.allowNoSort != null) {
      this.allowNoSort = options.allowNoSort;
    }

    if (options.allowDescSort != null) {
      this.allowDescSort = options.allowDescSort;
    }
  }

  public length(): number {
    return this.fields.length;
  }

  public getHeaders(): Array<object> {
    const headers: Array<object> = [];

    this.fixedFields.forEach((field: Field) => {
      if (field.visible) {
        headers.push(field.getHeader());
      }
    });

    this.toggleableFields.forEach((field: Field) => {
      if (field.visible) {
        headers.push(field.getHeader());
      }
    });

    return headers;
  }

  public getToggleableFields(): Array<Field> {
    return this.toggleableFields;
  }

  public getFields(): Array<Field> {
    return this.fields;
  }

  public getSortableFields(): Array<Field> {
    return this.fields.filter((field) => {
      return field.sortable;
    });
  }

  public getFilters(): Array<Field> {
    return this.fields.filter((field) => {
      return field.isFilter;
    });
  }

  /**
   * Return first field with sort: true
   */
  private getDefaultSortField(): Field | undefined {
    let field: Field | undefined;
    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].sort) {
        field = this.fields[i];
        break;
      }
    }

    return field;
  }

  public getSortField(): Field | undefined {
    return this.sortField;
  }

  public getSortDirection(): SortDirection {
    return this.sortDescending ? SortDirection.desc : SortDirection.asc;
  }

  public noSortIsAllowed(): boolean {
    return this.allowNoSort;
  }

  public descSortIsAllowed(): boolean {
    return this.allowDescSort;
  }

  public toggleSortField(field?: Field): void {
    if (field === undefined) {
      this.resetSortField();
      return;
    }

    // Get previous sort field
    const previousSortField = this.fields.find((_field) => {
      return _field.sort;
    });

    // Reset previous other sort field
    if (
      previousSortField != null &&
      // Do not reset yet if same field is toggled
      previousSortField.field !== field.field
    ) {
      previousSortField.sort = false;
    }

    // Same field as previous sortField is toggled
    if (previousSortField != null && previousSortField.field === field.field) {
      // Set sorting to desc when allowed + asc sorted
      if (this.descSortIsAllowed() && !this.sortDescending) {
        this.toggleSortDirection();
        return;
      }

      // Disable sorting when no sort is allowed + desc sorted
      if (this.noSortIsAllowed() && this.sortDescending) {
        this.resetSortField();
        return;
      }
    } else {
      // Otherwise always enable sort for provided field
      field.sort = true;
    }

    this.sortField = field.sort ? field : undefined;

    // Always reset when selecting new field
    this.sortDescending = false;
  }

  public toggleSortDirection(): void {
    this.sortDescending = !this.sortDescending;
  }

  public resetSortField(): void {
    // Reset previous sort field
    const previousSortField = this.fields.find((_field) => {
      return _field.sort;
    });

    if (previousSortField !== undefined) {
      previousSortField.sort = false;
    }

    this.sortDescending = false;

    this.sortField = undefined;
  }
}
