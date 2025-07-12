import { isAxiosError } from "axios";
import api from "../config/axios";

export async function login({ email, password }) {
  try {
    const { data } = await api.post(`/auth/login`, { Email: email, password });
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(`${error}`);
    }
  }
}

export async function getUser() {
  try {
    const { data } = await api.get(`/auth/user`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(`${error}`);
    }
  }
}
