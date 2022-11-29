export function hasJWT() {
  //check user has JWT token
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}
