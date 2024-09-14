import { useEffect, useRef, useState } from "react";
import { IoCloseCircle, IoHappyOutline, IoSendSharp } from "react-icons/io5";
import { animated, useSpring } from "react-spring";

import {
  styleContainerHideBtnSend,
  styleContainerShowBtnSend,
  styleHideAreaEmoji,
  styleHideBtnSend,
  styleShowAreaEmoji,
  styleShowBtnSend,
} from "./animation.styles";
import styles from "./styles.module.scss";
import { EmojiPickerCustom } from "../EmojiPicker";

import { LimitedTextarea } from "@/components/LimitedTextarea";

export const MessageComposer = ({
  classNameWrap = "",
  createNewNote,
  notifyNewNote = false,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiContainer, setShowEmojiContainer] = useState(false);

  const messageInputTrim = messageInput.trim();

  const containerRef = useRef(null);
  const containerStyle = useSpring(
    messageInputTrim ? styleContainerShowBtnSend : styleContainerHideBtnSend,
  );
  const btnSendStyle = useSpring(
    messageInputTrim ? styleShowBtnSend : styleHideBtnSend,
  );

  const emojiAreaStyle = useSpring(
    showEmojiContainer ? styleShowAreaEmoji : styleHideAreaEmoji,
  );

  const handleSendNote = async (messageInput) => {
    const text = messageInput.trim();

    if (text) {
      const noteDb = await createNewNote(text);

      if (noteDb) {
        document.activeElement.blur();
        setMessageInput("");

        if (notifyNewNote) {
          notifyNewNote(noteDb);
        }
      }
    }

    setShowEmojiContainer(false);
  };

  const handleChangeTextarea = (text) => {
    setMessageInput(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      handleSendNote(messageInput);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowEmojiContainer(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const existsBreakLine = messageInput.includes("\n");

    containerRef.current.style.alignItems = existsBreakLine
      ? "flex-end"
      : "center";
  }, [messageInput]);

  const classNameContainer = [styles.container, classNameWrap].join(" ");

  return (
    <animated.div
      className={classNameContainer}
      style={{ ...containerStyle }}
      ref={containerRef}
      onMouseLeave={() => setShowEmojiContainer(false)}
    >
      <div className={styles.messageContainer}>
        <div className={styles.emojiArea}>
          <animated.div
            className={styles.emojiContainer}
            style={{ ...emojiAreaStyle }}
          >
            <EmojiPickerCustom
              show={true}
              onEmojiClick={(emoji) =>
                setMessageInput(
                  (prevMessageInput) => `${prevMessageInput}${emoji}`,
                )
              }
            />
          </animated.div>

          <span>
            {!showEmojiContainer && (
              <IoHappyOutline
                className={styles.emojiIcon}
                onClick={() => setShowEmojiContainer(true)}
              />
            )}

            {showEmojiContainer && (
              <IoCloseCircle
                className={styles.emojiIcon}
                onClick={() => setShowEmojiContainer(false)}
              />
            )}
          </span>
        </div>

        <LimitedTextarea
          text={messageInput}
          changeText={(e) => handleChangeTextarea(e.target.value)}
          handleKeyDown={handleKeyDown}
          className={styles.messageInput}
        />
      </div>

      <div className={styles.containerBtnSend}>
        <animated.button
          className={styles.btnSendMessage}
          style={{ ...btnSendStyle }}
          onClick={() => handleSendNote(messageInput)}
        >
          <IoSendSharp className={styles.sendIcon} />
        </animated.button>
      </div>
    </animated.div>
  );
};
