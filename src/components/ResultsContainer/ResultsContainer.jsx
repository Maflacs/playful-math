import React from "react";
import styles from "./ResultsContainer.module.css";
import { handleKeyPress,handleResultClick, generateOperationAndResults } from "../../utils/Functions";

const ResultsContainer = ({
  results,
  range, 
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
          range,
          setOperationText,
          setResults,
          setCorrectAnswer,
          setIsCorrect,
          setWrongAnswerIndex,
          setSelectedResult,
          setH2Text,
          wordList,
          setUserInput,
        )
    );
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
            className={`${styles.result} ${
              selectedResult === index
                ? isCorrect
                  ? styles.correct
                  : wrongAnswerIndex === index
                  ? styles.incorrect
                  : ""
                : ""
            }`}
            key={result.id}
            onClick={() => handleResultClick(
              operation,
              userInput,
              correctAnswer,
              index,
              results,
              setSelectedResult,
              setIsCorrect,
              setScore,
              setH2Text,
              setWrongAnswerIndex,
              () =>
                generateOperationAndResults(
                  operation,
                  range,
                  setOperationText,
                  setResults,
                  setCorrectAnswer,
                  setIsCorrect,
                  setWrongAnswerIndex,
                  setSelectedResult,
                  setH2Text,
                  wordList,
                  setUserInput,
                )
            )}
          >
            {result.text}
          </div>
        ))
      )}
    </div>
  );
};

export default ResultsContainer;
