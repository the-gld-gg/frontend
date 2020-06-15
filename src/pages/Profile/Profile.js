import React from "react"
import axios from "axios"
import GoogleMap from "google-map-react"
import { GOOGLE_MAPS_API_KEY } from "../../configs"
import googleAutoComplete from "../../utils/googleAutoComplete"
import gtmHandler from "../../utils/gtmHandler"
import Layout from "../../containers/Layout/Layout"
import { SimpleGrid, Box, Text, List, ListItem, ListIcon, Icon, Button } from "@chakra-ui/core"
import Section from "../../components/Section/Section"
import { Link } from "react-router-dom"

const google = new googleAutoComplete()

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
            user: response.data.user
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

    if (!user) return null

    return (
      <Layout>
        <Section
          horizontalPadding
          verticalPadding
          bg="#EE215B"
          style={{ minHeight: "calc(100vh - 96px - 88px)"}}>
          <Text as="h3" fontSize="5xl" color="white">Welcome, {user.name}!</Text>
          <SimpleGrid columns={[1, 2]} spacing={[4, 10]}>
            {
              user.games &&
              user.games.length > 0 &&
              <Box textAlign="left">
                <Text as="h5" fontSize="3xl" color="brand.900">Games</Text>
                <List>
                  {
                    user.games.map(game => (
                      <ListItem
                        key={game.id}
                        fontSize="xl">
                        {game.name}
                      </ListItem>
                    ))
                  }
                </List>
              </Box>
            }
            {
              user.platforms &&
              user.platforms.length > 0 &&
              <Box textAlign="left">
                <Text as="h4" fontSize="3xl" color="brand.900">Platforms</Text>
                <List>
                  {
                    user.platforms.map(platform => (
                      <ListItem
                        key={platform.id}
                        fontSize="xl">
                        {
                          platform.name === "XBox" && <ListIcon icon="xbox" />
                        }
                        {
                          platform.name === "PC" && <ListIcon icon="pc" />
                        }
                        {
                          platform.name === "PlayStation" && <ListIcon icon="playstation" />
                        }
                        {platform.name}
                      </ListItem>
                    ))
                  }
                </List>
              </Box>
            }
          </SimpleGrid>
          <br /><br />
          {
            user.venues &&
            user.venues.length > 0 &&
            <Box>
              <Text as="h4" fontSize="4xl" color="white">My venue details</Text>
              {
                user.venues.map(venue => {
                  let latitude = -37.8390361, longitude = 144.9997397
                  google.getPostcode(venue.address, response => {
                    if (response[0] && response[0].geometry && response[0].geometry.location) {
                      latitude = response[0].geometry.location.lat()
                      longitude = response[0].geometry.location.lng()
                    }
                  })
                  const Marker = () => (
                    <Box
                      position="absolute"
                      left="0"
                      top="0">
                      <Box
                        display="block"
                        transform="translate(-50%, -100%)">
                        <Icon name="location" size="48px" color="brand.900" />
                      </Box>
                    </Box>
                  )
                  return (
                    <Box key={venue.id} textAlign="left">
                      <Text as="h5" fontSize="3xl" color="brand.900">Address</Text>
                      <Text fontSize="xl" color="brand.900">{venue.address}</Text>
                      <br />
                      <Box height="30vh">
                        <GoogleMap
                          resetBoundsOnResize
                          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                          defaultCenter = {{
                            lat: latitude,
                            lng: longitude
                          }}
                          defaultZoom={17}
                          zoom={17}
                          center={{
                            lat: latitude,
                            lng: longitude
                          }}
                          lockCenter>
                          <Marker
                            lat={latitude}
                            lng={longitude}
                          />
                        </GoogleMap>
                      </Box>
                      <br /><br />
                      <SimpleGrid columns={[1, 2]} spacing={[4, 10]}>
                        <Box textAlign="left">
                          <Text as="h5" fontSize="3xl" color="brand.900">Gaming facilities</Text>
                          {
                            venue.lan === 1 &&
                            <Text fontSize="xl" color="brand.900">LAN</Text>
                          }
                          {
                            venue.gaming_booth === 1 &&
                            <Text fontSize="xl" color="brand.900">Gaming booth</Text>
                          }
                          {
                            venue.booth === 1 &&
                            <Text fontSize="xl" color="brand.900">Private booth</Text>
                          }
                          {
                            venue.tv_screens === 1 &&
                            <Text fontSize="xl" color="brand.900">TV Screens / Streams</Text>
                          }
                          {
                            venue.arena === 1 &&
                            <Text fontSize="xl" color="brand.900">Arena</Text>
                          }
                        </Box>
                        <Box textAlign="left">
                          <Text as="h5" fontSize="3xl" color="brand.900">Venue facilities</Text>
                          {
                            venue.soft_drinks === 1 &&
                            <Text fontSize="xl" color="brand.900">Soft drinks</Text>
                          }
                          {
                            venue.alchohol === 1 &&
                            <Text fontSize="xl" color="brand.900">Alcoholic drinks</Text>
                          }
                          {
                            venue.food === 1 &&
                            <Text fontSize="xl" color="brand.900">Food</Text>
                          }
                        </Box>
                      </SimpleGrid>
                    </Box>
                  )
                })
              }
            </Box>
          }
          <br /><br />
          {
            user.organiser &&
            <Box>
              <Text as="h4" fontSize="4xl" color="white">Organiser details</Text>
              <Box textAlign="left">
                <SimpleGrid columns={[1, 2]} spacing={[4, 10]}>
                  <Box textAlign="left">
                    <Text as="h5" fontSize="3xl" color="brand.900">Equipment</Text>
                    {
                      user.organiser.byo_equipment === 1 &&
                      <Text fontSize="xl" color="brand.900">BYO equipment</Text>
                    }
                    {
                      user.organiser.source_equipment === 1 &&
                      <Text fontSize="xl" color="brand.900">Source equipment</Text>
                    }
                    {
                      user.organiser.venue_equipment === 1 &&
                      <Text fontSize="xl" color="brand.900">Venue equipment</Text>
                    }
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
          }
          <Box>
            <Link to="/register-journey">
              <Button
                {...{
                  color: "white",
                  bg: "#0A154A",
                  size: "lg",
                  fontSize: "xl",
                  _hover: {
                    bg: "brand.300",
                    color: "brand.900"
                  }
                }}>
                Update profile
              </Button>
            </Link>
          </Box>
        </Section>
      </Layout>
    )
  }
}

export default Profile
