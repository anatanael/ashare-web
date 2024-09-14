import React, { createContext, useContext, useEffect, useState } from "react";

import { getCategoriesApi } from "@/api/category";

const PrivateContext = createContext();

export const PrivateProvider = ({ children }) => {
  const [appCategories, setAppCategories] = useState([]);
  const [appCategorySelected, setAppCategorySelected] = useState();

  const [appCategoriesInitialized, setAppCategoriesInitialized] =
    useState(false);

  const appCreateCategory = (category) => {
    setAppCategories((prevCategories) => [category, ...prevCategories]);
  };

  const appCreateCategoryAndSelect = (category) => {
    appCreateCategory(category);
    setAppCategorySelected(category);
  };

  const appChangeCategorySelected = (categoryId) => {
    const categoryById = appCategories.find(
      (category) => category.id === categoryId,
    );

    if (categoryById) {
      setAppCategorySelected(categoryById);
    }
  };

  const appChangeCategorySelectedOrResetToNull = (categoryId) => {
    if (!categoryId) {
      return;
    }

    const categorySelectedId = appCategorySelected && appCategorySelected.id;
    const isSameCategory = categorySelectedId === categoryId;

    if (isSameCategory) {
      setAppCategorySelected(null);
      return;
    }

    appChangeCategorySelected(categoryId);
  };

  const appClearCategorySelected = () => {
    setAppCategorySelected(null);
  };

  const appChangeImageCategory = async (categoryId, imageUrl) => {
    if (!categoryId) {
      return false;
    }

    setAppCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return { ...category, urlImage: imageUrl };
        }
        return category;
      }),
    );
  };

  const appDeleteCategory = async (categoryId) => {
    setAppCategories(
      appCategories.filter((category) => category.id !== categoryId),
    );
  };

  useEffect(() => {
    async function main() {
      const appCategories = await getCategoriesApi();

      if (appCategories) {
        setAppCategories([...appCategories].reverse());
      }

      setAppCategoriesInitialized(true);
    }

    main();
  }, []);

  useEffect(() => {
    if (appCategorySelected) {
      const categoryById = appCategories.find(
        (category) => category.id === appCategorySelected.id,
      );

      setAppCategorySelected(categoryById ?? null);
    }
  }, [appCategories]);

  return (
    <PrivateContext.Provider
      value={{
        appCategories,
        appCategorySelected,
        appCreateCategory,
        appCategoriesInitialized,
        appCreateCategoryAndSelect,
        appChangeCategorySelected,
        appChangeCategorySelectedOrResetToNull,
        appChangeImageCategory,
        appClearCategorySelected,
        appDeleteCategory,
      }}
    >
      {children}
    </PrivateContext.Provider>
  );
};

export const usePrivateContext = () => useContext(PrivateContext);
