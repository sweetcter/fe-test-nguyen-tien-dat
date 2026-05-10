import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

import useTable from './useTable';
import { useTypeSelector } from '@/store';

type PaginateProps = PaginationProps & {
  total: number;
};

const Paginate = ({ total, ...props }: PaginateProps) => {
  const { handlePageChange } = useTable();
  const { currentPage, pageSize } = useTypeSelector((state) => state.tasks.pagination);

  return (
    <div className="flex items-center justify-end border-t border-border px-4 py-3">
      <Pagination
        total={total}
        current={currentPage}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger
        showTotal={(t) => `Tổng ${t}`}
        {...props}
      />
    </div>
  );
};

export default Paginate;
