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
    <Section horizontalPadding verticalPadding bg="#EE215B">
      <Text as="h3" fontSize="5xl" color="white">JOIN THE GLD TODAY!</Text>
      <br />
      <RegisterForm />
      <br />
      <Link to="/login"><Text  color="brand.900">Already have an account? Login ></Text></Link>
    </Section>
  </LayoutAuth>
)

export default Register