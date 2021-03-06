import React from 'react'
import LayoutAuth from '../../containers/LayoutAuth/LayoutAuth'
import { Text } from "@chakra-ui/core"
import Section from "../../components/Section/Section"
import LoginForm from '../../containers/LoginForm/LoginForm'
import {
  Link
} from "react-router-dom"

const Login = ({
  children
}) => (
    <LayoutAuth>
      <Section horizontalPadding verticalPadding bg="#EE215B">
        <Text as="h3" fontSize="4xl" color="brand.800">Login </Text>
        <LoginForm gtm={{ subCategory: "login page" }} />
        <br />
        <Link to="/register"><Text  color="brand.900">Don't have an account yet? Register ></Text></Link>
      </Section>
    </LayoutAuth>
)

export default Login