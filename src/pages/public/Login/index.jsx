import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { styleHideBtnLogin, styleShowBtnLogin } from "./animation.styles";
import styles from "./styles.module.scss";

import { loginApi } from "@/api/auth";
import { ContainerScreen } from "@/components/ContainerScreen";
import { IconTogglePassword } from "@/components/IconTogglePassword";
import { handleLoginSuccess } from "@/config/auth";
import { MSG_SERVER_UNAVAILABLE } from "@/global/constants";

const TOAST_LOGIN = "__TOAST_LOGIN";

const initialFormState = {
  username: "",
  password: "",
};

export const Login = () => {
  const [formLogin, setFormLogin] = useState({ ...initialFormState });
  const [showPassword, setShowPassword] = useState(false);
  const [showBtnLogin, setShowBtnLogin] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const goPageSignUp = () => {
    navigate("/signup");
  };

  const goPageHome = () => {
    navigate("/");
  };

  const validateLogin = () => {
    const { username, password } = formLogin;
    return username.length > 0 && password.length > 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) {
      return;
    }

    const dataLogin = await loginApi(formLogin);

    if (dataLogin.err) {
      if (dataLogin.code === 401) {
        toast.error("Usuário ou senha inválidos", { id: TOAST_LOGIN });
      } else {
        toast.error(MSG_SERVER_UNAVAILABLE, {
          id: TOAST_LOGIN,
        });
      }

      return;
    }
    const { accessToken, user } = dataLogin;

    handleLoginSuccess(accessToken, user);

    toast.success("Login realizado com sucesso", { id: TOAST_LOGIN });
    navigate("/home");
  };

  const handleKeyDown = (event) => {
    event.key === "Enter" && handleLogin();
  };

  const btnLoginStyle = useSpring(
    showBtnLogin ? styleShowBtnLogin : styleHideBtnLogin,
  );

  useEffect(() => {
    const { state } = location;
    if (state && state.username) {
      setFormLogin({ ...formLogin, username: state.username });
    }

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

  useEffect(() => {
    setShowBtnLogin(validateLogin());
  }, [formLogin]);

  return (
    <ContainerScreen middleScreen customClassName={styles.page}>
      <div className={styles.container}>
        <img
          src="/assets/images/login.svg"
          alt="Login"
          className={styles.imgLogin}
        />

        <div className={styles.formLogin}>
          <form
            className={"formGroup"}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className={"inputGroup"}>
              <label htmlFor="username">Usuário</label>
              <input
                id="username"
                value={formLogin.username}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setFormLogin({
                    ...formLogin,
                    username: e.target.value.trim(),
                  })
                }
              />
            </div>

            <div className={"inputGroup"}>
              <label htmlFor="password">Senha</label>
              <div className={"inputPasswordContainer"}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  value={formLogin.password}
                  onChange={(e) =>
                    setFormLogin({
                      ...formLogin,
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

            <animated.button
              className={"btnPrimary btnFull"}
              style={{ ...btnLoginStyle }}
              onClick={handleLogin}
              title="Entrar"
              disabled={!showBtnLogin}
              type="submit"
            >
              Entrar
            </animated.button>
          </form>

          <span className={styles.createAccountText} onClick={goPageSignUp}>
            Não tem conta? Crie agora
          </span>
        </div>
      </div>
    </ContainerScreen>
  );
};
