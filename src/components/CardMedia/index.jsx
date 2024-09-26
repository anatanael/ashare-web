import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  IoCheckmarkCircleOutline,
  IoChevronDown,
  IoClipboardOutline,
  IoTrash,
} from "react-icons/io5";
import { animated, useSpring } from "react-spring";

import {
  styleHideCardHeader,
  styleHideIconCardHeader,
  styleShowCardHeader,
  styleShowIconCardHeader,
} from "./animation.styles";
import { CardNote } from "./CardNote";
import styles from "./styles.module.scss";

import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { useGlobalContext } from "@/context/global";
import { TYPE_MEDIA } from "@/global/constants";

const TOAST_COPY_CLIPBOARD = "__TOAST_COPY_CLIPBOARD";

const formateDate = (date) => {
  return moment(date).format("HH:mm DD/MM/YYYY");
};

const copyTextToClipboard = (text) => {
  navigator.clipboard.writeText(text);

  toast.success("Texto copiado com sucesso", { id: TOAST_COPY_CLIPBOARD });
};

export const CardMedia = ({
  id,
  text,
  date,
  selected = false,
  typeMedia,
  children,
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const { appNotifyDeleteNote, appNotifySelectNote, appModeMessageSelection } =
    useGlobalContext();

  const handleCardMouseEnter = () => {
    if (!appModeMessageSelection) {
      setIsCardHovered(true);
    }
  };

  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
  };

  const dateFormatted = formateDate(date);

  const iconCardHeaderStyle = useSpring(
    isCardHovered ? styleShowIconCardHeader : styleHideIconCardHeader,
  );

  const cardHeaderStyle = useSpring(
    isCardHovered ? styleShowCardHeader : styleHideCardHeader,
  );

  const handleDeleteMedia = async () => {
    appNotifyDeleteNote(id, typeMedia);
  };

  const IconToggleCard = () => (
    <span
      style={{
        display: appModeMessageSelection ? "none" : "inline",
      }}
    >
      <animated.div style={iconCardHeaderStyle}>
        <IoChevronDown />
      </animated.div>
    </span>
  );

  const generateClassNameBoxCardMedia = () => {
    const className = [styles.bgCardMedia];

    if (appModeMessageSelection) {
      className.push(styles.modeSelection);
    }

    if (selected) {
      className.push(styles.selected);
    }

    return className.join(" ");
  };

  return (
    <div
      className={generateClassNameBoxCardMedia()}
      onClick={() => {
        if (appModeMessageSelection) {
          appNotifySelectNote(id);
        }
      }}
    >
      <div
        className={styles.cardContainer}
        onMouseEnter={handleCardMouseEnter}
        onMouseLeave={handleCardMouseLeave}
      >
        <animated.div className={styles.cardHeader} style={cardHeaderStyle}>
          <Dropdown toggle={IconToggleCard}>
            <DropdownItem
              leftIcon={IoCheckmarkCircleOutline}
              onClick={() => appNotifySelectNote(id)}
            >
              Selecionar
            </DropdownItem>

            {TYPE_MEDIA.NOTE === typeMedia && (
              <DropdownItem
                leftIcon={IoClipboardOutline}
                onClick={() => copyTextToClipboard(text)}
              >
                Copiar
              </DropdownItem>
            )}
            <DropdownItem onClick={handleDeleteMedia} leftIcon={IoTrash}>
              Excluir
            </DropdownItem>
          </Dropdown>
        </animated.div>

        <div className={styles.cardContent}>{children}</div>

        <div className={styles.bottom}>{dateFormatted}</div>
      </div>
    </div>
  );
};

export { CardNote };
