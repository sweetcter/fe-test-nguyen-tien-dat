import BadgeLabel from '@/components/shared/BadgeLabel';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '@/core/constants/tasks.constant.tsx';
import { useTypeSelector } from '@/store';
import { selectRecentTasks, selectTaskStats } from '@/store/selectors/tasksSelector';
import type { Task, TaskPriority, TaskStatus } from '@/types/task';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FireOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Card, Progress, Statistic, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const recentColumns: ColumnsType<Task> = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
    render: (title: string, record) => (
      <div>
        <span className="font-medium">{title}</span>
        {record.tags && record.tags.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {record.tags.slice(0, 2).map((tag) => (
              <BadgeLabel key={tag} color="default" bordered={false}>
                {tag}
              </BadgeLabel>
            ))}
          </div>
        )}
      </div>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 130,
    render: (status: TaskStatus) => (
      <BadgeLabel color={STATUS_CONFIG[status].color}>{STATUS_CONFIG[status].label}</BadgeLabel>
    ),
  },
  {
    title: 'Ưu tiên',
    dataIndex: 'priority',
    key: 'priority',
    width: 100,
    render: (priority: TaskPriority) => (
      <BadgeLabel color={PRIORITY_CONFIG[priority].color}>
        {PRIORITY_CONFIG[priority].label}
      </BadgeLabel>
    ),
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 130,
    render: (date: string) => (
      <Text type="secondary" className="text-xs">
        {dayjs(date).format('DD/MM/YYYY')}
      </Text>
    ),
  },
];

const STAT_CARDS = [
  {
    key: 'total' as const,
    label: 'Tổng Task',
    icon: <UnorderedListOutlined />,
    color: '#3b82f6',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    key: 'todo' as const,
    label: 'Cần làm',
    icon: <ClockCircleOutlined />,
    color: '#6b7280',
    bgColor: 'bg-gray-50 dark:bg-gray-900/30',
    borderColor: 'border-gray-200 dark:border-gray-700',
    iconBg: 'bg-gray-100 dark:bg-gray-800/50',
    iconColor: 'text-gray-500 dark:text-gray-400',
  },
  {
    key: 'in_progress' as const,
    label: 'Đang làm',
    icon: <FireOutlined />,
    color: '#f59e0b',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-500 dark:text-amber-400',
  },
  {
    key: 'done' as const,
    label: 'Hoàn thành',
    icon: <CheckCircleOutlined />,
    color: '#22c55e',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    iconBg: 'bg-green-100 dark:bg-green-900/50',
    iconColor: 'text-green-600 dark:text-green-400',
  },
];

const PROGRESS_BARS = [
  { key: 'todo' as const, label: 'Cần làm', color: '#6b7280' },
  { key: 'in_progress' as const, label: 'Đang làm', color: '#f59e0b' },
  { key: 'done' as const, label: 'Hoàn thành', color: '#22c55e' },
];

const Dashboard = () => {
  const stats = useTypeSelector(selectTaskStats);
  const recentTasks = useTypeSelector(selectRecentTasks);

  return (
    <div className="flex h-full flex-col gap-5 overflow-auto">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <div
            key={card.key}
            className={`flex items-center gap-4 rounded-xl border p-5 ${card.bgColor} ${card.borderColor}`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
            >
              <span className={`text-xl ${card.iconColor}`}>{card.icon}</span>
            </div>
            <Statistic
              title={
                <span className="text-xs font-medium text-muted-foreground">{card.label}</span>
              }
              value={stats[card.key]}
              valueStyle={{ color: card.color, fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          title={<span className="font-semibold">Tỷ lệ trạng thái</span>}
          className="lg:col-span-1"
        >
          <div className="flex flex-col gap-4">
            {PROGRESS_BARS.map((bar) => (
              <div key={bar.key}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{bar.label}</span>
                  <span className="font-semibold">
                    {stats[bar.key]}{' '}
                    <span className="font-normal text-muted-foreground">
                      ({stats.percents[bar.key]}%)
                    </span>
                  </span>
                </div>
                <Progress
                  percent={stats.percents[bar.key]}
                  strokeColor={bar.color}
                  showInfo={false}
                  size="small"
                  trailColor="var(--ant-color-fill-tertiary)"
                />
              </div>
            ))}

            {stats.total > 0 && (
              <div className="mt-2 border-t border-border pt-3">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">Tổng tiến độ</span>
                  <span className="font-semibold text-green-600">{stats.percents.done}%</span>
                </div>
                <Progress
                  percent={stats.percents.done}
                  strokeColor={{ from: '#3b82f6', to: '#22c55e' }}
                  showInfo={false}
                />
              </div>
            )}
          </div>
        </Card>

        <Card
          title={<span className="font-semibold">Task mới nhất</span>}
          extra={
            <Link to="/task" className="text-sm text-blue-500 hover:text-blue-600">
              Xem tất cả →
            </Link>
          }
          className="lg:col-span-2"
          styles={{ body: { padding: 0 } }}
        >
          <Table<Task>
            dataSource={recentTasks}
            columns={recentColumns}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
