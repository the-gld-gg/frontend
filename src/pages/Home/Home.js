import React from 'react'
import LayoutAuth from './../../containers/LayoutAuth/LayoutAuth'
import styles from "./Home.module.css";
import { Text } from "@chakra-ui/core";
import LoginForm from '../../containers/LoginForm/LoginForm'
import {
  Link
} from "react-router-dom";

const Home = ({
  children
}) => (
    <LayoutAuth>
      <div
        className={styles.page}
      >
        <div>
          <Text fontSize="4xl">
            Login
          </Text>
          <LoginForm />
          <br />
          <Link to="/register">> Register</Link>
        </div>
      </div>
    </LayoutAuth>
)

export default Home