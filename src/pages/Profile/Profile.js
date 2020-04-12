import React from "react"
import gtmHandler from "../../utils/gtmHandler"
import Layout from "../../containers/Layout/Layout"
import { Text } from "@chakra-ui/core"
import Section from "../../components/Section/Section"

class Profile extends React.Component {
  componentDidMount() {
    const { user } = this.props

    gtmHandler({
      event: "trackPage",
      eventType: "page_view",
      additionalProps: {
        page: {
          pageInfo: {
            pageName: "Profile",
            platform: "website",
            language: "en",
            pathName: "/profile"
          },
          category: {
            pageType: "profile page",
            primaryCategory: "profile page"
          }
        },
        user: {
          profile: {
            profileID: user.id,
            joinDate: user.created_at
          }
        }
      }
    })
  }

  render() {
    const { user } = this.props

    return (
      <Layout>
        <Section
          horizontalPadding
          verticalPadding
          bg="#EE215B"
          style={{ minHeight: "calc(100vh - 96px - 88px)"}}>
          <Text as="h3" fontSize="5xl" color="white">{user.name}</Text>
        </Section>
      </Layout>
    )
  }
}

export default Profile
