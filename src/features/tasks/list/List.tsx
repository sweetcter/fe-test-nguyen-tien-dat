import Paginate from '@/components/shared/table/Pagination';
import Table from '@/components/shared/table/Table';
import TableFilter from '@/components/shared/table/TableFilter';
import type { Task } from '@/types/task';
import useTaskList from './useTaskList';

const List = () => {
  const { columns, filterFields, tasks, totalTask } = useTaskList();

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      <TableFilter fields={filterFields} />

      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold">Danh sách Task</h2>
          <span className="text-sm text-muted-foreground">Tổng: {totalTask} task</span>
        </div>
        <Table<Task> data={tasks} columns={columns} scroll={{ y: 'calc(100vh - 340px)' }} />
        <Paginate total={totalTask} />
      </div>
    </div>
  );
};

export default List;
