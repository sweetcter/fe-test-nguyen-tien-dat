import BadgeLabel from '@/components/shared/BadgeLabel';
import type { FilterField } from '@/components/shared/table/_table.type';
import useTable from '@/components/shared/table/useTable';
import { PRIORITY_CONFIG, STATUS_CONFIG } from '@/core/constants/tasks.constant';
import { useTypeSelector } from '@/store';
import type { Task, TaskFilter, TaskPriority, TaskStatus } from '@/types/task';
import type { ColumnsType } from 'antd/es/table';

const useTaskList = () => {
  const { currentPage, pageSize } = useTypeSelector((state) => state.tasks.pagination);
  const totalTask = useTypeSelector((state) => state.tasks.items.length);

  const { tasks, paginatedTasks } = useTable();

  const columns: ColumnsType<Task> = [
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
      width: 140,
      render: (status: TaskStatus) => (
        <BadgeLabel color={STATUS_CONFIG[status].color}>{STATUS_CONFIG[status].label}</BadgeLabel>
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
    paginatedTasks,
    totalTask,
    filterFields,
  };
};

export default useTaskList;
