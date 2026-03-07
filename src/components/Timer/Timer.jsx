import classes from "./Timer.module.css";
import { useState, useEffect } from "react";

const Timer = ({ time = 0, active, run }) => {
  const [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(active);
  //   setSeconds(120);

  useEffect(() => {
    let intervalId;
    if (isActive && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(intervalId);
      run();
    } else if (!isActive) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, seconds]);

  const showTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    let minutesText = mins < 10 ? "0" + String(mins) : String(mins);
    let secondsText = secs < 10 ? "0" + String(secs) : String(secs);

    return `${minutesText}:${secondsText}`;
  };

  return <p className={classes.time}>{showTime()}</p>;
};

export default Timer;
