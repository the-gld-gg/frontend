import React from "react"
import styles from "./Layout.module.css"
import { Box } from "@chakra-ui/core"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

const Layout = ({
  children,
}) => {
  return (
    <Box className={styles.layout}>
      <Box className={styles.components}>
        <Header />
        {children}
        <Footer />
      </Box>
    </Box>
  )
}

export default Layout