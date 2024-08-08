import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose, IoSearch, IoTrash } from "react-icons/io5";
import { animated, useSpring } from "react-spring";

import {
  styleHideIconClearSearch,
  styleHideIconSearch,
  styleInputSearchEmpty,
  styleInputSearchText,
  styleShowIconClearSearch,
  styleShowIconSearch,
} from "./animation.styles";
import styles from "./styles.module.scss";

import { deleteCategoryApi } from "@/api/category";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { usePrivateContext } from "@/context/Private";
import { DEFAULT_IMG_CATEGORY } from "@/global/constants";

export const AsideContent = () => {
  const {
    appCategories,
    appCategorySelected,
    appChangeCategorySelectedOrResetToNull,
    appDeleteCategory,
  } = usePrivateContext();

  const [search, setSearch] = useState("");

  const handleDeleteCategory = async (idCategory) => {
    const response = await deleteCategoryApi(idCategory);

    if (!response) {
      toast.error("Erro ao excluir categoria");
      return;
    }

    appDeleteCategory(idCategory);
    toast.success("Categoria excluída com sucesso");
  };

  const iconSearchStyle = useSpring(
    search.trim() ? styleShowIconSearch : styleHideIconSearch,
  );

  const iconCloseSearchStyle = useSpring(
    search.trim() ? styleShowIconClearSearch : styleHideIconClearSearch,
  );

  const inputSearchStyle = useSpring(
    search.trim() ? styleInputSearchText : styleInputSearchEmpty,
  );

  const categoryMatchSearch = (category) => {
    if (!search.trim()) {
      return true;
    }

    return category.title.toLowerCase().includes(search.toLowerCase());
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapSearch}>
        <animated.div style={iconSearchStyle}>
          <IoSearch className={styles.iconSearch} />
        </animated.div>

        <animated.input
          type="text"
          placeholder="Procurar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.inputSearch}
          style={inputSearchStyle}
        />

        <animated.div style={iconCloseSearchStyle}>
          <IoClose
            className={styles.iconSearchClose}
            title="Limpar busca"
            onClick={() => setSearch("")}
          />
        </animated.div>
      </div>

      <div className={styles.categories}>
        {appCategories.map((category) => {
          if (!categoryMatchSearch(category)) {
            return null;
          }

          const styleCategory = [
            styles.category,
            appCategorySelected &&
              appCategorySelected.id === category.id &&
              styles.selected,
          ].join(" ");

          return (
            <div
              className={styleCategory}
              key={category.id}
              onClick={() =>
                appChangeCategorySelectedOrResetToNull(category.id)
              }
            >
              <div className={styles.categoryContent}>
                <ImageWithFallback
                  src={category.urlImage}
                  fallbackSrc={DEFAULT_IMG_CATEGORY}
                  className={styles.iconCategory}
                />
                <span className={styles.nameCategory}>{category.title}</span>
              </div>

              <span
                className={styles.wrapIconDeleteCategory}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteCategory(category.id);
                }}
              >
                <IoTrash className={styles.iconDeleteCategory} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
