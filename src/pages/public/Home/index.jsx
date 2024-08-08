import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "./Header";
import styles from "./styles.module.scss";

import { createNotePublic, deleteNotePublic, getNotesPublic } from "@/api/note";
import { ContainerScreen } from "@/components/ContainerScreen";
import { MessageComposer } from "@/components/MessageComposer";
import { MessageDisplay } from "@/components/MessageDisplay";
import { TYPE_MEDIA } from "@/global/constants";

export const Home = () => {
  const [notes, setNotes] = useState([]);

  const scrollContentRef = useRef(null);

  const navigate = useNavigate();

  const notifyNewNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    scrollContentToDown();
  };

  const createNewNote = async (text) => {
    return await createNotePublic(text);
  };

  const notifyDeleteMedia = async (id, typeMedia) => {
    if (typeMedia === TYPE_MEDIA.NOTE) {
      if (await deleteNotePublic(id)) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      }
    }
  };

  const scrollContentToDown = () => {
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollTop =
        scrollContentRef.current.scrollHeight;
    }
  };

  const initialize = async () => {
    const data = await getNotesPublic();

    if (Array.isArray(data)) {
      setNotes([...data]);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <ContainerScreen customClassName={styles.container}>
      <Header navigate={navigate} classNameWrap={styles.header} />

      <MessageDisplay
        classNameWrap={styles.content}
        notes={notes}
        notifyDelete={notifyDeleteMedia}
        containerRef={scrollContentRef}
      />

      <MessageComposer
        classNameWrap={styles.bottom}
        createNewNote={createNewNote}
        notifyNewNote={notifyNewNote}
      />
    </ContainerScreen>
  );
};
