import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Practice.module.css";
import Modal from "../../components/Modal/Modal";
import topL from "../../assets/img/TopLeft.png";
import topR from "../../assets/img/TopRight.png";
import house from "../../assets/img/House.png";
import bunny from "../../assets/img/Bunny.png";
import Firework from "../../components/Firework/Firework";
import ResultsContainer from "../../components/ResultsContainer/ResultsContainer";
import Timer from "../../components/Timer/Timer";
import {
  generateOperationAndResults,
  handleResultClick,
  playFireworkSound,
} from "../../utils/Functions";
import record from "../../assets/sounds/achievement.wav";
import labels from "../../utils/Translations";
import WelcomePractice from "../../components/Welcome/WelcomePractice";

function Practice() {
  const query = new URLSearchParams(useLocation().search);
  const operation = query.get("operation");
  const range = parseInt(query.get("range"));
  const language = query.get("language");
  const [operationText, setOperationText] = useState("");
  const [results, setResults] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAnswerIndex, setWrongAnswerIndex] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => localStorage.getItem("bestScore") || 0
  );
  const [timer, setTimer] = useState(180);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [h2Text, setH2Text] = useState("");
  const [userInput, setUserInput] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
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
    );
    intervalRef.current = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalRef.current);
          setShowModal(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [operation, range, language]);

  useEffect(() => {
    if (isCorrect) {
      setProblemsSolved((prev) => prev + 1);
    }
  }, [isCorrect]);

  const handleRestartClick = () => {
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
      setUserInput
    );
    setScore(0);
    setShowModal(false);
    setProblemsSolved(0);
    setTimer(180);
    intervalRef.current = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalRef.current);
          setShowModal(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      const currentBestScore = localStorage.getItem("bestScore") || 0;
      if (score > currentBestScore) {
        localStorage.setItem("bestScore", score);
        setBestScore(score);
        playFireworkSound(record);
      } else {
        setBestScore(currentBestScore);
      }
    }
  }, [showModal, score]);

  const texts = labels[language];
  const wordList = texts.wordList;

  return (
    <div className={styles.practice}>
      <div>
        <img src={topL} alt="" />
      </div>
      <WelcomePractice home={texts.home} operation={operation} h2Text={h2Text} text={texts.title} write={texts.write}/>
      <div>
        <img src={topR} alt="" />
      </div>
      <div></div>
      <div className={styles.container}>
        <div className={styles.operation}>
        <p>{operation === "read-write" ? operationText : `${operationText} = ?`}</p>
        </div>
        <ResultsContainer
          results={results}
          range={range}
          setResults={setResults}
          selectedResult={selectedResult}
          isCorrect={isCorrect}
          wrongAnswerIndex={wrongAnswerIndex}
          handleResultClick={handleResultClick}
          operation={operation}
          userInput={userInput}
          setUserInput={setUserInput}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          setSelectedResult={setSelectedResult}
          setIsCorrect={setIsCorrect}
          setScore={setScore}
          setH2Text={setH2Text}
          setOperationText={setOperationText}
          setWrongAnswerIndex={setWrongAnswerIndex}
          generateOperationAndResults={generateOperationAndResults}
          wordList={labels[language].wordList}
        />
        {showModal && (
          <Modal
            closeModal={closeModal}
            show={showModal}
            onClick={handleRestartClick}
            score={score}
            bestScore={bestScore}
            home={texts.home}
            restart={texts.restart}
            lang={language}
            timer={texts.timer}
            newRecord={texts.newRecord}
            congrats={score > bestScore ? texts.congrats : ""}
            firework={score >= bestScore ? <Firework /> : null}
          />
        )}
      </div>
      <div></div>
      <div className={styles.bottom}>
        <img src={house} alt="" />
      </div>
      <Timer timer={timer} />
      <div className={styles.bottom}>
        <img src={bunny} alt="bunny" />
      </div>
    </div>
  );
}

export default Practice;
