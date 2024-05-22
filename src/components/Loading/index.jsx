import styles from "./styles.module.scss";

const loadingImage = "/assets/gifs/loader.webp";

export const Loading = ({
  widthImage = "164px",
  heightImage = "164px",
  fullPage = false,
}) => {
  const classNameContainer = fullPage ? styles.containerFullPage : "";

  return (
    <div className={classNameContainer}>
      <img
        src={loadingImage}
        className={styles.imgLoading}
        width={widthImage}
        height={heightImage}
      />
    </div>
  );
};
