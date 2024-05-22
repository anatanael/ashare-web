import Modal from "@mui/material/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

import { logoutAuth } from "@/config/auth";

const TOAST_LOGOUT = "__TOAST_LOGOUT";

export const ModalLogout = ({ componentOpen }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    logoutAuth();
    toast.success("Sessão encerrada com sucesso", { id: TOAST_LOGOUT });
    navigate("/", { replace: true });
  };

  return (
    <>
      <div onClick={handleOpen}>{componentOpen}</div>

      <Modal open={open} onClose={handleClose} className={styles.page}>
        <div className={styles.container}>
          <h3 className={styles.title}>Você quer mesmo encerrar a sessão?</h3>

          <div className={styles.wrapButtons}>
            <button className={"btnSecondary"} onClick={handleClose}>
              Voltar
            </button>
            <button className={"btnPrimary"} onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
