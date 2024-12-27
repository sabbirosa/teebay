import { useMutation } from "@apollo/client";
import {
  Button,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EDIT_PRODUCT } from "../graphql/product/mutations";
import { useProduct } from "../hooks/useProduct";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch product data using custom hook
  const { product, loading, error } = useProduct(id!, false);

  const [formData, setFormData] = useState<{
    title: string;
    categories: string[];
    description: string;
    purchasePrice: string;
    rentPrice: string;
    rentTime: string;
  }>({
    title: "",
    categories: [],
    description: "",
    purchasePrice: "",
    rentPrice: "",
    rentTime: "per hr",
  });

  const [editProduct] = useMutation(EDIT_PRODUCT);

  // Prefill form when product data is loaded
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        categories: product.categories.split(", "), // Split string categories into an array
        description: product.description,
        purchasePrice: product.purchasePrice.toString(),
        rentPrice: product.rentPrice.toString(),
        rentTime: product.rentTime,
      });
    }
  }, [product]);

  // Input handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoriesChange = (value: string[]) => {
    setFormData((prev) => ({ ...prev, categories: value }));
  };

  const handleRentTimeChange = (value: string | null) => {
    setFormData((prev) => ({ ...prev, rentTime: value || "" }));
  };

  const handleSubmit = async () => {
    try {
      await editProduct({
        variables: {
          id,
          title: formData.title,
          categories: formData.categories.join(", "), // Join categories array into a string
          description: formData.description,
          purchasePrice: parseFloat(formData.purchasePrice),
          rentPrice: parseFloat(formData.rentPrice),
          rentTime: formData.rentTime,
        },
      });
      notifications.show({
        title: "Product updated",
        message: "Your product has been successfully updated.",
        color: "teal",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update the product.",
        color: "red",
      });
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error! {error.message}</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-semibold mb-6 text-center">Edit Product</h1>
      <div className="space-y-6">
        <TextInput
          label="Title"
          placeholder="Enter product title"
          value={formData.title}
          onChange={handleInputChange}
          name="title"
          required
        />
        <MultiSelect
          label="Categories"
          placeholder="Select categories"
          data={[
            "Electronics",
            "Furniture",
            "Home Appliances",
            "Sporting Goods",
            "Outdoor",
            "Toys",
          ]}
          value={formData.categories}
          onChange={handleCategoriesChange}
        />
        <Textarea
          label="Description"
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleInputChange}
          name="description"
          minRows={6}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <NumberInput
            label="Price"
            placeholder="$1500"
            value={parseFloat(formData.purchasePrice) || undefined}
            onChange={(value) =>
              setFormData({
                ...formData,
                purchasePrice: value?.toString() || "",
              })
            }
            required
          />
          <div>
            <NumberInput
              label="Rent"
              placeholder="$50"
              value={parseFloat(formData.rentPrice) || undefined}
              onChange={(value) =>
                setFormData({ ...formData, rentPrice: value?.toString() || "" })
              }
              required
            />
            <Select
              placeholder="Select option"
              data={[
                { value: "per hr", label: "Per Hour" },
                { value: "per day", label: "Per Day" },
                { value: "per week", label: "Per Week" },
              ]}
              value={formData.rentTime}
              onChange={handleRentTimeChange}
              className="mt-2"
              required
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          fullWidth
          className="mt-4 bg-blue-600 hover:bg-blue-700"
        >
          Edit Product
        </Button>
      </div>
    </div>
  );
};

export default EditProduct;
