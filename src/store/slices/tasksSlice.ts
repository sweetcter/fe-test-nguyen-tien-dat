import { MOCK_TASKS } from '@/mock/tasks';
import { type Task, type TaskFilter, type TaskStatus } from '@/types/task';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TasksState = {
  items: Task[];
  filters: TaskFilter;
  pagination: {
    currentPage: number;
    pageSize: number;
  };
  selectedIds: string[];
};

const initialState: TasksState = {
  items: MOCK_TASKS,
  filters: {
    search: '',
    status: [],
    priority: null,
    dateRange: null,
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
  selectedIds: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const newTasks = [...state.items];
      newTasks.push(action.payload);

      return {
        ...state,
        items: newTasks,
      };
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const payload = action.payload;
      const foundedTask = state.items.some((t) => t.id === payload.id);
      if (!foundedTask) return;

      return {
        ...state,
        items: state.items.map((t) => (t.id === payload.id ? payload : t)),
      };
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        items: state.items.filter((t) => t.id !== action.payload),
        selectedIds: state.selectedIds.filter((id) => id !== action.payload),
      };
    },
    deleteManyTasks: (state, action: PayloadAction<string[]>) => {
      const payload = action.payload;
      return {
        ...state,
        items: state.items.filter((t) => !payload.includes(t.id)),
        selectedIds: state.selectedIds.filter((id) => !payload.includes(id)),
      };
    },
    toggleSelectTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const idx = state.selectedIds.indexOf(id);
      if (idx === -1) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds.splice(idx, 1);
      }
    },
    toggleSelectAll: (state, action: PayloadAction<{ ids: string[]; checked: boolean }>) => {
      const { ids, checked } = action.payload;
      if (checked) {
        const newIds = ids.filter((id) => !state.selectedIds.includes(id));
        state.selectedIds.push(...newIds);
      } else {
        state.selectedIds = state.selectedIds.filter((id) => !ids.includes(id));
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const payload = action.payload;
      const foundedTask = state.items.some((t) => t.id === payload.id);
      if (!foundedTask) return;

      return {
        ...state,
        items: state.items.map((t) => (t.id === payload.id ? { ...t, status: payload.status } : t)),
      };
    },
    setFilter: (state, action: PayloadAction<Partial<TasksState['filters']>>) => {
      const payload = action.payload;

      return {
        ...state,
        filters: { ...state.filters, ...payload },
      };
    },
    resetFilters: (state) => {
      return {
        ...state,
        filters: initialState.filters,
      };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
      state.pagination.currentPage = 1;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  deleteManyTasks,
  toggleSelectTask,
  toggleSelectAll,
  clearSelection,
  updateTaskStatus,
  setFilter,
  resetFilters,
  setPage,
  setPageSize,
} = tasksSlice.actions;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
