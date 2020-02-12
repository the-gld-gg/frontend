import React from 'react'
import LayoutAuth from '../../containers/LayoutAuth/LayoutAuth'
import { Text } from "@chakra-ui/core"
import Section from "../../components/Section/Section"
import ResetForm from '../../containers/ResetForm/ResetForm'

const Reset = ({
  children
}) => (
    <LayoutAuth>
      <Section horizontalPadding verticalPadding bg="#0A154A">
        <Text as="h3" fontSize="4xl" color="brand.800">Reset password</Text>
        <ResetForm />
      </Section>
    </LayoutAuth>
)

export default Reset