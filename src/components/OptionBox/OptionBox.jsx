import classes from "./OptionBox.module.css";

const OptionBox = ({
  text = "Option",
  value = "",
  name = "",
  checked,
  onChange,
}) => {
  return (
    <label className={classes["option-box"]}>
      <div className={classes.checkbox}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span className={classes.checkmark}></span>
      </div>
      <span className={classes.text}>{text}</span>
    </label>
  );
};

export default OptionBox;
