import { Button } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

function ViewProduct() {
  const { id } = useParams<{ id: string }>();
  const [hasViewed, setHasViewed] = useState(false);

  const { product, loading, error } = useProduct(id!, !hasViewed);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error loading product</div>;

  if (!hasViewed) {
    setHasViewed(true);
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-lg text-gray-600 mb-2">
        <strong>Categories:</strong> {product.categories}
      </p>
      <p className="text-lg text-gray-600 mb-4">
        <strong>Price:</strong> ${product.purchasePrice}
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">
        {product.description}
      </p>
      <div className="flex justify-end space-x-4">
        <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
          Rent
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
          Buy
        </Button>
      </div>
    </div>
  );
}

export default ViewProduct;
