import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

const Dropdown = ({ children, toggle: Toggle, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div>
      <Toggle className={className} onClick={() => setIsOpen(!isOpen)} />

      <ul
        style={{ display: isOpen ? "flex" : "none" }}
        ref={dropdownRef}
        className={styles.listMenu}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
