import Cookies from "js-cookie";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { ModalLogout } from "@/components/Modal/Logout";

const defaultImgProfile = "/assets/images/userProfileDefault.png";

const IconMenu = (props) => {
  return <IoEllipsisVertical {...props} />;
};

export const AsideHeader = () => {
  const navigate = useNavigate();

  const storedName = Cookies.get("name");

  const goPageCreateCategory = () => {
    navigate("/createCategory");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapProfile}>
        <img
          src={defaultImgProfile}
          alt="Profile"
          className={styles.imgProfile}
        />

        <span className={styles.nameUser}>{storedName}</span>
      </div>

      <div className={styles.menu}>
        <Dropdown
          toggle={IconMenu}
          classNameToggle={styles.iconMenu}
          alignRight
        >
          <DropdownItem onClick={goPageCreateCategory}>
            Nova Categoria
          </DropdownItem>

          <DropdownItem>
            <ModalLogout componentOpen={"Sair"} />
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};
