import { IoClose } from "react-icons/io5";

import styles from "./styles.module.scss";

import { useGlobalContext } from "@/context/global";

export const MenuModeSelection = ({ classNameWrap }) => {
  const { appStopModeMessageSelection, appQtdSelectedNotes } =
    useGlobalContext();

  const classNameContainer = [styles.container, classNameWrap].join(" ");

  const generateTextQtdNotesSelected = () => {
    if (appQtdSelectedNotes === 1) {
      return "1 selecionada";
    }

    return `${appQtdSelectedNotes} selecionadas`;
  };

  const qtdNotesSelected = generateTextQtdNotesSelected();

  return (
    <div className={classNameContainer}>
      <div className={styles.menu}>
        <span
          className={styles.clearSelection}
          onClick={appStopModeMessageSelection}
          title="Limpar Seleção"
        >
          <IoClose className={styles.iconClose} />
          {qtdNotesSelected}
        </span>

        {/* <IoTrash
          className={styles.iconDeleteAll}
          onClick={appStopModeMessageSelection}
          title="Excluir selecionados"
        /> */}
      </div>
    </div>
  );
};
