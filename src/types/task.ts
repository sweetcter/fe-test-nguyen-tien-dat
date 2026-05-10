import type { Dayjs } from 'dayjs';

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  tags?: string[];
}

export type TaskFilter = {
  search: string;
  status: TaskStatus[];
  priority: TaskPriority;
  dateRange: [Dayjs, Dayjs] | null;
};
