import { useMutation } from "@apollo/client";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BuyModal from "../components/BuyModal";
import RentModal from "../components/RentModal";
import {
  BUY_PRODUCT_TRANSACTION,
  RENT_PRODUCT_TRANSACTION,
} from "../graphql/transaction/mutations";
import { useAuth } from "../hooks/useAuth";
import { useProduct } from "../hooks/useProduct";

function ViewProduct() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [hasViewed] = useState(false);
  const [buyModalOpened, setBuyModalOpened] = useState(false);
  const [rentModalOpened, setRentModalOpened] = useState(false);

  const { product, loading, error } = useProduct(id!, !hasViewed);

  const [buyProduct] = useMutation(BUY_PRODUCT_TRANSACTION, {
    onCompleted: () => {
      notifications.show({
        title: "Product Purchased",
        message: "Product purchased successfully!",
        color: "teal",
      });
      setBuyModalOpened(false);
    },
    onError: (err) => {
      notifications.show({
        title: "Error",
        message: "An error occurred while purchasing the product.",
        color: "red",
      });
      console.error("GraphQL Error:", err);
    },
  });

  const [rentProduct] = useMutation(RENT_PRODUCT_TRANSACTION, {
    onCompleted: () => {
      notifications.show({
        title: "Product Rented",
        message: "Product rented successfully!",
        color: "teal",
      });
      setRentModalOpened(false);
    },
    onError: (err) => {
      notifications.show({
        title: "Error",
        message: "An error occurred while renting the product.",
        color: "red",
      });
      console.error("GraphQL Error:", err);
    },
  });

  if (!id)
    return (
      <div className="text-center mt-12 text-red-500">
        Error: Invalid product ID
      </div>
    );

  if (loading) return <div className="text-center mt-12">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-12 text-red-500">
        Error loading product
      </div>
    );

  const handleBuy = () => {
    if (!user) {
      notifications.show({
        title: "Authentication Required",
        message: "You need to log in to buy this product.",
        color: "red",
      });
      return;
    }

    buyProduct({
      variables: { productId: id, customerId: user.id },
    });
  };

  const handleRent = (rentTimeFrom: Date, rentTimeTo: Date) => {
    if (!user) {
      notifications.show({
        title: "Authentication Required",
        message: "You need to log in to rent this product.",
        color: "red",
      });
      return;
    }

    rentProduct({
      variables: {
        productId: id,
        customerId: user.id,
        rentTimeFrom: new Date(rentTimeFrom).toISOString(),
        rentTimeTo: new Date(rentTimeTo).toISOString(),
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{product.title}</h1>
      <p className="text-lg text-gray-600 mb-4">
        <strong>Categories:</strong> {product.categories}
      </p>
      <p className="text-lg text-gray-600 mb-4">
        <strong>Price:</strong> ${product.purchasePrice}
      </p>
      <p className="text-gray-700 leading-relaxed mb-6">
        {product.description}
      </p>
      <div className="flex justify-end space-x-4">
        <Button
          className="bg-[#6558F5] hover:bg-[#4D3DD9]"
          size="lg"
          onClick={() => setRentModalOpened(true)}
        >
          Rent
        </Button>
        <Button
          className="bg-[#6558F5] hover:bg-[#4D3DD9]"
          size="lg"
          onClick={() => setBuyModalOpened(true)}
        >
          Buy
        </Button>
      </div>

      <BuyModal
        opened={buyModalOpened}
        onClose={() => setBuyModalOpened(false)}
        onConfirm={handleBuy}
      />

      <RentModal
        opened={rentModalOpened}
        onClose={() => setRentModalOpened(false)}
        onConfirm={handleRent}
      />
    </div>
  );
}

export default ViewProduct;
