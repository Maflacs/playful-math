import React from "react";
import styles from "./Menu.module.css";
import hu from "../../assets/img/flaghu.svg";
import en from "../../assets/img/flagen.svg";

const Menu = ({
  language,
  setLanguage,
  operation,
  setOperation,
  readWrite,
  addSub,
  mulDiv,
  range,
  setRange,
  sRange,
  onClick,
  startPractice,
}) => {
  return (
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
              <option value="add-sub">{addSub}</option>
              <option value="mul-div">{mulDiv}</option>
              <option value="read-write">{readWrite}</option>
            </select>
          </label>
        </div>
        {operation === "add-sub" && (
          <div className={styles.menuItem}>
            <label>
              <select
                value={range}
                onChange={(e) => setRange(parseInt(e.target.value))}
              >
                <option value={10}>{`${sRange}10`}</option>
                <option value={20}>{`${sRange}20`}</option>
                <option value={100}>{`${sRange}100`}</option>
              </select>
            </label>
          </div>
        )}
        <button className={styles.menuItem} onClick={onClick}>
          {startPractice}
        </button>
      </div>
    </div>
  );
};

export default Menu;
