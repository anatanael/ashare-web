import api from "@/api/api";
import { IS_DEV } from "@/global/constants";

export const getNotesPublic = async () => {
  try {
    const response = await api.get("/note");
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

export const getNotesByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/user/note/category/${categoryId}`);
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

export const createNotePublic = async (text) => {
  try {
    const response = await api.post("/note", {
      text,
    });

    const noteDB = response.data;
    if (noteDB) {
      return noteDB;
    }
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }

  return false;
};

export const createNoteByCategory = async (categoryId, text) => {
  try {
    const response = await api.post(`/user/note/category/${categoryId}`, {
      text,
    });

    const noteDB = response.data;
    if (noteDB) {
      return noteDB;
    }
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }

  return false;
};

export const deleteNotePublic = async (idNote) => {
  try {
    await api.delete(`/note/${idNote}`);

    return true;
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }

  return false;
};

export const deleteNotePrivate = async (idNote) => {
  try {
    await api.delete(`/user/note/${idNote}`);

    return true;
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }

  return false;
};
