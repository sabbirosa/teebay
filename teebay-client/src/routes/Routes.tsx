import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  AddProduct,
  AllProducts,
  EditProduct,
  History,
  Login,
  MyProducts,
  Registration,
  ViewProduct,
} from "../components/LazyComponents";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

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
    element: <PrivateRoute />,
    children: [
      {
        path: "/my-products",
        element: <MyProducts />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/view-product/:id",
        element: <ViewProduct />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
