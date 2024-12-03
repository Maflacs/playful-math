import React from "react";
import styles from "./Firework.module.css";

const Firework = () => {
  return (
    <div className={styles.fireworkContainer}>
      <iframe
        src="https://giphy.com/embed/vzF0lrwPoR9kc"
        title="Firework"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Firework;
