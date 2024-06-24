import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import styles from './OperationText.module.css';

const OperationText = ({ h2Text, text }) => {
  return (
    <div className={styles.h2}>
      <h2>
        {h2Text || (
          <ReactTypingEffect
            text={text}
            speed={100}
            eraseSpeed={50}
            typingDelay={1050}
            eraseDelay={10000}
          />
        )}
      </h2>
    </div>
  );
};

export default OperationText;
