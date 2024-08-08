import api from "@/api/api";
import { IS_DEV } from "@/global/constants";

export const createNotePublic = async (text) => {
  try {
    const response = await api.post("/public/note", {
      text,
    });

    const noteDB = response.data.note;

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
export const getNotesPublic = async () => {
  try {
    const response = await api.get("/public/note");
    const responseData = response.data.notes;
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

export const deleteNotePublic = async (idNote) => {
  try {
    await api.delete(`/public/note/${idNote}`);

    return true;
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }

  return false;
};

export const getNotesByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/category/${categoryId}/notes`);
    const responseData = response.data.notes;
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

export const createNoteByCategory = async (categoryId, text) => {
  try {
    const response = await api.post("/note", {
      text,
      categoryId,
    });

    const note = response.data.note;

    if (note) {
      return note;
    }
  } catch (err) {
    if (IS_DEV) {
      console.log(err);
    }
  }

  return false;
};

export const deleteNotePrivate = async (idNote) => {
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
