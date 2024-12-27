import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    categories: string;
    description: string;
    purchasePrice: number;
    rentPrice: number;
    rentTime: string;
    views?: number;
    createdAt?: string;
  };
  onDelete?: (productId: string) => void;
  isDashboard?: boolean;
  showDateAndViews?: boolean;
}

function ProductCard({
  product,
  onDelete,
  isDashboard = false,
  showDateAndViews = true,
}: ProductCardProps) {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleCardClick = () => {
    if (isDashboard) {
      navigate(`edit-product/${product.id}`);
    } else {
      navigate(`/view-product/${product.id}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(product.id);
    } else {
      notifications.show({
        title: "Delete functionality not implemented",
        message: `Delete button clicked for ${product.title}`,
        color: "red",
      });
    }
  };

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setShowFullDescription((prev) => !prev);
  };

  return (
    <div
      className="p-4 border border-gray-200 shadow-sm bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-700">{product.title}</h2>
        {isDashboard && (
          <button
            onClick={handleDeleteClick}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTrash />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500">
        Categories: {product.categories.split(", ").join(", ")}
      </p>
      <p className="text-gray-700">
        {showFullDescription
          ? product.description
          : `${product.description.slice(0, 100)}...`}
        {product.description.length > 100 && (
          <button
            onClick={toggleDescription}
            className="ml-2 text-blue-500 hover:underline"
          >
            {showFullDescription ? "Show Less" : "More Details"}
          </button>
        )}
      </p>
      {showDateAndViews && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-400 mt-2">
            Date posted:{" "}
            {product.createdAt &&
              new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(parseInt(product.createdAt)))}
          </p>
          <p className="text-xs text-gray-400 mt-2">Views: {product.views}</p>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
