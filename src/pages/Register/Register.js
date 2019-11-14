import React from 'react'
import LayoutAuth from './../../containers/LayoutAuth/LayoutAuth'
import styles from "./Register.module.css";
import { Text } from "@chakra-ui/core";
import RegisterForm from '../../containers/RegisterForm/RegisterForm'
import {
  Link
} from "react-router-dom";

const Register = ({
  children
}) => (
    <LayoutAuth>
      <div
        className={styles.page}
      >
        <div>
          <Text fontSize="4xl">
            Register
          </Text>
          <RegisterForm />
          <br />
          <Link to="/">> Login</Link>
        </div>
      </div>
    </LayoutAuth>
)

export default Register