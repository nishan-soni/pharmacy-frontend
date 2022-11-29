import axios from "axios";
import { routes } from "../util/routes";

/**
 * Sets the auth token for axios, if the token param is empty then delete the token from local storage
 * @param token The JWT token
 */
export function setAuthHeader(token: string) {
  console.log(token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = "";
  }
}

/**
 * Sends post request to log the pharmacist in
 * @param email
 * @param password
 * @returns The auth token
 */
export async function pharmacistLogin(email: string, password: string) {
  let response = await axios.post(`${routes.API_URL}/pharmacists/login`, {
    email,
    password,
  });
  if (response.status === 401) {
    return false;
  }
  let token = response.data.token;
  setAuthHeader(token);
  return true;
}

/**
 * Sends post request to log the employee in
 * @param email
 * @param password
 * @returns The auth token
 */
export async function employeeLogin(email: string, password: string) {
  let response = await axios.post(`${routes.API_URL}/pharmacists/login`, {
    email,
    password,
  });
  if (response.status === 401) {
    return false;
  }
  let token = response.data.token;
  setAuthHeader(token);
  return true;
}

export async function register(data: any) {
  // Register as employee
  if (data.Pharmacist_ID === undefined) {
    const response = await axios.post(`${routes.API_URL}/employees/register`, {
      ...data,
    });
    if (response.status === 500) {
      return false;
    }
    let token = response.data.token;
    setAuthHeader(token);
    return true;
  } else {
    const response = await axios.post(
      `${routes.API_URL}/pharmacists/register`,
      {
        ...data,
      }
    );
    if (response.status === 500) {
      return false;
    }
    let token = response.data.token;
    setAuthHeader(token);
    return true;
  }
}
