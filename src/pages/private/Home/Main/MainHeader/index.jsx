import { IoArrowBackOutline } from "react-icons/io5";

import styles from "./styles.module.scss";

import { ImageWithFallback } from "@/components/ImageWithFallback";
import { usePrivateContext } from "@/context/private";
import { DEFAULT_IMG_CATEGORY } from "@/global/constants";

const IconReturn = ({ handleClick }) => (
  <IoArrowBackOutline className={styles.iconReturn} onClick={handleClick} />
);

export const MainHeader = () => {
  const { appClearCategorySelected, appCategorySelected } = usePrivateContext();

  const urlImage = appCategorySelected.urlImage;

  return (
    <div className={styles.container}>
      <IconReturn handleClick={appClearCategorySelected} />

      <ImageWithFallback
        src={urlImage}
        alt="Category Icon"
        fallbackSrc={DEFAULT_IMG_CATEGORY}
        className={styles.imgCategory}
      />

      <span className={styles.title}>{appCategorySelected.title}</span>
    </div>
  );
};
