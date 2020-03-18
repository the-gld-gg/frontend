import React from 'react'
import { Box, Image } from "@chakra-ui/core"
import styles from "./Header.module.css"

const Header = () => (
  <Box padding="2em 1em" bg="brand.900" className={styles.header}>
    <Image src="logo192.png" alt="The GLD" />
  </Box>
)

export default Header