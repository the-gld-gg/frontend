import React from 'react'
import { Text, Box, Image } from "@chakra-ui/core"
import Section from '../../components/Section/Section'
import styles from "./Header.module.css"

const Header = () => (
  <Section horizontalPadding bg="#0A154A">
    <Box padding="2em 0" className={styles.header}>
      <Image src="logo192.png" alt="The GLD" />
    </Box>
  </Section>
)

export default Header