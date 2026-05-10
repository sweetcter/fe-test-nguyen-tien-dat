import type { TaskPriority, TaskStatus } from '@/types/task';

export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string }> = {
  todo: { label: 'Cần làm', color: 'default' },
  in_progress: { label: 'Đang làm', color: 'blue' },
  done: { label: 'Hoàn thành', color: 'green' },
};

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string }> = {
  low: { label: 'Thấp', color: 'cyan' },
  medium: { label: 'Trung bình', color: 'orange' },
  high: { label: 'Cao', color: 'red' },
};
