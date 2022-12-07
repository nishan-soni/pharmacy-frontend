import jwt_decode from "jwt-decode";

export default function isAdmin() {
  const token = localStorage.getItem("token");
  if (token) {
    const decode: { admin: boolean } = jwt_decode(token);
    if (decode.admin) {
      return true;
    }
  }
  return false;
}
