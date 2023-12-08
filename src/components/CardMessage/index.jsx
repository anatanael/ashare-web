import styles from "./styles.module.css";

import { format as formatDate } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import axios from "../../services/api";

const formatDateMessage = "HH:mm - dd/MM/yy";

const deleteMessageApi = async (id) => {
  try {
    await axios.post("/message/delete", { id });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const CardMessage = ({ id, text, date, onDeleteMessage }) => {
  const dateIn = new Date(date);
  const dateFormatted = formatDate(dateIn, formatDateMessage);

  const deleteMessage = async (id) => {
    const isConfirmDelete = window.confirm("Excluir mensagem ?");

    if (!isConfirmDelete) {
      return;
    }

    try {
      const isDeleteMessage = await deleteMessageApi(id);

      if (isDeleteMessage) {
        onDeleteMessage(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.wrapMessage}>
      <div className={styles.message}>
        <div className={styles.topMessage}>
          <button onClick={() => deleteMessage(id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
        <div className={styles.mainMessage}>{text}</div>
        <div className={styles.bottomMessage}>{dateFormatted}</div>
      </div>
    </div>
  );
};
