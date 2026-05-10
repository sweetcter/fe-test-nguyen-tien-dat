import { debounce } from '@/core/lib/debouce';
import { FilterOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select, Space, Tooltip } from 'antd';
import type { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo } from 'react';
import type { TaskFilter } from '@/types/task';
import type {
  DateRangeField,
  FilterField,
  MultiSelectField,
  SelectField,
  TableFilterProps,
} from './_table.type';
import useTable from './useTable';

const { RangePicker } = DatePicker;

const TableFilter = ({ fields, onCreate, addLabel = 'Thêm mới' }: TableFilterProps<TaskFilter>) => {
  const { handleFilterChange, reset, filters, isFiltered } = useTable();

  type FieldKey = keyof TaskFilter;

  const handleChange = useCallback(
    (name: FieldKey, value: any) => {
      handleFilterChange({ ...filters, [name]: value });
    },
    [filters, handleFilterChange]
  );

  const handleSearchChange = useMemo(
    () =>
      debounce((name: FieldKey, raw: string) => {
        handleChange(name, raw || null);
      }, 300),
    [handleChange]
  );

  const renderField = (field: FilterField<TaskFilter>) => {
    const name = field.name as FieldKey;

    switch (field.type) {
      case 'search':
        return (
          <Input.Search
            key={String(name)}
            placeholder={field.placeholder ?? field.label ?? 'Tìm kiếm...'}
            className={field.className ?? 'w-52'}
            allowClear
            defaultValue={(filters[name] as string) ?? ''}
            onChange={(e) => handleSearchChange(name, e.target.value)}
            onSearch={(val) => handleChange(name, val || null)}
          />
        );

      case 'select':
      case 'sort':
        return (
          <Select
            key={String(name)}
            placeholder={field.placeholder ?? field.label}
            className={field.className ?? 'w-40'}
            allowClear
            value={(filters[name] as string) ?? undefined}
            options={(field as SelectField<TaskFilter>).options}
            onChange={(val) => handleChange(name, val ?? null)}
          />
        );

      case 'multi-select':
        return (
          <Select
            key={String(name)}
            mode="multiple"
            placeholder={field.placeholder ?? field.label}
            className={field.className ?? 'min-w-40'}
            allowClear
            maxTagCount="responsive"
            value={(filters[name] as string[]) ?? []}
            options={(field as MultiSelectField<TaskFilter>).options}
            onChange={(val) => handleChange(name, val.length ? val : null)}
          />
        );

      case 'date-range':
        return (
          <RangePicker
            key={String(name)}
            placeholder={['Từ ngày', 'Đến ngày']}
            format={(field as DateRangeField<TaskFilter>).format ?? 'DD/MM/YYYY'}
            className={field.className ?? 'w-64'}
            value={(filters[name] as [Dayjs, Dayjs]) ?? null}
            onChange={(dates) => handleChange(name, dates as [Dayjs, Dayjs] | null)}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    return () => handleSearchChange.cancel();
  }, [handleSearchChange]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-1 flex items-center gap-1 text-muted-foreground">
          <FilterOutlined className="shrink-0 text-sm" />
          <span className="whitespace-nowrap text-xs font-medium">Lọc &amp; Sắp xếp:</span>
        </div>

        <Space wrap size={8}>
          <Tooltip title={isFiltered ? 'Đặt lại bộ lọc' : 'Chưa có bộ lọc nào'}>
            <Button
              size="middle"
              type="primary"
              icon={<ReloadOutlined />}
              onClick={reset}
              disabled={!isFiltered}
            >
              Đặt lại
            </Button>
          </Tooltip>
          {fields.map((field) => renderField(field))}
        </Space>
      </div>

      {onCreate && (
        <div className="ml-auto flex items-center gap-2">
          {onCreate && (
            <Button size="middle" type="primary" icon={<PlusOutlined />} onClick={onCreate}>
              {addLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TableFilter;
