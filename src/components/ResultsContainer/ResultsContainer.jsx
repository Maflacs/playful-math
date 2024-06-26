import React from "react";
import styles from "./ResultsContainer.module.css";
import { handleKeyPress } from "../../utils/Functions";

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
  setHelpIndex,
  inputRef,
}) => {

  // Handle key down event for the input field
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
        ),
      setHelpIndex(0), // Reset the help index when a new problem is generated
    );
  };

  return (
    <div className={styles.results}>
      {operation === "read-write" ? (
        // Input field for the "read-write" operation
        <input
          type="text"
          ref={inputRef} // Reference to the input field for maintaining focus
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)} // Update userInput state on change
          onKeyDown={handleKeyDown} // Handle key press events
          className={`${styles.input} ${isCorrect ? styles.correct : styles.incorrect}`}
        />
      ) : (
        // Display results for other operations
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
            onClick={() =>
              handleResultClick(
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
              )
            }
          >
            {result.text}
          </div>
        ))
      )}
    </div>
  );
};

export default ResultsContainer;
