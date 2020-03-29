import React from "react"
import { Link } from "react-router-dom"
import gtmHandler from "../../utils/gtmHandler"
import Layout from "../../containers/Layout/Layout"
import { Text } from "@chakra-ui/core"
import Section from "../../components/Section/Section"

class RegisterSuccess extends React.Component {
  componentDidMount() {
    gtmHandler({
      event: "trackPage",
      eventType: "page_view",
      additionalProps: {
        page: {
          pageInfo: {
            pageName: "Register success",
            platform: "website",
            language: "en",
            pathName: "/register-success"
          },
          category: {
            pageType: "form response page",
            primaryCategory: "registration success page"
          }
        }
      }
    })
  }

  render() {
    return (
      <Layout>
        <Section
          horizontalPadding
          verticalPadding
          bg="#EE215B"
          style={{ minHeight: "calc(100vh - 96px - 88px)"}}>
          <Text as="h3" fontSize="5xl" color="white">THANK YOU FOR REGISTERING.</Text>
          <br />
          <Text as="p" fontSize="2xl" color="white">We will be in touch shortly.</Text>
          <br />
          <br />
          <Link to="/"><Text  color="brand.900">Back to home</Text></Link>
        </Section>
      </Layout>
    )
  }
}

export default RegisterSuccess