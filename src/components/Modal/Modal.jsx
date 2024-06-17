import React from "react";
import styles from "./Modal.module.css";
import { Link } from "react-router-dom";

const Modal = ({ show, onClick, score, home, restart, timer }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <p>{timer}</p>
        <p>score: {score}</p>
        <div className={styles.buttonContainer}>
          <Link className={styles.homeButton} to="/">
            {home}
          </Link>
          <button className={styles.restartButton} onClick={onClick}>
            {restart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
