import React from 'react'
import gtmHandler from "../../utils/gtmHandler"
import LayoutAuth from './../../containers/LayoutAuth/LayoutAuth'
import { Text } from "@chakra-ui/core";
import Section from "../../components/Section/Section"
import RegisterForm from '../../containers/RegisterForm/RegisterForm'
import {
  Link
} from "react-router-dom";

class Register extends React.Component {
  componentDidMount() {
    gtmHandler({
      event: "trackPage",
      eventType: "page_view",
      additionalProps: {
        page: {
          pageInfo: {
            pageName: "Register",
            platform: "website",
            language: "en",
            pathName: "/"
          },
          category: {
            pageType: "form page",
            primaryCategory: "registration page"
          }
        }
      }
    })
  }

  render() {
    return (
      <LayoutAuth>
        <Section horizontalPadding verticalPadding bg="#EE215B">
          <Text as="h3" fontSize="5xl" color="white">JOIN THE GLD TODAY!</Text>
          <br />
          <RegisterForm gtm={{ subCategory: "registration page" }} />
          <br />
          <Link to="/login"><Text  color="brand.900">Already have an account? Login ></Text></Link>
        </Section>
      </LayoutAuth>
    )
  }
}

export default Register