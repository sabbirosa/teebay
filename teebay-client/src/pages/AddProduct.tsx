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
import { useState } from "react";
import { CREATE_PRODUCT } from "../graphql/product/mutations";
import { useAuth } from "../hooks/useAuth";

interface FormData {
  title: string;
  categories: string[];
  description: string;
  purchasePrice: string;
  rentPrice: string;
  rentTime: string;
}

const AddProduct = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    categories: [],
    description: "",
    purchasePrice: "",
    rentPrice: "",
    rentTime: "",
  });
  const { user } = useAuth();
  const [addProduct] = useMutation(CREATE_PRODUCT);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Select a title for your product
            </h2>
            <TextInput
              placeholder="Enter product title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </>
        );
      case 1:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Select categories
            </h2>
            <MultiSelect
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
              onChange={(value) =>
                setFormData({ ...formData, categories: value })
              }
            />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Provide a description
            </h2>
            <Textarea
              placeholder="Enter product description"
              styles={{ input: { height: 120 } }}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Set pricing
            </h2>
            <div className="space-y-4">
              <div>
                <NumberInput
                  placeholder="Enter purchase price"
                  label="Purchase Price"
                  value={formData.purchasePrice}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      purchasePrice: value?.toString() || "",
                    })
                  }
                />
              </div>
              <div>
                <p>Rent Price:</p>
                <div className="flex items-center space-x-4">
                  <NumberInput
                    placeholder="$50"
                    value={Number(formData.rentPrice) || undefined}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        rentPrice: value?.toString() || "",
                      })
                    }
                    styles={{ input: { maxWidth: 100 } }}
                  />
                  <Select
                    placeholder="Select option"
                    data={[
                      { value: "DAY", label: "Per Day" },
                      { value: "WEEK", label: "Per Week" },
                      { value: "MONTH", label: "Per Month" },
                    ]}
                    value={formData.rentTime}
                    onChange={(value) =>
                      setFormData({ ...formData, rentTime: value || "" })
                    }
                    styles={{ input: { maxWidth: 150 } }}
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Summary</h2>
            <div className="space-y-2">
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Categories:</strong> {formData.categories.join(", ")}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <p>
                <strong>Price:</strong> ${formData.purchasePrice}
              </p>
              <p>
                <strong>Rent:</strong> ${formData.rentPrice} {formData.rentTime}
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const nextStep = () => {
    if (activeStep < 4) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    try {
      addProduct({
        variables: {
          title: formData.title,
          categories: formData.categories.join(", "),
          description: formData.description,
          purchasePrice: Number(formData.purchasePrice),
          rentPrice: Number(formData.rentPrice),
          rentTime: formData.rentTime,
          ownerId: user?.id,
        },
      });
      notifications.show({
        title: "Product created",
        message: "Your product has been successfully created",
        color: "teal",
      });
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "An error occurred while creating the product",
        color: "red",
      });
      console.error("Error creating product:", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-1/2 mx-auto p-6 bg-white rounded shadow">
        {renderStepContent()}
        <div className="flex justify-between mt-6">
          <Button onClick={prevStep} disabled={activeStep === 0}>
            Back
          </Button>
          {activeStep === 4 ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={nextStep}>Next</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
