import { Button, Input, PasswordInput } from "@mantine/core";
import { Link } from "react-router-dom";

function Registration() {
  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        SIGN UP
      </h1>
      <div className="w-1/3 bg-white border border-gray-300 p-8 rounded-md shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input placeholder="First Name" className="w-full" />
            <Input placeholder="Last Name" className="w-full" />
          </div>
          <Input placeholder="Address" className="w-full" />
          <div className="flex gap-4">
            <Input placeholder="Email" className="w-full" />
            <Input placeholder="Phone Number" className="w-full" />
          </div>
          <PasswordInput placeholder="Password" className="w-full" />
          <PasswordInput placeholder="Confirm Password" className="w-full" />
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
            size="md"
          >
            REGISTER
          </Button>
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
