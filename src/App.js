import React from "react";
import { AddTodo, AllTodos, EditTodo } from "./screens";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppRoutes } from "./router/route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={AppRoutes.allTodo} />
  },
  {
    path: AppRoutes.allTodo,
    element: <AllTodos />
  },
  {
    path: AppRoutes.addTodo,
    element: <AddTodo />
  },
  {
    path: AppRoutes.editTodo,
    element: <EditTodo />
  }
])

function App() {
  return (<RouterProvider router={router} />);
}

export default App;