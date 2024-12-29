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
    rentTime: "DAY",
  });

  const [editProduct] = useMutation(EDIT_PRODUCT);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        categories: product.categories.split(", "),
        description: product.description,
        purchasePrice: product.purchasePrice.toString(),
        rentPrice: product.rentPrice.toString(),
        rentTime: product.rentTime,
      });
    }
  }, [product]);

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
          categories: formData.categories.join(", "),
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

  if (loading) return <div className="text-center mt-12">Loading...</div>;

  if (error)
    return (
      <div className="text-center mt-12 text-red-500">
        Error! {error.message}
      </div>
    );

  if (!product)
    return <div className="text-center mt-12">Product not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Edit Product
      </h1>
      <div className="space-y-6">
        {/* Title Input */}
        <TextInput
          label="Title"
          placeholder="Enter product title"
          value={formData.title}
          onChange={handleInputChange}
          name="title"
          className="w-full"
          required
        />

        {/* Categories MultiSelect */}
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
          className="w-full"
        />

        {/* Description TextArea */}
        <Textarea
          label="Description"
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleInputChange}
          name="description"
          minRows={6}
          required
          autosize
        />

        {/* Price and Rent Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NumberInput
            label="Purchase Price"
            placeholder="Enter price (e.g., 1500)"
            value={parseFloat(formData.purchasePrice) || undefined}
            onChange={(value) =>
              setFormData({
                ...formData,
                purchasePrice: value?.toString() || "",
              })
            }
            required
          />
          <div className="flex gap-4 items-end">
            <NumberInput
              label="Rent Price"
              placeholder="Enter rent price (e.g., 50)"
              value={parseFloat(formData.rentPrice) || undefined}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  rentPrice: value?.toString() || "",
                })
              }
              required
            />
            <Select
              placeholder="Select rent period"
              data={[
                { value: "DAY", label: "Per Day" },
                { value: "WEEK", label: "Per Week" },
                { value: "MONTH", label: "Per Month" },
              ]}
              value={formData.rentTime}
              onChange={handleRentTimeChange}
              className="mt-4"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-[#6558F5] hover:bg-[#4D3DD9]"
          >
            Edit Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
