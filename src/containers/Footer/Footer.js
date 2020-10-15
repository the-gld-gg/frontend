import React from 'react'
import { Link } from "react-router-dom"
import { Text, Box, Image, SimpleGrid } from "@chakra-ui/core"
import Section from '../../components/Section/Section'

const Footer = () => (
  <Section horizontalPadding bg="linear-gradient(117.79deg, #EC1656 27.59%, #008DD7 93.69%)">
    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8} padding="2em 0">
      <Link to="/">
        <Image src="/logo-white.svg" fill="#ffffff" alt="The GLD" height="80px" width="auto" />
      </Link>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Text color="white">&copy; 2020 TheGLG. All rights reserved.</Text>
      </Box>
    </SimpleGrid>
  </Section>
)

export default Footer