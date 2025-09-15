import axios from "axios";

export async function loginService(email: string, password: string) {
  try {
    const response = await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        addJWTToLocalStorage(res.data);
        return res;
      });
    return {
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw error;
    }
  }
}

function addJWTToLocalStorage(token: string) {
  localStorage.setItem("jwt_token", token);
}
