import BadgeLabel from '@/components/shared/BadgeLabel';
import Dialog from '@/components/shared/Dialog';
import { RowCheckbox, SelectAllCheckbox } from '@/components/table/RowSelectionCheckbox';
import type { FilterField } from '@/components/table/_table.type';
import useTable from '@/components/table/useTable';
import { PRIORITY_CONFIG, STATUS_CONFIG } from '@/core/constants/tasks.constant.tsx';
import { useAppDispatch, useTypeSelector } from '@/store';
import { selectSelectedIds } from '@/store/selectors/tasksSelector';
import {
  clearSelection,
  deleteManyTasks,
  deleteTask,
  updateTaskStatus,
} from '@/store/slices/tasksSlice';
import type { Task, TaskFilter, TaskPriority, TaskStatus } from '@/types/task';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Select, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTaskAction } from './useTaskAction';

const useTaskList = () => {
  const dispatch = useAppDispatch();
  const { currentPage, pageSize } = useTypeSelector((state) => state.tasks.pagination);
  const totalTask = useTypeSelector((state) => state.tasks.items.length);
  const selectedIds = useTypeSelector(selectSelectedIds);

  const { tasks, paginatedTasks, isLoading } = useTable();
  const taskAction = useTaskAction();

  const pageIds = tasks.map((t) => t.id);

  const columns: ColumnsType<Task> = [
    {
      key: 'selection',
      width: 48,
      fixed: 'left',
      title: () => <SelectAllCheckbox pageIds={pageIds} />,
      render: (_val, record) => <RowCheckbox id={record.id} />,
    },
    {
      title: '#',
      key: 'index',
      width: 50,
      render: (_val, _row, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record) => (
        <div>
          <span className="font-medium">{title}</span>
          {record.description && (
            <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">{record.description}</p>
          )}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      render: (status: TaskStatus, record) => (
        <Select
          value={status}
          className="w-full"
          variant="borderless"
          onChange={(newStatus) =>
            dispatch(updateTaskStatus({ id: record.id, status: newStatus as TaskStatus }))
          }
          options={Object.entries(STATUS_CONFIG).map(([key, config]) => ({
            value: key,
            label: <BadgeLabel color={config.color}>{config.label}</BadgeLabel>,
          }))}
        />
      ),
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      render: (priority: TaskPriority) => (
        <BadgeLabel color={PRIORITY_CONFIG[priority].color}>
          {PRIORITY_CONFIG[priority].label}
        </BadgeLabel>
      ),
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'assignee',
      key: 'assignee',
      width: 160,
      render: (assignee: string) => (
        <span className="text-muted-foreground">{assignee || '-'}</span>
      ),
    },
    {
      title: 'Hạn hoàn thành',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 140,
      render: (date: string) => <span className="text-muted-foreground">{date || '-'}</span>,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-1">
          {tags?.map((tag) => (
            <BadgeLabel key={tag} color="default" bordered={false}>
              {tag}
            </BadgeLabel>
          ))}
        </div>
      ),
    },
    {
      key: 'action',
      width: 100,
      fixed: 'right',
      title: () =>
        selectedIds.length > 0 ? (
          <Dialog
            openButton={
              <Tooltip title={`Xóa ${selectedIds.length} task đã chọn`}>
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  className="flex items-center gap-1 font-medium"
                >
                  Xóa {selectedIds.length} task
                </Button>
              </Tooltip>
            }
            title={
              <div className="flex items-center gap-2">
                <DeleteOutlined style={{ color: '#ff4d4f' }} />
                Xác nhận xóa hàng loạt
              </div>
            }
            okButton="Xóa tất cả"
            okButtonProps={{ danger: true }}
            onConfirm={() => dispatch(deleteManyTasks(selectedIds))}
            closeAfterConfirm
            width={420}
          >
            <p className="text-base">
              Bạn có chắc chắn muốn xóa{' '}
              <span className="font-semibold text-red-500">{selectedIds.length} task</span> đã chọn
              không?
            </p>
            <p className="mt-1 text-sm text-gray-400">Hành động này không thể hoàn tác.</p>
          </Dialog>
        ) : (
          <span className="text-muted-foreground">Thao tác</span>
        ),
      render: (_val, record) => (
        <div className="flex items-center gap-1">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => taskAction.openEditModal(record)}
            />
          </Tooltip>
          <Dialog
            openButton={
              <Tooltip title="Xóa task">
                <Button type="text" danger size="small" icon={<DeleteOutlined />} />
              </Tooltip>
            }
            title={
              <div className="flex items-center gap-2">
                <DeleteOutlined style={{ color: '#ff4d4f' }} />
                Xác nhận xóa
              </div>
            }
            okButton="Xóa"
            okButtonProps={{ danger: true }}
            onConfirm={() => dispatch(deleteTask(record.id))}
            closeAfterConfirm
            width={420}
          >
            <p className="text-base">Bạn có chắc chắn muốn xóa task này không?</p>
            <p className="mt-1 text-sm text-gray-400">Hành động này không thể hoàn tác.</p>
          </Dialog>
        </div>
      ),
    },
  ];

  const filterFields: FilterField<TaskFilter>[] = [
    {
      type: 'search',
      name: 'search',
      placeholder: 'Tìm kiếm tiêu đề...',
      className: 'w-52',
    },
    {
      type: 'multi-select',
      name: 'status',
      placeholder: 'Trạng thái',
      options: [
        { value: 'todo', label: 'Cần làm' },
        { value: 'in_progress', label: 'Đang làm' },
        { value: 'done', label: 'Hoàn thành' },
      ],
    },
    {
      type: 'select',
      name: 'priority',
      placeholder: 'Độ ưu tiên',
      options: [
        { value: 'low', label: 'Thấp' },
        { value: 'medium', label: 'Trung bình' },
        { value: 'high', label: 'Cao' },
      ],
    },
    {
      type: 'date-range',
      name: 'dateRange',
      placeholder: 'Khoảng hạn chót',
      format: 'YYYY-MM-DD',
    },
  ];

  return {
    columns,
    tasks,
    isLoading,
    paginatedTasks,
    totalTask,
    filterFields,
    selectedIds,
    clearSelection: () => dispatch(clearSelection()),
    ...taskAction,
  };
};

export default useTaskList;
