import { selectTaskStats, selectRecentTasks } from './tasksSelector';
import { type RootState } from '@/store';

describe('tasksSelector', () => {
  const mockState = {
    tasks: {
      items: [
        { id: '1', title: 'Task 1', status: 'todo', createdAt: '2023-01-01T10:00:00Z' },
        { id: '2', title: 'Task 2', status: 'in_progress', createdAt: '2023-01-02T10:00:00Z' },
        { id: '3', title: 'Task 3', status: 'done', createdAt: '2023-01-03T10:00:00Z' },
        { id: '4', title: 'Task 4', status: 'done', createdAt: '2023-01-04T10:00:00Z' },
      ],
      filters: {},
      pagination: { currentPage: 1, pageSize: 10, total: 4 },
      selectedIds: [],
      isLoading: false,
    },
  } as unknown as RootState;

  describe('selectTaskStats (Thống kê Task)', () => {
    it('nên tính toán thống kê chính xác dựa trên state của task', () => {
      const stats = selectTaskStats(mockState);

      expect(stats.total).toBe(4);
      expect(stats.todo).toBe(1);
      expect(stats.in_progress).toBe(1);
      expect(stats.done).toBe(2);

      expect(stats.percents.todo).toBe(25);
      expect(stats.percents.in_progress).toBe(25);
      expect(stats.percents.done).toBe(50);
    });

    it('nên xử lý mảng task rỗng mà không bị lỗi', () => {
      const emptyState = { tasks: { items: [] } } as unknown as RootState;
      const stats = selectTaskStats(emptyState);

      expect(stats.total).toBe(0);
      expect(stats.todo).toBe(0);
      expect(stats.in_progress).toBe(0);
      expect(stats.done).toBe(0);
      expect(stats.percents.todo).toBe(0);
      expect(stats.percents.done).toBe(0);
    });
  });

  describe('selectRecentTasks (Task gần đây)', () => {
    it('nên trả về tối đa 5 task được sắp xếp theo thời gian tạo giảm dần (mới nhất trước)', () => {
      const recentTasks = selectRecentTasks(mockState);

      expect(recentTasks).toHaveLength(4);
      // Newest first
      expect(recentTasks[0].id).toBe('4');
      expect(recentTasks[3].id).toBe('1');
    });
  });
});
