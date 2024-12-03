import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import styles from './OperationText.module.css';

const OperationText = ({ operation, h2Text, text, write }) => {
  return (
    <div className={styles.h2}>
      <h2>
        {h2Text || (
          <ReactTypingEffect
            text={operation === "read-write" ? write : text}
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
