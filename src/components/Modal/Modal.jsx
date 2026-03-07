import classes from "./Modal.module.css";

const Modal = ({
  identifier,
  currentState,
  message,
  submitBtnText,
  submitBtnFunc,
}) => {
  if (currentState === "on") {
    document.getElementById(identifier).showModal();
  }

  const closeModal = () => {
    currentState = "off";
    document.getElementById(identifier).close();
  };

  return (
    <dialog className={classes.dialog} id={identifier}>
      <span className={classes.closeBtn} onClick={() => closeModal()}></span>
      <p className={classes.message}>{message}</p>
      <button className={classes.submitBtn} onClick={() => submitBtnFunc()}>
        {submitBtnText}
      </button>
    </dialog>
  );
};

export default Modal;
