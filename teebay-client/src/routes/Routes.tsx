import { createBrowserRouter, Navigate } from "react-router-dom";
import CreateProduct from "../pages/CreateProduct";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "create-product",
    element: <CreateProduct />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
