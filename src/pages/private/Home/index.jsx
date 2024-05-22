import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Aside } from "./Aside";
import { Main } from "./Main";
import styles from "./styles.module.scss";

import { ContainerScreen } from "@/components/ContainerScreen";
import { usePrivateContext } from "@/context/Private";

export const Home = () => {
  const {
    appCategorySelected,
    appChangeCategorySelected,
    appCategoriesInitialized,
  } = usePrivateContext();

  const location = useLocation();
  const navigate = useNavigate();

  const classNameContainer = [
    styles.container,
    appCategorySelected && appCategorySelected.id && styles.categorySelected,
  ].join(" ");

  useEffect(() => {
    if (appCategorySelected !== undefined) {
      navigate(location.pathname, {
        state: { category: appCategorySelected },
      });
    }
  }, [appCategorySelected]);

  useEffect(() => {
    const { state } = location;

    if (appCategoriesInitialized) {
      const idCategory = state?.category?.id;

      if (idCategory) {
        appChangeCategorySelected(state.category.id);
      }
    }
  }, [appCategoriesInitialized]);

  return (
    <ContainerScreen customClassName={classNameContainer}>
      <Aside classNameWrap={styles.aside} />

      <Main className={styles.main} />
    </ContainerScreen>
  );
};
