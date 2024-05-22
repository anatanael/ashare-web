import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { styleHideBtnSignUp, styleShowBtnSignUp } from "./animation.styles";
import styles from "./styles.module.scss";

import { createAccountApi } from "@/api/auth";
import { ContainerScreen } from "@/components/ContainerScreen";
import { IconTogglePassword } from "@/components/IconTogglePassword";
import { MSG_SERVER_UNAVAILABLE } from "@/global/constants";

const initialFormUser = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const TOAST_CREATE_ACCOUNT = "__TOAST_CREATE_ACCOUNT";

export const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...initialFormUser });
  const [showPassword, setShowPassword] = useState(false);
  const [showBtnSignUp, setShowBtnSignUp] = useState(false);

  const btnSignUpStyle = useSpring(
    showBtnSignUp ? styleShowBtnSignUp : styleHideBtnSignUp,
  );

  const goPageLogin = (username = false) => {
    navigate("/login", { state: { username: username } });
  };

  const goPageHome = () => {
    navigate("/");
  };

  const validateSignUp = () => {
    const { name, username, email, password, repeatPassword } = formData;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      name.length > 0 &&
      username.length > 0 &&
      emailPattern.test(email) &&
      password.length > 0 &&
      repeatPassword.length > 0 &&
      password === repeatPassword
    );
  };

  const handleKeyDown = (event) => {
    event.key === "Enter" && handleCreateAccount();
  };

  const handleCreateAccount = async () => {
    if (!validateSignUp()) {
      return;
    }

    const userCreate = await createAccountApi(formData);

    if (userCreate.err) {
      if (userCreate.code === 409) {
        toast.error("Usuário e/ou e-mail já cadastrado", {
          id: TOAST_CREATE_ACCOUNT,
        });
      } else {
        toast.error(MSG_SERVER_UNAVAILABLE, {
          id: TOAST_CREATE_ACCOUNT,
        });
      }

      return;
    }

    toast.success("Usuário criado com sucesso", {
      id: TOAST_CREATE_ACCOUNT,
    });

    goPageLogin(userCreate.username);
  };

  useEffect(() => {
    setShowBtnSignUp(validateSignUp());
  }, [formData]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        goPageHome();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ContainerScreen middleScreen customClassName={styles.page}>
      <div className={styles.container}>
        <div className={styles.formContent}>
          <form
            className={"formGroup"}
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateAccount();
            }}
          >
            <div className={"inputGroup"}>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className={"inputGroup"}>
              <label htmlFor="username">Usuário</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value.trim() })
                }
              />
            </div>

            <div className={"inputGroup"}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value.trim() })
                }
              />
            </div>

            <div className={"inputGroup"}>
              <label htmlFor="password">Senha</label>
              <div className={"inputPasswordContainer"}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  value={formData.password}
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value.trim(),
                    })
                  }
                />

                <IconTogglePassword
                  show={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className={"inputGroup"}>
              <label htmlFor="repeatPassword">Repetir Senha</label>
              <div className={"inputPasswordContainer"}>
                <input
                  id="repeatPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.repeatPassword}
                  autoComplete="off"
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      repeatPassword: e.target.value.trim(),
                    })
                  }
                />

                <IconTogglePassword
                  show={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <animated.button
              className={"btnPrimary btnFull"}
              style={{ ...btnSignUpStyle }}
              type="submit"
            >
              Criar conta
            </animated.button>
          </form>

          <span className={styles.textLogin} onClick={() => goPageLogin()}>
            Já tem conta? Entre aqui
          </span>
        </div>

        <img
          src="/assets/images/signUp.svg"
          alt="Login"
          className={styles.imgSignUp}
        />
      </div>
    </ContainerScreen>
  );
};
