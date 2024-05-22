import axios from "axios";

import { LS_KEY_ACCESS_TOKEN } from "@/global/constants";

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const setAuthHeader = (token) => {
  api.defaults.headers.common["Authorization"] = token;
};

export const removeAuthHeader = () => {
  delete api.defaults.headers.common["Authorization"];
};

const storedToken = localStorage.getItem(LS_KEY_ACCESS_TOKEN);

if (storedToken) {
  setAuthHeader(storedToken);
} else {
  removeAuthHeader();
}

export default api;
