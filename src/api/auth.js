import api from "@/api/api";
import { IS_DEV } from "@/global/constants";

export const loginApi = async (dataUser) => {
  try {
    const response = await api.post("/login", dataUser);

    return response.data;
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }

    const { response } = err;
    const codeResponse = (response && response.status) || 500;

    return {
      err: true,
      code: codeResponse,
    };
  }
};

export const createAccountApi = async (dataUser) => {
  try {
    const response = await api.post("/user", dataUser);

    return response.data;
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }

    return {
      err: true,
      code: err.response.status,
    };
  }
};
