import { Axios } from "axios";

export function axiosJWT() {
  return new Axios({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      "Content-Type": "application/json",
    },
  });
}
