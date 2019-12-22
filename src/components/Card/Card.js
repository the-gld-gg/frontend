import React from 'react'
import classnames from "classnames"
import { Image, Box, Text } from "@chakra-ui/core"
import styles from "./Card.module.css"
import { Link } from "react-router-dom"

const Card = ({
  children,
  bg = "white",
  textAlign = "center",
  imageSrc = "",
  heading = "",
  description = "",
  href = "",
  linkText = "Read More"
}) => (
  <Box
    bg={bg}
    textAlign={textAlign}
    className={classnames(styles.card, {
      [styles.cardWithLink]: href
    })}>
    {imageSrc && <Image src={imageSrc} alt={heading} />}
    <Box className={styles.cardContent}>
      <Text as="h3" fontSize="3xl">{heading}</Text>
      <Text fontSize="lg" className={styles.cardTitle}>{description}</Text>
    </Box>
    {
      href &&
      <Box className={styles.cardLink}>
        <Link to={href}>{linkText}</Link>
      </Box>
    }
  </Box>
)

export default Card