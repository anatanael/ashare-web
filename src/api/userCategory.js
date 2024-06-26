import api from "@/api/api";
import { IS_DEV } from "@/global/constants";

export const getCategoriesApi = async () => {
  try {
    const response = await api.get("/user/category");
    const responseData = response.data;
    if (Array.isArray(responseData)) {
      return responseData;
    }
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }

  return false;
};

export const deleteCategoryApi = async (idCategory) => {
  try {
    await api.delete(`/user/category/${idCategory}`);
    return true;
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }

  return false;
};

export const saveCategoryApi = async (title) => {
  try {
    const response = await api.post("/user/category", { title });
    return response.data;
    // const response = await api.post("/user/category", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // return response.data;
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }

  return false;
};

export const updateCategoryImageApi = async (idCategory, picture) => {
  const formData = new FormData();
  formData.append("cover", picture);

  try {
    const response = await api.post(
      `/user/category/${idCategory}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }
};
