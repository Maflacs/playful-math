import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hu from "../../assets/img/flaghu.svg";
import en from "../../assets/img/flagen.svg";
import styles from"./Home.module.css";

function Home() {
  const [operation, setOperation] = useState('add-sub');
  const [range, setRange] = useState(10);
  const [language, setLanguage] = useState('hu'); // Default language
  const navigate = useNavigate();

  const startPractice = () => {
    navigate(`/practice?operation=${operation}&range=${range}&language=${language}`);
  };

  useEffect(() => {
    if (operation === 'mul-div') {
      setRange(10);
    }
  }, [operation]);

  const labels = {
    en: {
      title1: 'Hi!',
      title2: 'What would you like to practice?',
      sRange: 'range of ',
      startPractice: 'Start Practice',
      addSub: 'Addition/Subtraction',
      mulDiv: 'Multiplication/Division',
    },
    hu: {
      title1: 'Szia!',
      title2: 'Mit szeretnél gyakorolni?',
      sRange: 'számkör: ',
      startPractice: 'Gyakorlat indítása',
      addSub: 'Összeadás/Kivonás',
      mulDiv: 'Szorzás/Osztás',
    }
  };

  const texts = labels[language];

  return (
    <div className={styles.home}>
      <div className={styles.h1}>
      <h1>{texts.title1}</h1>
      <h2>{texts.title2}</h2>
      <div className={styles.right}></div>
      </div>
      <div className={styles.menu}>
      <div>
        <label>
          <div className={styles.customSelect}>
            <div className={styles.selectedOption}>
              <img src={language === 'en' ? en : hu} alt="Language" />
              <span></span>
            </div>
            <div className={styles.options}>
              <div className={styles.option}onClick={() => setLanguage('en')}>
                <img src={en} alt="English" />
                <span></span>
              </div>
              <div className={styles.option} onClick={() => setLanguage('hu')}>
                <img src={hu} alt="Magyar" />
                <span></span>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className={styles.menuItem}>
        <label>
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="add-sub">{texts.addSub}</option>
            <option value="mul-div">{texts.mulDiv}</option>
          </select>
        </label>
      </div>
      {operation !== 'mul-div' && (
        <div className={styles.menuItem}>
          <label>
            <select value={range} onChange={(e) => setRange(parseInt(e.target.value))}>
              <option value={10}>{`${texts.sRange}10`}</option>
              <option value={20}>{`${texts.sRange}20`}</option>
              <option value={100}>{`${texts.sRange}100`}</option>
            </select>
          </label>
        </div>
      )}
      <button className={styles.menuItem} onClick={startPractice}>{texts.startPractice}</button>
      </div>
    </div>
  );
}

export default Home;