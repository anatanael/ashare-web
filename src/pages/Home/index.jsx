import styles from "./styles.module.css";

import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import axios from "../../services/api";
import { CardMessage } from "../../components/CardMessage";

const getMessagesApi = async () => {
  try {
    const messages = await axios.get("/message");

    if (messages && messages.data && messages.data.payload) {
      return messages.data.payload;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const sendMessageApi = async (message) => {
  try {
    const idMessage = await axios.post("/message", { text: message });

    return idMessage;
  } catch (err) {
    console.log(err);

    return false;
  }
};

export const Home = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const scrollMainRef = useRef(null);
  const shouldScrollMainRef = useRef(false);

  useEffect(() => {
    async function main() {
      const messages = await getMessagesApi();

      if (messages) {
        shouldScrollMainRef.current = true;
        setMessagesList(messages);
      }
    }

    main();
  }, []);

  useEffect(() => {
    if (shouldScrollMainRef.current) {
      scrollMainDown();
    }
  }, [messagesList]);

  const scrollMainDown = () => {
    if (scrollMainRef.current) {
      scrollMainRef.current.scrollTop = scrollMainRef.current.scrollHeight;
      shouldScrollMainRef.current = false;
    }
  };

  const sendMessage = async (text) => {
    if (!text) {
      return;
    }

    try {
      const responseApi = await sendMessageApi(text);
      const currentDate = new Date().toString();

      if (responseApi.data.payload) {
        const id = responseApi.data.payload;

        setMessagesList((messagesList) => [
          ...messagesList,
          { id, text, created_at: currentDate },
        ]);

        setMessageInput("");
        scrollMainDown();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteMessage = async (id) => {
    const newMessageList = [...messagesList].filter(
      (message) => message.id !== id
    );

    setMessagesList(newMessageList);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main} ref={scrollMainRef}>
        {messagesList.map((messageCurrent) => (
          <CardMessage
            key={messageCurrent.id}
            id={messageCurrent.id}
            text={messageCurrent.text}
            date={messageCurrent.created_at}
            onDeleteMessage={onDeleteMessage}
          />
        ))}
      </div>

      <div className={styles.bottom}>
        <input
          className={styles.inputMessage}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />

        <button
          onClick={() => sendMessage(messageInput)}
          className={styles.btnSendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};
