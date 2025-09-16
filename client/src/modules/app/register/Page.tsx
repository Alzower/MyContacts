import { useForm } from "react-hook-form";
import { registerNewUser } from "./register.service";

function Register() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    registerNewUser(data.email, data.login);
  });
  return (
    <>
      <div className="flex flex-col items-end justify-center min-h-screen bg-purple-200">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm min-h-screen bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Register Page
          </h1>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
          >
            Register
          </button>

          <div className="w-full flex justify-end">
            <a href="/" className="text-end text-blue-500 hover:underline">
              Go Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
