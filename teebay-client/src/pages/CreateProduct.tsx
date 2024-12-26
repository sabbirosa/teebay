import {
  Button,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

interface FormData {
  title: string;
  categories: string[];
  description: string;
  purchasePrice: string;
  rentPrice: string;
  rentDuration: string;
}

const CreateProduct = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    categories: [],
    description: "",
    purchasePrice: "",
    rentPrice: "",
    rentDuration: "",
  });

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
                      { value: "per day", label: "Per Day" },
                      { value: "per week", label: "Per Week" },
                      { value: "per month", label: "Per Month" },
                    ]}
                    value={formData.rentDuration}
                    onChange={(value) =>
                      setFormData({ ...formData, rentDuration: value || "" })
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
                <strong>Rent:</strong> ${formData.rentPrice}{" "}
                {formData.rentDuration}
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
    console.log("Form Submitted", formData);
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

export default CreateProduct;
