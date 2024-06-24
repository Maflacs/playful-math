import React from "react";
import styles from "./ResultsContainer.module.css";
import { handleKeyPress } from "../../utils/Functions";

const ResultsContainer = ({
  results,
  selectedResult,
  isCorrect,
  wrongAnswerIndex,
  handleResultClick,
  operation,
  userInput,
  setUserInput,
  correctAnswer,
  setSelectedResult,
  setIsCorrect,
  setScore,
  setH2Text,
  setWrongAnswerIndex,
  generateOperationAndResults,
  wordList,
  setOperationText,
  setResults,
  setCorrectAnswer,
}) => {
  const handleKeyDown = (e) => {
    handleKeyPress(
      e,
      operation,
      userInput,
      correctAnswer,
      setIsCorrect,
      setScore,
      setH2Text,
      () =>
        generateOperationAndResults(
          operation,
          100, 
          setOperationText,
          setResults,
          setCorrectAnswer,
          setIsCorrect,
          setWrongAnswerIndex,
          setSelectedResult,
          setH2Text,
          wordList,
          setUserInput
        )
    );
  };

  const getClassNames = (index) => {
    let classNames = styles.result;
    if (selectedResult === index) {
      if (isCorrect) {
        classNames += ` ${styles.correct}`;
      } else if (wrongAnswerIndex === index) {
        classNames += ` ${styles.incorrect}`;
      } else {
        classNames += ` ${styles.selected}`;
      }
    }
    if (isCorrect || index === wrongAnswerIndex) {
      classNames += ` ${styles.disabled}`;
    }
    return classNames;
  };

  return (
    <div className={styles.results}>
      {operation === "read-write" ? (
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`${styles.input} ${isCorrect ? styles.correct : styles.incorrect}`}
        />
      ) : (
        results.map((result, index) => (
          <div
            key={result.id}
            className={getClassNames(index)}
            onClick={() => handleResultClick(index)}
          >
            {result.text}
          </div>
        ))
      )}
    </div>
  );
};

export default ResultsContainer;
