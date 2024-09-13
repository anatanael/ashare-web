import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoTrash } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

import { saveCategoryApi, updateCategoryImageApi } from "@/api/category";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { usePrivateContext } from "@/context/Private";
import { DEFAULT_IMG_CATEGORY } from "@/global/constants";

const formCategoryInitialState = {
  title: "",
  picture: "",
};
export const Content = ({ classNameWrap = "" }) => {
  const navigate = useNavigate();

  const { appChangeImageCategory, appCreateCategoryAndSelect } =
    usePrivateContext();

  const [formCategory, setFormCategory] = useState({
    ...formCategoryInitialState,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const goPageBack = () => {
    navigate(-1);
  };

  const handleClearImage = () => {
    setFormCategory({ ...formCategory, picture: "" });
    setImagePreview(null);

    fileInputRef.current.value = null;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setFormCategory({ ...formCategory, picture: null });
      setImagePreview(null);
      return;
    }

    if (file) {
      setFormCategory({ ...formCategory, picture: event.target.files[0] });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCategory = async () => {
    const { title, picture } = formCategory;

    const category = await saveCategoryApi(title);

    if (!category) {
      toast.error("Preencha todos os campos");
      return;
    }

    toast.success("Categoria criada com sucesso");

    appCreateCategoryAndSelect(category);

    if (picture) {
      updateCategoryImageApi(category.id, picture).then(({ category }) => {
        appChangeImageCategory(category.id, category.urlImage);
      });
    }

    navigate("/home");
  };

  const classNameContainer = [classNameWrap, styles.container].join(" ");

  return (
    <div className={classNameContainer}>
      <h2 className={styles.title}>Criar nova categoria</h2>

      <div className={`formGroup ${styles.formCategory}`}>
        <div className={"inputGroup"}>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            value={formCategory.title}
            onChange={(e) =>
              setFormCategory({ ...formCategory, title: e.target.value })
            }
          />
        </div>

        <div className={"inputGroup inputGroupFile"}>
          <label htmlFor="picture">Imagem</label>

          <div className="areaInputFile" tabIndex="0">
            <span
              className="inputFileText"
              onClick={() => fileInputRef.current.click()}
            >
              {(formCategory.picture && formCategory.picture.name) ||
                "Escolher arquivo"}
            </span>

            {imagePreview && (
              <IoTrash onClick={handleClearImage} title="Limpar imagem" />
            )}
          </div>

          <input
            id="picture"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.previewContainer}>
          <label className="textColor">Pré Visualização</label>

          <div className={styles.previewItem}>
            <ImageWithFallback
              src={imagePreview}
              fallbackSrc={DEFAULT_IMG_CATEGORY}
              alt="Image create category preview"
              className={styles.previewImage}
            />

            <span className={styles.previewTitle}>{formCategory.title}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <button
          className={`btnSecondary ${styles.btnBack} `}
          onClick={goPageBack}
        >
          Voltar
        </button>

        <button className={"btnPrimary"} onClick={handleSaveCategory}>
          Salvar
        </button>
      </div>
    </div>
  );
};
