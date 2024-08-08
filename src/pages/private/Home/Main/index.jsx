import { useEffect, useRef, useState } from "react";

import { MainHeader } from "./MainHeader";
import styles from "./styles.module.scss";

import {
  createNoteByCategory,
  deleteNotePrivate,
  getNotesByCategory,
} from "@/api/note";
import { MessageComposer } from "@/components/MessageComposer";
import { MessageDisplay } from "@/components/MessageDisplay";
import { usePrivateContext } from "@/context/Private";
import { TYPE_MEDIA } from "@/global/constants";

export const Main = () => {
  const { appCategorySelected } = usePrivateContext();

  const [notes, setNotes] = useState([]);

  const scrollContentRef = useRef(null);

  const notifyNewNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);

    scrollContentToDown();
  };

  const createNewNote = async (text) => {
    return await createNoteByCategory(appCategorySelected.id, text);
  };

  const scrollContentToDown = () => {
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollTop =
        scrollContentRef.current.scrollHeight;
    }
  };

  const notifyDeleteMedia = async (id, typeMedia) => {
    if (typeMedia === TYPE_MEDIA.NOTE) {
      if (await deleteNotePrivate(id)) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      }
    }
  };

  useEffect(() => {
    async function main() {
      const data = await getNotesByCategory(appCategorySelected.id);
      if (Array.isArray(data)) {
        setNotes([...data]);
      }
    }

    if (appCategorySelected) {
      main();
    }
  }, [appCategorySelected]);

  return (
    appCategorySelected && (
      <div className={styles.container}>
        <MainHeader />

        <MessageDisplay
          classNameWrap={styles.content}
          notes={notes}
          notifyDelete={notifyDeleteMedia}
          containerRef={scrollContentRef}
        />

        <MessageComposer
          classNameWrap={styles.footer}
          createNewNote={createNewNote}
          notifyNewNote={notifyNewNote}
        />
      </div>
    )
  );
};
