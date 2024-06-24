import React from 'react';
import styles from './ResultsContainer.module.css';

const ResultsContainer = ({ results, selectedResult, isCorrect, wrongAnswerIndex, handleResultClick }) => {
  return (
    <div className={styles.results}>
      {results.map((result, index) => (
        <div
          className={styles.result}
          key={result.id}
          style={{
            backgroundColor:
              selectedResult === index
                ? isCorrect
                  ? 'green'
                  : wrongAnswerIndex === index
                  ? 'red'
                  : ''
                : '',
            cursor:
              isCorrect || index === wrongAnswerIndex
                ? 'not-allowed'
                : 'pointer',
          }}
          onClick={() => handleResultClick(index)}
        >
          {result.text}
        </div>
      ))}
    </div>
  );
};

export default ResultsContainer;
