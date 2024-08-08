import Cookies from "js-cookie";

import api from "@/api/api";
import { IS_DEV, LS_KEY_ACCESS_TOKEN } from "@/global/constants";

const validateToken = async (token) => {
  try {
    await api.post("/validateToken", { token });

    return true;
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }

    return false;
  }
};

export const getAccessTokenLocalStorage = () => {
  return localStorage.getItem(LS_KEY_ACCESS_TOKEN);
};

export const validateAccessToken = async () => {
  const token = getAccessTokenLocalStorage();

  if (!token) {
    return false;
  }

  return await validateToken(token);
};

export const handleLoginSuccess = async (token, user) => {
  const nameUser = user.name || "";

  localStorage.setItem(LS_KEY_ACCESS_TOKEN, token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  Cookies.set("name", nameUser, { expires: 1 });
};

export const logoutAuth = () => {
  localStorage.removeItem(LS_KEY_ACCESS_TOKEN);
  delete api.defaults.headers.common["Authorization"];
  Cookies.remove("name");
};
