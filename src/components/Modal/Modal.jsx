import React from "react";
import styles from "./Modal.module.css";
import { Link } from "react-router-dom";

const Modal = ({
  lang,
  show,
  onClick,
  score,
  bestScore,
  home,
  restart,
  timer,
  newRecord,
  congrats,
  firework
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      {firework}
      <div className={styles.modalContent}>
        <h2>{score < bestScore ? timer : newRecord}</h2>
        <p>
          {lang === "hu" ? "Pontszámod" : "Your Score"}: {score}
        </p>
        <p>
          {lang === "hu" ? "Legjobb pontszám" : "Best Score"}: {bestScore}
        </p>
        {congrats && <p className={styles.congrats}>{congrats}</p>}
        <div className={styles.buttonContainer}>
          <Link className={styles.homeButton} to="/">
            {home}
          </Link>
          <button className={styles.restartButton} onClick={onClick}>
            {restart}
          </button>
        </div>
      </div>
      {firework}
    </div>
  );
};

export default Modal;
