import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Welcome.module.css";
import OperationText from '../OperationText/OperationText';

const WelcomePractice = ({home, h2Text, text, write, operation}) => {
  return (
    <div className={styles.welcome}>
    <Link className={styles.link} to='/'>
      {home}
    </Link>
    <OperationText h2Text={h2Text} text={text} write={write} operation={operation}/>
  </div>
  )
}

export default WelcomePractice
