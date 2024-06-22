import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hu from "../../assets/img/flaghu.svg";
import en from "../../assets/img/flagen.svg";
import styles from "./Home.module.css";
import topL from "../../assets/img/TopLeft.png";
import topR from "../../assets/img/TopRight.png";
import house from "../../assets/img/House.png";
import bunny from "../../assets/img/Bunny.png";
import ReactTypingEffect from "react-typing-effect";

function Home() {
  const [operation, setOperation] = useState("add-sub");
  const [range, setRange] = useState(10);
  const [language, setLanguage] = useState("hu"); // Default language
  const navigate = useNavigate();

  const startPractice = () => {
    navigate(
      `/practice?operation=${operation}&range=${range}&language=${language}`
    );
  };

  useEffect(() => {
    if (operation === "mul-div") {
      setRange(10);
    }
  }, [operation]);

  const labels = {
    en: {
      title1: "Hi!",
      title2: "What would you like to practice?",
      sRange: "range of ",
      startPractice: "Start Practice",
      addSub: "Addition/Subtraction",
      mulDiv: "Multiplication/Division",
    },
    hu: {
      title1: "Szia!",
      title2: "Mit szeretnél gyakorolni?",
      sRange: "számkör: ",
      startPractice: "Gyakorlat indítása",
      addSub: "Összeadás/Kivonás",
      mulDiv: "Szorzás/Osztás",
    },
  };

  const texts = labels[language];

  return (
    <div className={styles.home}>
      <div>
        <img src={topL} alt="" />
      </div>
      <div className={styles.welcome}>
        <div className={styles.h1}>
          <h1>{texts.title1}</h1>
          <h2>
            <ReactTypingEffect
              text={texts.title2}
              speed={100}
              eraseSpeed={50}
              typingDelay={1050}
              eraseDelay={20050}
            />
          </h2>
        </div>
      </div>
      <div>
        <img src={topR} alt="" />
      </div>
      <div></div>
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <div className={styles.language}>
            <label>
              <div className={styles.customSelect}>
                <div className={styles.selectedOption}>
                  <img src={language === "en" ? en : hu} alt="Language" />
                  <span></span>
                </div>
                <div className={styles.options}>
                  <div
                    className={styles.option}
                    onClick={() => setLanguage("en")}
                  >
                    <img src={en} alt="English" />
                    <span></span>
                  </div>
                  <div
                    className={styles.option}
                    onClick={() => setLanguage("hu")}
                  >
                    <img src={hu} alt="Magyar" />
                    <span></span>
                  </div>
                </div>
              </div>
            </label>
          </div>
          <div className={styles.menuItem}>
            <label className={styles.operation}>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
              >
                <option value="add-sub">{texts.addSub}</option>
                <option value="mul-div">{texts.mulDiv}</option>
              </select>
            </label>
          </div>
          {operation !== "mul-div" && (
            <div className={styles.menuItem}>
              <label>
                <select
                  value={range}
                  onChange={(e) => setRange(parseInt(e.target.value))}
                >
                  <option value={10}>{`${texts.sRange}10`}</option>
                  <option value={20}>{`${texts.sRange}20`}</option>
                  <option value={100}>{`${texts.sRange}100`}</option>
                </select>
              </label>
            </div>
          )}
          <button className={styles.menuItem} onClick={startPractice}>
            {texts.startPractice}
          </button>
        </div>
      </div>
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
}

export default Home;
