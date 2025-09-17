import { useForm } from "react-hook-form";
import { loginService } from "./login.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const onSubmit = handleSubmit((data) => {
    loginService(data.email, data.password)
      .then(() => navigate("/contacts"))
      .catch(() => {
        setErrorMessage("Erreur lors de la connexion.");
      });
  });

  return (
    <>
      <div className="flex flex-col items-end justify-center min-h-screen bg-green-200">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm min-h-screen bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Login Page</h1>
          {errorMessage && (
            <div className="w-full p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {errorMessage}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Login
          </button>
          <div className="w-full flex justify-end">
            <a
              href="/register"
              className="text-end text-blue-500 hover:underline"
            >
              Go Register
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
