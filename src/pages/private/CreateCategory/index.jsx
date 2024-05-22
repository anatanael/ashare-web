import { Content } from "./Content";
import { Header } from "./Header";
import styles from "./styles.module.scss";

import { ContainerScreen } from "@/components/ContainerScreen";

export const CreateCategory = () => {
  return (
    <ContainerScreen customClassName={styles.page}>
      <div className={styles.container}>
        <Header />

        <Content classNameWrap={styles.content} />
      </div>
    </ContainerScreen>
  );
};
