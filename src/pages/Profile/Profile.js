import React from "react"
import axios from "axios"
import gtmHandler from "../../utils/gtmHandler"
import Layout from "../../containers/Layout/Layout"
import { Text } from "@chakra-ui/core"
import Section from "../../components/Section/Section"

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    const { user } = this.props

    if (user.access_token) {
      const options = {
        method: "GET",
        headers: {
          "x-access-token": user.access_token
        },
        url: "https://api.thegld.gg/api/v1/user/me"
      }
      axios(options)
        .then(response => {
          this.setState({
            user: response.user
          }, () => {
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
                    profileID: this.state.user.id,
                    joinDate: this.state.user.created_at
                  }
                }
              }
            })
          })
        })
        .catch(error => {
          console.log("Error in fetching user", error)
        })
    }
  }

  render() {
    const { user } = this.state

    return (
      <Layout>
        <Section
          horizontalPadding
          verticalPadding
          bg="#EE215B"
          style={{ minHeight: "calc(100vh - 96px - 88px)"}}>
          {
            user &&
            user.name &&
            <Text as="h3" fontSize="5xl" color="white">{user.name}</Text>
          }
        </Section>
      </Layout>
    )
  }
}

export default Profile
