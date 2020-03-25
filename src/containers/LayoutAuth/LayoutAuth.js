import React from 'react'
import styles from "./LayoutAuth.module.css";
import Header from "../Header/Header"

const LayoutAuth = ({
  children,
}) => {
  return (
  <div className={styles.layout}>
    <div className={styles.components}>
      <Header />
      {children}
    </div>
  </div>
  )
}

export default LayoutAuth