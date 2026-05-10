import type { TableProps } from 'antd';
import { Table as AntdTable } from 'antd';

type TTableProps<T> = TableProps<T> & {
  data: T[];
  loading?: boolean;
};

const Table = <T extends object>({ data, loading = false, ...props }: TTableProps<T>) => {
  return (
    <AntdTable<T>
      dataSource={data}
      loading={loading}
      size="middle"
      bordered={false}
      scroll={{ x: 'max-content' }}
      pagination={false}
      rowKey={(record) => (record as Record<string, unknown>)['id'] as string}
      className="overflow-hidden rounded-lg"
      {...props}
    />
  );
};

export default Table;
