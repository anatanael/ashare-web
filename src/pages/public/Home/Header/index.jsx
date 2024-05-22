import styles from "./styles.module.scss";

export const Header = ({ navigate, classNameWrap = "" }) => {
  const classNameContainer = [classNameWrap, styles.container].join(" ");

  return (
    <div className={classNameContainer}>
      <button onClick={() => navigate("/login")} className={styles.titleHeader}>
        Criar conta ou entrar
      </button>
    </div>
  );
};
