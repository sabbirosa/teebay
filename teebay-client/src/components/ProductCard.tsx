import { Button, Modal } from "@mantine/core";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (isDashboard) {
      navigate(`/edit-product/${product.id}`);
    } else {
      navigate(`/view-product/${product.id}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true); // Open the modal
  };

  const confirmDelete = () => {
    setIsModalOpen(false);
    if (onDelete) {
      onDelete(product.id);
      notifications.show({
        title: "Product deleted",
        message: `${product.title} has been deleted successfully.`,
        color: "green",
      });
    } else {
      notifications.show({
        title: "Delete functionality not implemented",
        message: `Delete button clicked for ${product.title}`,
        color: "red",
      });
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullDescription((prev) => !prev);
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <Modal
        opened={isModalOpen}
        onClose={cancelDelete}
        title="Delete Product"
        centered
      >
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-end gap-4 mt-4">
          <Button color="red" onClick={cancelDelete}>
            No
          </Button>
          <Button
            className="bg-[#6558F5] hover:bg-[#4D3DD9]"
            onClick={confirmDelete}
          >
            Yes
          </Button>
        </div>
      </Modal>

      {/* Product Card */}
      <div
        className="p-4 mb-4 border border-gray-200 shadow-sm bg-white cursor-pointer"
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
    </>
  );
}

export default ProductCard;
