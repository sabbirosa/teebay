import { useMutation, useQuery } from "@apollo/client";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { DELETE_PRODUCT } from "../graphql/product/mutations";
import { GET_PRODUCTS_BY_OWNER } from "../graphql/product/queries";
import { useAuth } from "../hooks/useAuth";

export interface Product {
  id: string;
  title: string;
  categories: string;
  description: string;
  purchasePrice: number;
  rentPrice: number;
  rentTime: string;
  views?: number;
  createdAt?: string;
}

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    notifications.show({
      title: "Logout successful!",
      message: "You have successfully logged out.",
      color: "green",
    });
    navigate("/login");
  };

  // Fetch user's products
  const { data, loading, error } = useQuery(GET_PRODUCTS_BY_OWNER, {
    variables: { ownerId: user?.id },
    skip: !user,
  });

  if (loading)
    return <div className="text-center mt-8 text-gray-600">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-8 text-red-600">
        Error loading products
      </div>
    );

  const products = data?.getUserProducts || [];

  const handleDelete = (productId: string) => {
    // Implement delete functionality here
    try {
      deleteProduct({
        variables: { id: productId },
        update(cache) {
          cache.modify({
            fields: {
              getUserProducts(existingProducts = [], { readField }) {
                return existingProducts.filter(
                  (productRef: { __ref: string }) =>
                    productId !== readField("id", productRef)
                );
              },
            },
          });
        },
      });
      notifications.show({
        title: "Product deleted",
        message: "Product deleted successfully",
        color: "green",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      notifications.show({
        title: "Error deleting product",
        message: "An error occurred while deleting the product",
        color: "red",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="grid grid-cols-1 place-items-end mb-10 mx-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">My Products</h1>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              isDashboard
              showDateAndViews
            />
          ))}
        </div>

        {/* Add Product Button */}
        <div className="grid grid-cols-1 place-items-end mt-10">
          <button
            onClick={() => navigate("add-product")}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
