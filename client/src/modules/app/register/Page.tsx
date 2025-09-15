import { useForm } from "react-hook-form";
import { registerNewUser } from "./register.service";

function Register() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    registerNewUser(data.email, data.login);
  });
  return (
    <>
      <div>Register Page</div>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" {...register("email")} />
        <input type="password" placeholder="Password" {...register("login")} />
        <button type="submit">Register</button>
      </form>

      <a href="/">Go Login</a>
    </>
  );
}

export default Register;
