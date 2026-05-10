export type FilterFieldType = 'search' | 'select' | 'multi-select' | 'date-range' | 'sort';

export interface BaseFilterField<T = string> {
  name: T extends string ? T : keyof T;
  label?: string;
  placeholder?: string;
  className?: string;
}

export interface SearchField<T = string> extends BaseFilterField<T> {
  type: 'search';
}

export interface SelectField<T = string> extends BaseFilterField<T> {
  type: 'select' | 'sort';
  options: { label: string; value: string | number }[];
}

export interface MultiSelectField<T = string> extends BaseFilterField<T> {
  type: 'multi-select';
  options: { label: string; value: string | number }[];
}

export interface DateRangeField<T = string> extends BaseFilterField<T> {
  type: 'date-range';
  format?: string;
}

export type FilterField<T = string> =
  | SearchField<T>
  | SelectField<T>
  | MultiSelectField<T>
  | DateRangeField<T>;

export type FilterValues<T = string> = Partial<Record<T extends string ? T : keyof T, any>>;

export type TableFilterProps<T = string> = {
  fields: FilterField<T>[];
  onCreate?: () => void;
  addLabel?: string;
};
