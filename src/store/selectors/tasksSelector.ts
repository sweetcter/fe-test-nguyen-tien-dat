import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@/store';
import dayjs from 'dayjs';

export const selectTasksState = (state: RootState) => state.tasks;
export const selectItems = (state: RootState) => state.tasks.items;
export const selectFilters = (state: RootState) => state.tasks.filters;
export const selectPagination = (state: RootState) => state.tasks.pagination;
export const selectSelectedIds = (state: RootState) => state.tasks.selectedIds;

export const selectAllTasks = createSelector([selectItems], (items) => items);

export const selectFilteredTasks = createSelector(
  [selectItems, selectFilters],
  (items, filters) => {
    const { search, status, priority, dateRange } = filters;

    return items.filter((task) => {
      if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (status?.length && !status.includes(task.status)) return false;
      if (priority && task.priority !== priority) return false;

      if (dateRange) {
        const [from, to] = dateRange;
        const due = task.dueDate ? dayjs(task.dueDate) : null;
        if (!due) return false;
        if (due.isBefore(from, 'day') || due.isAfter(to, 'day')) return false;
      }
      return true;
    });
  }
);

export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectPagination],
  (filteredTasks, pagination) => {
    const { currentPage, pageSize } = pagination;
    const start = (currentPage - 1) * pageSize;
    return filteredTasks.slice(start, start + pageSize);
  }
);

export const selectTasks = createSelector(
  [selectItems, selectFilters, selectPagination],
  (items, filters, pagination) => {
    const { search, status, priority, dateRange } = filters;

    const { currentPage, pageSize } = pagination;
    const start = (currentPage - 1) * pageSize;

    return items
      .filter((task) => {
        if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
        if (status?.length && !status.includes(task.status)) return false;
        if (priority && task.priority !== priority) return false;

        if (dateRange) {
          const [from, to] = dateRange;
          const due = task.dueDate ? dayjs(task.dueDate) : null;
          if (!due) return false;
          if (due.isBefore(from, 'day') || due.isAfter(to, 'day')) return false;
        }
        return true;
      })
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
      .slice(start, start + pageSize);
  }
);

export const selectTaskStats = createSelector([selectItems], (items) => {
  const total = items.length;
  const todo = items.filter((t) => t.status === 'todo').length;
  const in_progress = items.filter((t) => t.status === 'in_progress').length;
  const done = items.filter((t) => t.status === 'done').length;

  return {
    total,
    todo,
    in_progress,
    done,
    percents: {
      todo: total > 0 ? Math.round((todo / total) * 100) : 0,
      in_progress: total > 0 ? Math.round((in_progress / total) * 100) : 0,
      done: total > 0 ? Math.round((done / total) * 100) : 0,
    },
  };
});

export const selectRecentTasks = createSelector([selectItems], (items) =>
  [...items]
    .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
    .slice(0, 5)
);

