import { type Task, type TaskPriority, type TaskStatus } from "@/types/task";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TasksState = {
  items: Task[];
  filters: {
    searchText: string;
    status: TaskStatus[];
    priority: TaskPriority;
    dateRange: [string, string] | null;
  };
  pagination: {
    currentPage: number;
    pageSize: number;
  };
};

const initialState: TasksState = {
  items: [],
  filters: {
    searchText: "",
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
  name: "tasks",
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
    updateTask: (state, action: PayloadAction<Task>) => {},
    deleteTask: (state, action: PayloadAction<string>) => {},
    deleteManyTasks: (state, action: PayloadAction<string[]>) => {},
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {},
    setFilter: (state, action: PayloadAction<Partial<TasksState["filters"]>>) => {},
    resetFilters: (state) => {},
    setPage: (state, action: PayloadAction<number>) => {},
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
} = tasksSlice.actions;

const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
