import React, { createContext, useContext, useEffect, useState } from "react";

import { deleteNotePrivate, deleteNotePublic } from "@/api/note";
import { TYPE_MEDIA } from "@/global/constants";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [appModeMessageSelection, setAppModeMessageSelection] = useState(false);

  const [appNotes, setAppNotes] = useState([]);
  const [appQtdSelectedNotes, setAppQtdSelectedNotes] = useState(0);

  const appStartModeMessageSelection = () => {
    setAppModeMessageSelection(true);
  };

  const appStopModeMessageSelection = () => {
    setAppModeMessageSelection(false);

    const newNotes = appNotes.map((note) => {
      return { ...note, selected: false };
    });

    setAppNotes(newNotes);
  };

  const appLoadNotes = (notes) => {
    if (Array.isArray(notes)) {
      const appNotes = notes.map((note) => {
        return {
          ...note,
          selected: false,
          typeMedia: TYPE_MEDIA.NOTE,
        };
      });

      setAppNotes(appNotes);
    }
  };

  const appNotifyNewNote = (newNote) => {
    setAppNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const appNotifyDeleteNote = async (id) => {
    const mediaToDelete = appNotes.find((note) => note.id === id);

    if (!mediaToDelete) {
      return;
    }

    const handleDeleteMedia = mediaToDelete.categoryId
      ? deleteNotePrivate
      : deleteNotePublic;

    if (await handleDeleteMedia(id)) {
      setAppNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  };

  const appNotifySelectNote = (idNote) => {
    if (!appModeMessageSelection) {
      appStartModeMessageSelection();
    }

    const newNotes = appNotes.map((note) => {
      if (note.id === idNote) {
        return {
          ...note,
          selected: !note.selected,
        };
      }
      return note;
    });

    setAppNotes(newNotes);
  };

  useEffect(() => {
    const countSelected = appNotes.filter(
      (note) => note.selected === true,
    ).length;

    if (!countSelected) {
      setAppModeMessageSelection(false);
    }

    setAppQtdSelectedNotes(countSelected);
  }, [appNotes]);

  return (
    <GlobalContext.Provider
      value={{
        appModeMessageSelection,
        appStartModeMessageSelection,
        appStopModeMessageSelection,
        appLoadNotes,
        appNotes,
        appNotifyNewNote,
        appNotifyDeleteNote,
        appNotifySelectNote,
        appQtdSelectedNotes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
