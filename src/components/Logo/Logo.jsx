import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <header className={classes.container}>
      <img src="./src/assets/United Bancom Logo.png" alt="ubtech" />
      <h1>
        <span>cbt</span> <span>platform</span>
      </h1>
    </header>
  );
};

export default Logo;
