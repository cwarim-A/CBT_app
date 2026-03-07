import React from "react";
import classes from "./ButtonA.module.css";

const ButtonA = ({
  children,
  style = "",
  onClick = () => {
    console.log("button clicked");
  },
}) => {
  return (
    <button onClick={onClick} className={`${classes.button} ${classes[style]}`}>
      {children}
    </button>
  );
};

export default ButtonA;
