import { useEffect, useRef } from "react";

const autoResizeMessageInput = (textareaRef) => {
  textareaRef.current.style.height = "42px";
  textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
};

export const LimitedTextarea = ({
  className = "",
  text,
  changeText,
  handleKeyDown = false,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "\\" && !textareaRef.current.contains(event.target)) {
        textareaRef.current.focus();

        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    autoResizeMessageInput(textareaRef);
  }, [text]);

  return (
    <textarea
      className={className}
      onChange={changeText}
      value={text}
      ref={textareaRef}
      onKeyDown={handleKeyDown}
    ></textarea>
  );
};
