import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

const Dropdown = ({
  children,
  alignRight = false,
  toggle: Toggle,
  classNameToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

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

  useEffect(() => {
    if (isOpen && dropdownRef.current && toggleRef.current) {
      dropdownRef.current.style.left = "";
      dropdownRef.current.style.right = "";
      dropdownRef.current.style.top = "";
      dropdownRef.current.style.bottom = "";

      if (alignRight) {
        dropdownRef.current.style.left = "auto";
        dropdownRef.current.style.right = "0";

        return;
      }

      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const buttonRect = toggleRef.current.getBoundingClientRect();

      if (dropdownRect.right > window.innerWidth) {
        dropdownRef.current.style.left = "auto";
        dropdownRef.current.style.right = "0";
      }

      const distanceToBottom = window.innerHeight - dropdownRect.bottom;

      if (distanceToBottom < 50) {
        dropdownRef.current.style.top = "auto";
        dropdownRef.current.style.bottom = "0";
      } else {
        dropdownRef.current.style.top = `${buttonRect.height}px`;
        dropdownRef.current.style.bottom = "auto";
      }
    }
  }, [isOpen]);

  const styleToggle = [styles.toggle, classNameToggle].join(" ");

  return (
    <div className={styles.dropdown}>
      <div
        ref={toggleRef}
        onClick={() => setIsOpen(!isOpen)}
        className={styleToggle}
      >
        <Toggle />
      </div>

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

const DropdownItem = ({ children, onClick, leftIcon: LeftIcon = null }) => {
  return (
    <li onClick={onClick} className={styles.listItem}>
      {LeftIcon && <LeftIcon />}
      {children}
    </li>
  );
};

const DropdownButton = ({ component: Component }) => {
  return (
    <span>
      <Component />
    </span>
  );
};

export { DropdownItem, DropdownButton };

export default Dropdown;
