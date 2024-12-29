import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/LoadingComponent";
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

function MyProducts() {
  const { user, logout } = useAuth();

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  // Fetch user's products
  const { data, loading, error } = useQuery(GET_PRODUCTS_BY_OWNER, {
    variables: { ownerId: user?.id },
    skip: !user,
  });

  if (loading) return <Loading />;
  if (error) return <ErrorComponent errorMessage={error.message} />;

  const products = data?.getUserProducts || [];

  const handleLogout = () => {
    logout();
    notifications.show({
      title: "Logout successful!",
      message: "You have successfully logged out.",
      color: "green",
    });
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct({
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
      {/* Logout Button */}
      <div className="grid grid-cols-1 place-items-end mb-6 mx-4">
        <Button
          onClick={handleLogout}
          className="bg-[#D3455B] hover:bg-[#D8374F]"
        >
          Logout
        </Button>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="font-bold text-3xl text-gray-800">Your Products</h2>
        </div>

        {/* Products List */}
        {products.length > 0 ? (
          <div className="w-2/3 mx-auto grid grid-cols-1 gap-6">
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
        ) : (
          <p className="text-center text-gray-600">
            You have not added any products yet.
          </p>
        )}

        {/* Add Product Button */}
        <div className="w-2/3 mx-auto flex justify-end mt-10">
          <Button className="bg-[#6558F5] hover:bg-[#4D3DD9]">
            <Link to="/add-product">Add Product</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
