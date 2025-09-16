import { axiosJWT } from "../../helper/axios/axios.helper";

export function getContactsByUser() {
  return axiosJWT().get(`${import.meta.env.VITE_API_URL}/contacts`);
}

export function createContact(
  lastName: string,
  firstName: string,
  phone: string
) {
  console.log(`${import.meta.env.VITE_API_URL}/contacts`);
  console.log("Creating contact:", { lastName, firstName, phone });
  return axiosJWT().post(
    `${import.meta.env.VITE_API_URL}/contacts`,
    JSON.stringify({ firstName, lastName, phone })
  );
}

export function deleteContact(id: string) {
  return axiosJWT().delete(`${import.meta.env.VITE_API_URL}/contacts/${id}`);
}

export function updateContact(
  id: string,
  lastName: string,
  firstName: string,
  phone: string
) {
  return axiosJWT().patch(
    `${import.meta.env.VITE_API_URL}/contacts/${id}`,
    JSON.stringify({ firstName, lastName, phone })
  );
}
