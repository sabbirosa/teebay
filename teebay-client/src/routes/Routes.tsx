import { createBrowserRouter, Navigate } from "react-router-dom";
import AddProduct from "../pages/AddProduct";
import AllProdcuts from "../pages/AllProdcuts";
import Dashboard from "../pages/Dashboard";
import EditProduct from "../pages/EditProduct";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ViewProduct from "../pages/ViewProduct";

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
    path: "/dashboard/add-product",
    element: <AddProduct />,
  },
  {
    path: "/dashboard/edit-product/:id",
    element: <EditProduct />,
  },
  {
    path: "/view-product/:id",
    element: <ViewProduct />,
  },
  {
    path: "/all-products",
    element: <AllProdcuts />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
