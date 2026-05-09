import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "@/store";

export const selectTasksState = (state: RootState) => state.tasks;
export const selectItems = (state: RootState) => state.tasks.items;
export const selectFilters = (state: RootState) => state.tasks.filters;
export const selectPagination = (state: RootState) => state.tasks.pagination;

export const selectAllTasks = createSelector([selectItems], (items) => items);

export const selectFilteredTasks = createSelector(
  [selectItems, selectFilters],
  (items, filters) => {
    return items;
  }
);

export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectPagination],
  (filteredTasks, pagination) => {
    return filteredTasks;
  }
);

export const selectTaskStats = createSelector([selectItems], (items) => {
  return {};
});
