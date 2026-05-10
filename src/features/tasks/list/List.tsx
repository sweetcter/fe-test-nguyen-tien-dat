import Paginate from '@/components/table/Pagination';
import Table from '@/components/table/Table';
import TableFilter from '@/components/table/TableFilter';
import TaskFormModal from '@/features/tasks/task-form/TaskFormModal';
import type { Task } from '@/types/task';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import useTaskList from './useTaskList';

const List = () => {
  const {
    columns,
    filterFields,
    tasks,
    isLoading,
    totalTask,

    selectedIds,
    clearSelection,
    isFormOpen,
    editingTask,
    openAddModal,
    closeModal,
    handleSaveTask,
  } = useTaskList();

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      <TableFilter fields={filterFields} />

      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Danh sách Task</h2>
            {selectedIds.length > 0 && (
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                Đã chọn {selectedIds.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <button
                onClick={clearSelection}
                className="text-sm text-gray-400 transition-colors hover:text-gray-600"
              >
                Bỏ chọn tất cả
              </button>
            )}
            <span className="text-sm text-muted-foreground">Tổng: {totalTask} task</span>
            <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
              Thêm mới
            </Button>
          </div>
        </div>

        <Table<Task>
          data={tasks}
          columns={columns}
          loading={isLoading}
          scroll={{ y: 'calc(100vh - 330px)' }}
        />

        <Paginate total={totalTask} />
      </div>

      <TaskFormModal
        open={isFormOpen}
        editingTask={editingTask}
        onClose={closeModal}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default List;
