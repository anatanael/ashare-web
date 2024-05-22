import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

export const ContainerScreen = ({
  children,
  middleScreen = false,
  fullMobile = true,
  customClassName = "",
}) => {
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  const middleScreenStyle = middleScreen ? styles.middleScreen : "";
  const fullMobileStyle = fullMobile ? styles.fullMobile : "";

  const classNameContainer = [
    middleScreenStyle,
    fullMobileStyle,
    customClassName,
  ].join(" ");

  useEffect(() => {
    if (fullMobile) {
      const handleResize = () => {
        setVh(window.innerHeight * 0.01);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className={classNameContainer} style={{ "--vh": `${vh}px` }}>
      {children}
    </div>
  );
};
