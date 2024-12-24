import { Button, Input, PasswordInput } from "@mantine/core";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        SIGN IN
      </h1>
      <div className="w-1/3 bg-white border border-gray-300 p-8 rounded-md shadow-md">
        <div className="flex flex-col gap-6 items-center">
          <Input placeholder="Email" className="w-full" />
          <PasswordInput placeholder="Password" className="w-full" />
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-fit"
            size="md"
          >
            LOGIN
          </Button>
          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="text-indigo-600 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
