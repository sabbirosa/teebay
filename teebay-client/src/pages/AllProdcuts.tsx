import { useQuery } from "@apollo/client";
import ProductCard from "../components/ProductCard";
import { GET_PRODUCTS } from "../graphql/product/queries";
import { Product } from "./Dashboard";

function AllProdcuts() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {data?.getAllProducts.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default AllProdcuts;
