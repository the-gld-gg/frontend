import React from "react"
import gtmHandler from "../../utils/gtmHandler"
import LayoutAuth from "./../../containers/LayoutAuth/LayoutAuth"
import Section from "../../components/Section/Section"
import RegisterForm from "../../containers/RegisterForm/RegisterForm"

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
            pathName: "/register"
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
        <Section horizontalPadding verticalPadding bg="#DEE4EE">
          <RegisterForm gtm={{ subCategory: "registration page" }} />
        </Section>
      </LayoutAuth>
    )
  }
}

export default Register