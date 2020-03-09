import React from 'react'
import styles from "./Layout.module.css"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = ({
  children,
}) => {
  return (
    <div className={styles.layout}>
      <div className={styles.components}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout