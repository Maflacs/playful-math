import React from 'react';
import styles from './Timer.module.css';

const Timer = ({ timer }) => {
  return (
    <div className={styles.timerContainer}>
      <div className={styles.timer}>
        {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
      </div>
    </div>
  );
};

export default Timer;
