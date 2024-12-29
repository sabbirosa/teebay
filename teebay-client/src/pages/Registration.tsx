import { useMutation } from "@apollo/client";
import { Button, Input, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";
import { REGISTER_USER } from "../graphql/user/mutations";

export interface FormValues {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

function Registration() {
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const form = useForm<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstName: (value) => (value.trim() ? null : "First name is required"),
      lastName: (value) => (value.trim() ? null : "Last name is required"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      phoneNumber: (value) =>
        /^\d+$/.test(value) ? null : "Phone number must be numeric",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)
          ? null
          : "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      await registerUser({
        variables: {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        },
      });

      notifications.show({
        title: "Registration successful!",
        message: "You have successfully registered. Please login to continue.",
      });
    } catch (err) {
      notifications.show({
        title: "Registration failed",
        message: "An error occurred while registering. Please try again.",
        color: "red",
      });
      console.error("Error during registration:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        SIGN UP
      </h1>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        className="w-1/3 bg-white border border-gray-300 p-8 rounded-md shadow-md"
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4 w-full">
            <Input
              placeholder="First Name"
              {...form.getInputProps("firstName")}
              className="w-full"
            />
            <Input
              placeholder="Last Name"
              {...form.getInputProps("lastName")}
              className="w-full"
            />
          </div>
          <Input
            placeholder="Address"
            {...form.getInputProps("address")}
            className="w-full"
          />
          <div className="flex gap-4 w-full">
            <Input
              placeholder="Email"
              {...form.getInputProps("email")}
              className="w-full"
            />
            <Input
              placeholder="Phone Number"
              {...form.getInputProps("phoneNumber")}
              className="w-full"
            />
          </div>
          <PasswordInput
            placeholder="Password"
            {...form.getInputProps("password")}
            className="w-full"
          />
          <PasswordInput
            placeholder="Confirm Password"
            {...form.getInputProps("confirmPassword")}
            className="w-full"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-fit"
            size="md"
          >
            {loading ? "Registering..." : "REGISTER"}
          </Button>
          {error && (
            <p className="text-red-500 text-center">
              Registration failed: {error.message}
            </p>
          )}
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Registration;
