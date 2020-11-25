import React from 'react'
import styles from "./LayoutAuth.module.css";
import Header from "../Header/Header"

const LayoutAuth = ({
  children,
  headerBg
}) => {
  return (
  <div className={styles.layout}>
    <div className={styles.components}>
      <Header headerBg={headerBg} />
      {children}
    </div>
  </div>
  )
}

export default LayoutAuth