import { useForm } from "react-hook-form";
import { loginService } from "./login.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    loginService(data.email, data.password).then(() => navigate("/contacts"));
  });

  return (
    <>
      <div>Login Page</div>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <button type="submit">Login</button>
      </form>

      <a href="/register">Go Register</a>
    </>
  );
}

export default Login;
