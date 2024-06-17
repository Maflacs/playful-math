import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Practice.module.css";
import Modal from "../../components/Modal/Modal";

function Practice() {
  const query = new URLSearchParams(useLocation().search);
  const operation = query.get("operation");
  const range = parseInt(query.get("range"));
  const language = query.get("language"); // Nyelv paraméterének olvasása
  const [operationText, setOperationText] = useState("");
  const [results, setResults] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAnswerIndex, setWrongAnswerIndex] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedResultText, setSelectedResultText] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(180);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    generateOperationAndResults();

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalRef.current);
      setShowModal(true);
    } else if (timer > 0) { // Csak akkor csökkentsd a timert, ha nagyobb, mint 0
      const countdown = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer, showModal]);
  

  useEffect(() => {
    if (isCorrect) {
      setProblemsSolved(problemsSolved + 1); // Megoldott feladatok számának növelése minden helyes válasz esetén
    }
  }, [isCorrect]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => prevTime - 1); // Visszaszámlálás az aktuális időből
    }, 1000);
  
    return () => clearInterval(countdown); // Timer leállítása a komponens elvételekor
  }, []);

  const generateOperationAndResults = () => {
    let num1, num2, text, correctResult;

    do {
      switch (operation) {
        case "add-sub":
          if (Math.random() < 0.5) {
            num1 = Math.floor(Math.random() * range) + 1;
            num2 = Math.floor(Math.random() * range) + 1;
            text = `${num1} + ${num2}`;
            correctResult = num1 + num2;
          } else {
            num1 = Math.floor(Math.random() * range) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
            text = `${num1} - ${num2}`;
            correctResult = num1 - num2;
          }
          break;
        case "mul-div":
          if (Math.random() < 0.5) {
            num1 = Math.floor(Math.random() * range) + 1;
            num2 = Math.floor(Math.random() * range) + 1;
            text = `${num1} × ${num2}`;
            correctResult = num1 * num2;
          } else {
            do {
              num1 = Math.floor(Math.random() * range) + 1;
              num2 = Math.floor(Math.random() * range) + 1;
            } while (num1 % num2 !== 0);
            text = `${num1} ÷ ${num2}`;
            correctResult = num1 / num2;
          }
          break;
        default:
          break;
      }
    } while (correctResult > range);

    const generatedResults = [{ value: correctResult, correct: true }];
    for (let i = 0; i < 4; i++) {
      let result;
      do {
        result = correctResult + (Math.floor(Math.random() * 5) + 1);
      } while (generatedResults.some((r) => r.value === result));
      generatedResults.push({ value: result, correct: false });
    }
    generatedResults.sort(() => Math.random() - 0.5);

    setOperationText(text);
    setResults(
      generatedResults.map((result, index) => ({
        id: `result${index}`,
        text: result.value.toString(),
        correct: result.correct,
      }))
    );
    setCorrectAnswer(correctResult);
    setIsCorrect(false);
    setWrongAnswerIndex(null);
  };

  const handleResultClick = (index) => {
    setSelectedResult(index);
    setSelectedResultText(results[index].text);
    if (results[index].correct) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setWrongAnswerIndex(index);
    }
    generateOperationAndResults(); // Új feladat generálása minden kattintás után
  };

  const handleRestartClick = () => {
    generateOperationAndResults();
    setScore(0);
    setShowModal(false);
    setProblemsSolved(0);
    setTimer(180);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const labels = {
    en: {
      home: "Settings",
      title: "Click on the number that fits in the place of the ?",
      timer: "Unfortunately, your time has run out :(",
      restart: "Restart",
      score: "Score",
    },
    hu: {
      home: "Beállítások",
      title: "Kattints arra a számra, amelyik illik a ? helyére",
      timer: "Sajnos lejárt az időd :(",
      restart: "Újraindítás",
      score: "Pontszám",
    },
  };

  const texts = labels[language];

  return (
    <div className={styles.practice}>
      <Link className={styles.link} to="/">
        {texts.home}
      </Link>
      <div className={styles.timer}>
        {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
      </div>
      <div className={styles.h2}>
        <h2>{texts.title}</h2>
        <div className={styles.right}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.operation}>
          <p>{operationText} = ?</p>
        </div>
        <div className={styles.results}>
          {results.map((result, index) => (
            <div
              className={styles.result}
              key={result.id}
              style={{
                backgroundColor:
                  selectedResult === index
                    ? isCorrect
                      ? "green"
                      : wrongAnswerIndex === index
                      ? "red"
                      : ""
                    : "",
                cursor:
                  isCorrect || index === wrongAnswerIndex
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={() => handleResultClick(index)}
            >
              {result.text}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal closeModal={closeModal} show={showModal} onClick={handleRestartClick} score={score} home={texts.home} restart={texts.restart} lang={language} timer={texts.timer}/>
      )}
    </div>
  );
}



export default Practice;