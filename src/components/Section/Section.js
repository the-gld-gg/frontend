import React from 'react'
import classnames from "classnames"
import { Box, Text } from "@chakra-ui/core"
import styles from "./Section.module.css"

const Section = ({
  children,
  bg = "white",
  textAlign = "center",
  horizontalPadding = false,
  verticalPadding = false,
  fullWidth = false,
  style,
  heading = "",
  description = ""
}) => (
  <Box
    background={bg}
    textAlign={textAlign}
    className={classnames(styles.section, {
      [styles.horizontalPadding]: horizontalPadding,
      [styles.verticalPadding]: verticalPadding
    })}
    style={style}>
    <Box className={classnames(styles.sectionContent, {
      [styles.sectionContentFullWidth]: fullWidth
    })}>
      {heading && <Text fontSize="2xl" className={styles.sectionHeading}>{heading}</Text>}
      {description && <Text fontSize="2xl" className={styles.sectionDescription}>{description}</Text>}
      <Box>
        {children}
      </Box>
    </Box>
  </Box>
)

export default Section