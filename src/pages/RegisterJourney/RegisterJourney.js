import React from "react"
import gtmHandler from "../../utils/gtmHandler"
import LayoutAuth from "./../../containers/LayoutAuth/LayoutAuth"
import Section from "../../components/Section/Section"
import RegisterJourneyForm from "../../containers/RegisterJourneyForm/RegisterJourneyForm"

class Register extends React.Component {
  componentDidMount() {
    gtmHandler({
      event: "trackPage",
      eventType: "page_view",
      additionalProps: {
        page: {
          pageInfo: {
            pageName: "Register journey",
            platform: "website",
            language: "en",
            pathName: "/register-journey"
          },
          category: {
            pageType: "form page",
            primaryCategory: "registration journey page"
          }
        }
      }
    })
  }

  render() {
    return (
      <LayoutAuth>
        <Section horizontalPadding verticalPadding bg="#EE215B">
          <RegisterJourneyForm gtm={{ subCategory: "registration journey page" }} />
        </Section>
      </LayoutAuth>
    )
  }
}

export default Register