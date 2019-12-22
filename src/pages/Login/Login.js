import React from 'react'
import LayoutAuth from '../../containers/LayoutAuth/LayoutAuth'
import styles from "./Login.module.css"
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
      <Section horizontalPadding verticalPadding bg="#0A154A">
        <Text as="h3" fontSize="4xl" color="brand.800">Login </Text>
        <LoginForm />
        <br />
        <Link to="/register"><Text  color="brand.800">Register ></Text></Link>
      </Section>
    </LayoutAuth>
)

export default Login