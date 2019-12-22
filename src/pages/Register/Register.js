import React from 'react'
import LayoutAuth from './../../containers/LayoutAuth/LayoutAuth'
import { Text } from "@chakra-ui/core";
import Section from "../../components/Section/Section"
import RegisterForm from '../../containers/RegisterForm/RegisterForm'
import {
  Link
} from "react-router-dom";

const Register = ({
  children
}) => (
  <LayoutAuth>
    <Section horizontalPadding verticalPadding bg="#0A154A">
      <Text as="h3" fontSize="4xl" color="brand.800">Register</Text>
      <RegisterForm />
      <br />
      <Link to="/login"><Text  color="brand.800">Login ></Text></Link>
    </Section>
  </LayoutAuth>
)

export default Register