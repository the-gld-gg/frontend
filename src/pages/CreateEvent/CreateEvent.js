import React from "react"
import gtmHandler from "../../utils/gtmHandler"
import LayoutAuth from "./../../containers/LayoutAuth/LayoutAuth"
import Section from "../../components/Section/Section"
import CreateEventForm from "../../containers/CreateEventForm/CreateEventForm"

class CreateEvent extends React.Component {
  componentDidMount() {
    gtmHandler({
      event: "trackPage",
      eventType: "page_view",
      additionalProps: {
        page: {
          pageInfo: {
            pageName: "Create event",
            platform: "website",
            language: "en",
            pathName: "/create-event"
          },
          category: {
            pageType: "form page",
            primaryCategory: "create event page"
          }
        }
      }
    })
  }

  render() {
    return (
      <LayoutAuth>
        <Section horizontalPadding verticalPadding bg="#EE215B">
          <CreateEventForm gtm={{ subCategory: "create event page" }} {...this.props} />
        </Section>
      </LayoutAuth>
    )
  }
}

export default CreateEvent
