import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import topL from "../../assets/img/TopLeft.png";
import topR from "../../assets/img/TopRight.png";
import house from "../../assets/img/House.png";
import bunny from "../../assets/img/Bunny.png";
import labels from "../../utils/Translations";
import WelcomeHome from "../../components/Welcome/WelcomeHome";
import Menu from "../../components/Menu/Menu";

const Home = () => {
  const [operation, setOperation] = useState("add-sub");
  const [range, setRange] = useState(10);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "hu");
  const [typingKey, setTypingKey] = useState(0);
  const navigate = useNavigate();

  // Starts practice session with selected settings
  const startPractice = () => {
    navigate(`/practice?operation=${operation}&range=${range}&language=${language}`);
  };

  // Resets range when operation changes to multiplication or division
  useEffect(() => {
    if (operation === "mul-div") {
      setRange(10);
    }
  }, [operation]);

  const texts = labels[language];

  // Updates language and resets typing effect key
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setTypingKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={styles.home}>
      <img src={topL} alt="" />
      <WelcomeHome title1={texts.title1} title2={texts.title2} typingKey={typingKey} />
      <img src={topR} alt="" />
      <div></div>
      <Menu
        language={language}
        setLanguage={handleLanguageChange}
        operation={operation}
        setOperation={setOperation}
        readWrite={texts.readWrite}
        addSub={texts.addSub}
        mulDiv={texts.mulDiv}
        range={range}
        setRange={setRange}
        sRange={texts.sRange}
        startPractice={texts.startPractice}
        onClick={startPractice}
      />
      <div></div>
      <div className={styles.bottom}>
        <img src={house} alt="" />
      </div>
      <div></div>
      <div className={styles.bottom}>
        <img src={bunny} alt="" />
      </div>
    </div>
  );
};

export default Home;
