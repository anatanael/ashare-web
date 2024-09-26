import { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

import {
  styleHideMessageCompose,
  styleShowMessageCompose,
} from "./animation.styles";
import { MainHeader } from "./MainHeader";
import styles from "./styles.module.scss";

import { createNoteByCategory, getNotesByCategory } from "@/api/note";
import { MenuModeSelection } from "@/components/MenuModeSelection";
import { MessageComposer } from "@/components/MessageComposer";
import { MessageDisplay } from "@/components/MessageDisplay";
import { useGlobalContext } from "@/context/global";
import { usePrivateContext } from "@/context/private";

export const Main = () => {
  const { appCategorySelected } = usePrivateContext();
  const { appLoadNotes, appNotes, appModeMessageSelection } =
    useGlobalContext();

  const scrollContentRef = useRef(null);

  const messageComposerStyle = useSpring(
    !appModeMessageSelection
      ? styleShowMessageCompose
      : styleHideMessageCompose,
  );

  const menuSelectionStyle = useSpring(
    appModeMessageSelection ? styleShowMessageCompose : styleHideMessageCompose,
  );

  const createNewNote = async (text) => {
    return await createNoteByCategory(appCategorySelected.id, text);
  };

  useEffect(() => {
    async function main() {
      const dataDB = await getNotesByCategory(appCategorySelected.id);
      appLoadNotes(dataDB);
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
      </div>
    )
  );
};
