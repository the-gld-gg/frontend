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
      <LayoutAuth headerBg="#DEE4EE">
        <Section bg="#DEE4EE" fullWidth>
          <RegisterJourneyForm gtm={{ subCategory: "registration journey page" }} {...this.props} />
        </Section>
      </LayoutAuth>
    )
  }
}

export default Register