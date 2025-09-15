export function haveJWTToken() {
  return !!localStorage.getItem("jwt_token");
}
