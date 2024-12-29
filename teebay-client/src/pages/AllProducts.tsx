import { useQuery } from "@apollo/client";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/LoadingComponent";
import ProductCard from "../components/ProductCard";
import { GET_PRODUCTS } from "../graphql/product/queries";
import { Product } from "./MyProducts";

function AllProducts() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <Loading />;

  if (error) return <ErrorComponent errorMessage={error.message} />;

  const products = data?.getAllProducts || [];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <h2 className="font-bold text-3xl text-center mb-8 text-gray-800">
          All Products
        </h2>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="w-2/3 mx-auto grid grid-cols-1 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No products available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
