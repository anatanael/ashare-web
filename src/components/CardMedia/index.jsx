import moment from "moment";
import React from "react";
import { IoTrash } from "react-icons/io5";

import { CardNote } from "./CardNote";
import styles from "./styles.module.scss";

const formateDate = (date) => {
  return moment(date).format("HH:mm DD/MM/YYYY");
};

export const CardMedia = ({ id, date, notifyDelete, typeMedia, children }) => {
  const dateFormatted = formateDate(date);

  const handleDeleteMedia = async () => {
    notifyDelete(id, typeMedia);
  };

  return (
    <div className={styles.cardContainer}>
      <div>
        <button onClick={handleDeleteMedia}>
          <IoTrash />
        </button>
      </div>

      <div className={styles.cardContent}>{children}</div>

      <div className={styles.bottom}>{dateFormatted}</div>
    </div>
  );
};

export { CardNote };
