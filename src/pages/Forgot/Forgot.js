import React from 'react'
import LayoutAuth from '../../containers/LayoutAuth/LayoutAuth'
import { Text } from "@chakra-ui/core"
import Section from "../../components/Section/Section"
import ForgotForm from '../../containers/ForgotForm/ForgotForm'
import {
  Link
} from "react-router-dom"

const Forgot = ({
  children
}) => (
    <LayoutAuth>
      <Section horizontalPadding verticalPadding bg="#EE215B">
        <Text as="h3" fontSize="4xl" color="brand.800">Forgot password</Text>
        <ForgotForm />
        <br />
        <Link to="/login"><Text  color="brand.900">Back to login ></Text></Link>
      </Section>
    </LayoutAuth>
)

export default Forgot