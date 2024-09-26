import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";

import {
  styleHideMessageCompose,
  styleShowMessageCompose,
} from "./animation.styles";
import { Header } from "./Header";
import styles from "./styles.module.scss";

import { createNotePublic, getNotesPublic } from "@/api/note";
import { ContainerScreen } from "@/components/ContainerScreen";
import { MenuModeSelection } from "@/components/MenuModeSelection";
import { MessageComposer } from "@/components/MessageComposer";
import { MessageDisplay } from "@/components/MessageDisplay";
import { useGlobalContext } from "@/context/global";

export const Home = () => {
  const { appLoadNotes, appNotes, appModeMessageSelection } =
    useGlobalContext();

  const scrollContentRef = useRef(null);

  const navigate = useNavigate();

  const messageComposerStyle = useSpring(
    !appModeMessageSelection
      ? styleShowMessageCompose
      : styleHideMessageCompose,
  );

  const menuSelectionStyle = useSpring(
    appModeMessageSelection ? styleShowMessageCompose : styleHideMessageCompose,
  );

  const createNewNote = async (text) => {
    return await createNotePublic(text);
  };

  const initialize = async () => {
    const data = await getNotesPublic();
    appLoadNotes(data);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <ContainerScreen customClassName={styles.container}>
      {!appModeMessageSelection && (
        <Header navigate={navigate} classNameWrap={styles.header} />
      )}

      <MessageDisplay
        classNameWrap={styles.content}
        notes={appNotes}
        containerRef={scrollContentRef}
      />
      <animated.div style={messageComposerStyle} className={styles.bottom}>
        <MessageComposer
          createNewNote={createNewNote}
          classNameWrap={styles.bottomResize}
        />
      </animated.div>

      <animated.div style={menuSelectionStyle} className={styles.bottom}>
        <MenuModeSelection />
      </animated.div>
    </ContainerScreen>
  );
};
