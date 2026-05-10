import { useAppDispatch, useTypeSelector } from '@/store';
import {
  selectFilteredTasks,
  selectPaginatedTasks,
  selectTasks,
} from '@/store/selectors/tasksSelector';
import { resetFilters, setFilter, setLoading, setPage, setPageSize } from '@/store/slices/tasksSlice';
import type { TaskFilter, TaskPriority, TaskStatus } from '@/types/task';
import type { FilterValues } from './_table.type';
import { useEffect, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';

const useTable = () => {
  const dispatch = useAppDispatch();

  const filteredTasks = useTypeSelector(selectFilteredTasks);
  const paginatedTasks = useTypeSelector(selectPaginatedTasks);
  const tasks = useTypeSelector(selectTasks);
  const filters = useTypeSelector((state) => state.tasks.filters);
  const isLoading = useTypeSelector((state) => state.tasks.isLoading);
  const { currentPage, pageSize } = useTypeSelector((state) => state.tasks.pagination);

  const triggerLoading = useCallback(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  }, [dispatch]);

  const syncToUrl = useCallback((currentFilters: TaskFilter, page: number, size: number) => {
    const params = new URLSearchParams();

    if (currentFilters.search) params.set('q', currentFilters.search);
    if (currentFilters.status?.length) params.set('status', currentFilters.status.join(','));
    if (currentFilters.priority) params.set('priority', currentFilters.priority);
    if (currentFilters.dateRange) {
      params.set('from', currentFilters.dateRange[0].format('YYYY-MM-DD'));
      params.set('to', currentFilters.dateRange[1].format('YYYY-MM-DD'));
    }
    if (page > 1) params.set('page', page.toString());
    if (size !== 10) params.set('pageSize', size.toString());

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  }, []);

  const handleFilterChange = (values: FilterValues<TaskFilter>) => {
    triggerLoading();
    const newFilters = { ...filters, ...values };
    dispatch(setFilter(values));
    dispatch(setPage(1));
    syncToUrl(newFilters, 1, pageSize);
  };

  const handlePageChange = (page: number, size?: number) => {
    triggerLoading();
    const finalSize = size ?? pageSize;
    if (size && size !== pageSize) {
      dispatch(setPageSize(size));
      syncToUrl(filters, 1, size);
    } else {
      dispatch(setPage(page));
      syncToUrl(filters, page, finalSize);
    }
  };

  const reset = () => {
    triggerLoading();
    dispatch(resetFilters());
    dispatch(setPage(1));
    dispatch(setPageSize(10));
    syncToUrl(
      {
        search: '',
        status: [],
        priority: null,
        dateRange: null,
      },
      1,
      10
    );
  };

  useEffect(() => {
    triggerLoading();
    const params = new URLSearchParams(window.location.search);
    const urlFilters: Partial<TaskFilter> = {};

    const q = params.get('q');
    if (q) urlFilters.search = q;

    const status = params.get('status');
    if (status) urlFilters.status = status.split(',') as TaskStatus[];

    const priority = params.get('priority');
    if (priority) urlFilters.priority = priority as TaskPriority;

    const from = params.get('from');
    const to = params.get('to');
    if (from && to) {
      urlFilters.dateRange = [dayjs(from), dayjs(to)];
    }

    if (Object.keys(urlFilters).length > 0) {
      dispatch(setFilter(urlFilters));
    }

    const page = params.get('page');
    if (page) {
      dispatch(setPage(parseInt(page, 10)));
    }

    const size = params.get('pageSize');
    if (size) {
      dispatch(setPageSize(parseInt(size, 10)));
    }
  }, []);

  const isFiltered = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.status.length > 0 ||
      filters.priority !== null ||
      filters.dateRange !== null ||
      pageSize > 10 ||
      currentPage > 1
    );
  }, [filters, currentPage, pageSize]);

  return {
    tasks,
    isLoading,
    filteredTasks,
    paginatedTasks,

    filters,
    isFiltered,
    reset,
    handleFilterChange,
    handlePageChange,
  };
};


export default useTable;
