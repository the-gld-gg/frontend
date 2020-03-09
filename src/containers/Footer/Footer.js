import React from 'react'
import { Text, Box } from "@chakra-ui/core"
import Section from '../../components/Section/Section'

const Footer = () => (
  <Section horizontalPadding bg="#0A154A">
    <Box padding="2em 0">
      <Text color="white">&copy; 2020 TheGLG. All rights reserved.</Text>
    </Box>
  </Section>
)

export default Footer