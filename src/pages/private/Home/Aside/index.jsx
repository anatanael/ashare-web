import { AsideContent } from "./AsideContent";
import { AsideHeader } from "./AsideHeader";
import styles from "./styles.module.scss";

export const Aside = ({ classNameWrap = "" }) => {
  const classNameContainer = [classNameWrap, styles.container].join(" ");

  return (
    <div className={classNameContainer}>
      <AsideHeader />

      <AsideContent />
    </div>
  );
};
