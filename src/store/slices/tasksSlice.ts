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
      };
    },
    deleteManyTasks: (state, action: PayloadAction<string[]>) => {
      const payload = action.payload;
      return {
        ...state,
        items: state.items.filter((t) => !payload.includes(t.id)),
      };
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
  updateTaskStatus,
  setFilter,
  resetFilters,
  setPage,
  setPageSize,
} = tasksSlice.actions;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
