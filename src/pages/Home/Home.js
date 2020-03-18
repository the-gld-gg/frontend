import React from 'react'
import { Link } from "react-router-dom"
import gtmHandler from "../../utils/gtmHandler"
import Layout from '../../containers/Layout/Layout'
import styles from "./Home.module.css"
import { SimpleGrid, Text, Box, Icon, Button, Image } from "@chakra-ui/core"
import Section from '../../components/Section/Section'
import RegisterForm from "../../containers/RegisterForm/RegisterForm"

class Home extends React.Component {
  componentDidMount() {
    gtmHandler({
      event: "trackPage",
      additionalProps: {
        page: {
          pageInfo: {
            pageName: "Home",
            platform: "website",
            language: "en",
            pathName: "/"
          },
          category: {
            pageType: "homepage",
            primaryCategory: "homepage"
          }
        }
      }
    })
  }

  render() {
    return (
      <Layout>
        <div className={styles.page}>
          <Section horizontalPadding verticalPadding bg="#0A154A">
            <SimpleGrid minChildWidth="280px" spacing="40px">
              <Box display="flex" justifyContent="center" flexDirection="column">
                <Image src="logo512.png" alt="The GLD" display="inline-block" maxWidth="100%" width="512px" />
              </Box>
              <Box display="flex" justifyContent="center" flexDirection="column">
                <Text fontSize="4xl" color="brand.800">The GLD exists to connect gamers with other gamers. We are putting the different parts of Melbourne's gaming community on the map.</Text>
                <br />
                <br />
                <Text fontSize="4xl" color="brand.800">We are joining the dots and creating an ecosystem. The world of gaming is changing, enter The GLD.</Text>
              </Box>
            </SimpleGrid>
          </Section>
          <Section horizontalPadding verticalPadding fullWidth bg="#EE215B">
            <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing={4}>
              <Box>
                <Text as="h3" fontSize="4xl" color="brand.900">Put yourself on the map</Text>
                <br/>
                <SimpleGrid columns={{ xs: 1, sm: 2 }} spacing={4}>
                  <Box>
                    <Button
                      variantColor="brand"
                      variant="outline"
                      size="lg"
                      maxWidth="100%"
                      onClick={() => {
                        gtmHandler({
                          event: "register your venue",
                          eventType: "button click",
                          category: {
                            primaryCategory: "content interaction",
                            subCategory: "homepage"
                          }
                        })
                      }}><Link to="/register">Register your venue</Link></Button>
                    <br />
                    <br />
                    <Text color="brand.900">Show gamers your location.</Text>
                  </Box>
                  <Box>
                    <Button
                      variantColor="brand"
                      variant="outline"
                      size="lg"
                      maxWidth="100%"
                      onClick={() => {
                        gtmHandler({
                          event: "sign up to thegld",
                          eventType: "button click",
                          category: {
                            primaryCategory: "content interaction",
                            subCategory: "homepage"
                          }
                        })
                      }}><Link to="/register">Sign up to TheGLD</Link></Button>
                    <br />
                    <br />
                    <Text color="brand.900">Get updates for competitions and events.</Text>
                  </Box>
                </SimpleGrid>
              </Box>
              <Box>
                <Text fontSize="2xl" color="brand.900">Register your venue and host competitions and events.</Text>
                <br />
                <Text fontSize="2xl" color="brand.900">Form new gaming clubs and teams to compete in your favourite games.</Text>
                <br />
                <Text fontSize="2xl" color="brand.900">Build your profile as a team or a streamer.</Text>
                <br />
                <Text fontSize="2xl" color="brand.900">Discover up and coming talent in your city.</Text>
              </Box>
            </SimpleGrid>
          </Section>
          <Section horizontalPadding verticalPadding bg="#0A154A">
            <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4}>
              <Box
                border="1px solid #0098dc"
                borderRadius="10px"
                padding="2em">
                <Text as="h4" fontSize="2xl" color="brand.300">Venues & Clubs</Text>
                <br />
                <Icon name="location" size="64px" color="brand.300" />
                <br />
                <Text as="h5" fontSize="3xl" color="white">Who is this for?</Text>
                <br />
                <Text as="h6" fontSize="xl" color="brand.300">LAN Cafes, Gaming bars, University clubs</Text>
                <br />
                <Text color="white">Put your venue or club on our map so that people that work and live nearby can easily find you.</Text>
              </Box>
              <Box
                border="1px solid white"
                borderRadius="10px"
                bg="white"
                padding="2em">
                <Text as="h4" fontSize="2xl" color="brand.800">Tournaments & Event organisers</Text>
                <br />
                <Icon name="people" size="64px" color="brand.800" />
                <br />
                <Text as="h5" fontSize="3xl" color="brand.900">Who is this for?</Text>
                <br />
                <Text as="h6" fontSize="xl" color="brand.800">Event organisers, venues and clubs</Text>
                <br />
                <Text color="brand.900">Add your events and competitions to our calendar so that gamers in Melbourne will know what's on and when.</Text>
              </Box>
              <Box
                border="1px solid #0098dc"
                borderRadius="10px"
                padding="2em">
                <Text as="h4" fontSize="2xl" color="brand.300">Gamers</Text>
                <br />
                <Icon name="controller" size="64px" color="brand.300" />
                <br />
                <Text as="h5" fontSize="3xl" color="white">Who is this for?</Text>
                <br />
                <Text as="h6" fontSize="xl" color="brand.300">PS4, XBOX, Nintendo, PC, Mobile (and everything in between)</Text>
                <br />
                <Text color="white">Find people at work, school or uni who are playing the same game as you.<br />Start your own get-togethers and promote them on our map.<br />Easily find places to Play, Compete & Watch your favourite games.</Text>
              </Box>
            </SimpleGrid>
          </Section>
          <Section horizontalPadding verticalPadding bg="#EE215B">
            <Text as="h3" fontSize="5xl" color="white">JOIN THE GLD TODAY!</Text>
            <br />
            <RegisterForm gtm={{ subCategory: "homepage" }} />
          </Section>
        </div>
      </Layout>
    )
  }
}

export default Home