import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const IconReturn = ({ handleClick }) => (
  <IoArrowBackOutline className={styles.iconReturn} onClick={handleClick} />
);

export const Header = () => {
  const navigate = useNavigate();

  const returnPage = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <IconReturn handleClick={returnPage} />

      <span className={styles.title}>Categoria</span>
    </div>
  );
};
