import React from 'react'
import styles from "./Hero.module.css"
import { Image } from "@chakra-ui/core"

const Hero = ({
  children,
  imageSrc,
  heading
}) => (
    <div className={styles.hero}>
      <div className={styles.heroBg}>
        <Image src={imageSrc} alt={heading} objectFit="cover" />
      </div>
      <div className={styles.heroContent}>
        {children}
      </div>
    </div>
)

export default Hero