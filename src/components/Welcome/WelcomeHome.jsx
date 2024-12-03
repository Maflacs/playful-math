import React from "react";
import styles from "./Welcome.module.css";
import ReactTypingEffect from "react-typing-effect";

const WelcomeHome = ({ title1, title2, typingKey }) => {
  return (
    <div className={styles.welcome}>
      <div className={styles.h1}>
        <h1>{title1}</h1>
        <h2>
          <ReactTypingEffect
            key={typingKey}
            text={title2}
            speed={100}
            eraseSpeed={50}
            typingDelay={1050}
            eraseDelay={10000}
          />
        </h2>
      </div>
    </div>
  );
};

export default WelcomeHome;
