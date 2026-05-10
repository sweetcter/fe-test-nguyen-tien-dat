import { useAppDispatch } from '@/store';
import { addTask, updateTask } from '@/store/slices/tasksSlice';
import type { Task, TaskFormValues } from '@/types/task';
import { useState } from 'react';

export const useTaskAction = () => {
  const dispatch = useAppDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openAddModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeModal = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (values: TaskFormValues) => {
    const dueDate = values.dueDate?.format('YYYY-MM-DD');

    if (editingTask) {
      dispatch(
        updateTask({
          ...editingTask,
          ...values,
          dueDate,
          tags: values.tags ?? [],
        })
      );
    } else {
      dispatch(
        addTask({
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          ...values,
          dueDate,
          tags: values.tags ?? [],
        })
      );
    }

    closeModal();
  };

  return {
    isFormOpen,
    editingTask,
    openAddModal,
    openEditModal,
    closeModal,
    handleSaveTask,
  };
};
