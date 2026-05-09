import "@/App.css";
import { Task } from "@/features";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Task.Dashboard />,
      },
      {
        path: "task",
        element: <Task.List />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
