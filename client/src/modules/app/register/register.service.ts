import axios from "axios";

export async function registerNewUser(email: string, password: string) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        email,
        password,
      }
    );
    return {
      success: true,
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
