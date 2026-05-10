import { useAppDispatch, useTypeSelector } from '@/store';
import { selectSelectedIds } from '@/store/selectors/tasksSelector';
import { toggleSelectAll, toggleSelectTask } from '@/store/slices/tasksSlice';
import { Checkbox } from 'antd';
import { useMemo } from 'react';

export const SelectAllCheckbox = ({ pageIds }: { pageIds: string[] }) => {
  const dispatch = useAppDispatch();
  const selectedIds = useTypeSelector(selectSelectedIds);

  const { checked, indeterminate } = useMemo(() => {
    if (pageIds.length === 0) return { checked: false, indeterminate: false };
    const selectedOnPage = pageIds.filter((id) => selectedIds.includes(id));
    return {
      checked: selectedOnPage.length === pageIds.length,
      indeterminate: selectedOnPage.length > 0 && selectedOnPage.length < pageIds.length,
    };
  }, [pageIds, selectedIds]);

  const handleChange = (e: { target: { checked: boolean } }) => {
    dispatch(toggleSelectAll({ ids: pageIds, checked: e.target.checked }));
  };

  return <Checkbox checked={checked} indeterminate={indeterminate} onChange={handleChange} />;
};

export const RowCheckbox = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const selectedIds = useTypeSelector(selectSelectedIds);
  const isChecked = selectedIds.includes(id);

  const handleChange = () => {
    dispatch(toggleSelectTask(id));
  };

  return <Checkbox checked={isChecked} onChange={handleChange} />;
};
