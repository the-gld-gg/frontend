import React from 'react'
import { Box } from "@chakra-ui/core"
import styles from './ErrorMessage.module.css'

const ErrorMessage = ({ children, color="#EE215B" }) => {
  return (
    <Box className={styles.errorMessage} color={color}>
      {children}
    </Box>
  )
}

export default ErrorMessage
