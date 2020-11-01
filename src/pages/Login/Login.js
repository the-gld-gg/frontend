import React from 'react'
import LayoutAuth from '../../containers/LayoutAuth/LayoutAuth'
import { Box, Image } from "@chakra-ui/core"
import Section from "../../components/Section/Section"
import LoginForm from '../../containers/LoginForm/LoginForm'
import {
  Link
} from "react-router-dom"

const Login = ({
  children
}) => (
    <LayoutAuth>
      <Box display="flex">
        <Section horizontalPadding verticalPadding bg="#DEE4EE url(/hero-dots.png) no-repeat" backgroundSize="15%">
          <Link to="/">
            <Image src="/logo-peach-horizontal.svg" alt="The GLD" height="100px" margin="0 auto" />
          </Link>
          <LoginForm gtm={{ subCategory: "login page" }} />
        </Section>
        <Box flexShrink={0} className="hide-mobile">
          <Image src="/login.png" alt="Login" margin="0 auto" display="block" />
        </Box>
      </Box>
    </LayoutAuth>
)

export default Login