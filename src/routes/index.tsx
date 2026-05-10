import MainLayout from '@/components/layout/MainLayout';
import { Task } from '@/features';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Task.Dashboard />,
      },
      {
        path: 'task',
        element: <Task.List />,
      },
    ],
  },
]);
