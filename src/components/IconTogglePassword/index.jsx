import { IoEye, IoEyeOff } from "react-icons/io5";

export const IconTogglePassword = ({ show, ...props }) => {
  return (
    <>
      {show ? (
        <IoEyeOff {...props} className={"iconPassword"} />
      ) : (
        <IoEye {...props} className={"iconPassword"} />
      )}
    </>
  );
};
