import React from "react"
import { Link } from "react-router-dom"
import heroStyles from "../../containers/Hero/Hero.module.css"
import gtmHandler from "../../utils/gtmHandler"
import Layout from "../../containers/Layout/Layout"
import { SimpleGrid, Text, Box, Icon, Button, Image } from "@chakra-ui/core"
import Section from "../../components/Section/Section"
import RegisterForm from "../../containers/RegisterForm/RegisterForm"

class Home extends React.Component {
  componentDidMount() {
    gtmHandler({
      event: "trackPage",
      eventType: "page_view",
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
        <Box>
          <Section horizontalPadding bg={`linear-gradient(117.79deg, #52C3FF 27.59%, #008DD7 93.69%);`}>
            <div className={heroStyles.hero}>
              <Box className={heroStyles.heroHomepageContent} display="flex" justifyContent="center" flexDirection="column">
                <Text as="h1" fontSize="5xl" color="#ffffff">Welcome<br />to <span style={{ color: "#EC1D51" }}>the Gld.</span></Text>
                <br />
                <Text as="p" fontSize="lg" color="#ffffff">Gaming is a healthy, challenging and fun activity that plays an important role in our lives. But at some point gaming became too competitive and rarely compares to the memories to those endless summers of gaming with your mates.</Text>
                <br />
                <Button
                  color="white"
                  bg="#EC1D51"
                  size="lg"
                  width="fit-content"
                  onClick={() => {
                    gtmHandler({
                      event: "register your venue",
                      eventType: "button_click",
                      category: {
                        primaryCategory: "content interaction",
                        subCategory: "homepage"
                      }
                    })
                  }}><Link to="/register">Join the Gld. today</Link>
                </Button>
              </Box>
              <Box className={heroStyles.heroHomepageBg} display="flex" justifyContent="center" flexDirection="column">
                <Image src="/hero-homepage.png" alt="The GLD" display="inline-block" maxWidth="100%" />
              </Box>
            </div>
          </Section>
          <Section horizontalPadding verticalPadding bg="#DEE4EE">
            <Box className="text-65" display="inline-block" textAlign="left">
              <Text as="h2" fontSize="5xl" color="#4E4C5C"><span style={{ color: "#EC1D51" }}>We are for</span> gamers, sometimes gamers, and everyone in-between.</Text>
              <br />
              <Text as="p" fontSize="lg" color="#4E4C5C">The Gld. reimagines casual gaming, combining it with the healthy un-competition of a dodge-ball league. The camaraderie, the friends, the jokes, the laughs, the beers after the game.<br/>All you have to do is chose to play. We can find you a team or you can form you own. Or if you are super keen, you can host a private league. Start being social with your mate, colleagues or connect with a new circle of friends who are just like you. </Text>
            </Box>
            <Box className="text-35" display="inline-block" textAlign="right">
              <Image className="hide-mobile" src="/hero-dots.png" alt="dots" margin="0 0 0 auto" maxWidth="100%" maxHeight="250px" />
            </Box>
            <br /><br /><br /><br />
            <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={8}>
              <Box>
                <Text as="h3" fontSize="3xl" color="#4E4C5C" textAlign="left"><Icon name="people" size="32px" />&nbsp;&nbsp;Meet people</Text>
                <br />
                <Text as="p" textAlign="left" fontSize="lg" color="#4E4C5C">Play to re-connect your friendship group or if you are looking to expand your friendship circle. The Gld. is the best place to meet people that share a passion for video games.</Text>
              </Box>
              <Box>
                <Text as="h3" fontSize="3xl" color="#4E4C5C" textAlign="left"><Icon name="time" size="32px" />&nbsp;&nbsp;Time poor</Text>
                <br />
                <Text as="p" textAlign="left" fontSize="lg" color="#4E4C5C">Play because you need an excuse to find time for gaming. Finding time for friends and gaming is tricky, why not do both? Grab your mates and make a team, then each week you have the chance to catch up, game, and enjoy a cheeky beer post game.</Text>
              </Box>
              <Box>
                <Text as="h3" fontSize="3xl" color="#4E4C5C" textAlign="left"><Icon name="location" size="32px" />&nbsp;&nbsp;Be local</Text>
                <br />
                <Text as="p" textAlign="left" fontSize="lg" color="#4E4C5C">Play online or in person. The Gld. is focused on connecting gamers in local communities. You can visit a local Clubhouse and join regular events, access perks and meet your fellow gamers. Each Clubhouse is also with PCs, Xbox’s, PlayStation’s and Nintendo Switch’s to ensure play is fun and easy.</Text>
              </Box>
            </SimpleGrid>
          </Section>
          <Section horizontalPadding verticalPadding bg="#FFFFFF">
            <Box className="text-65" display="inline-block" textAlign="left">
              <Text as="h2" fontSize="5xl" color="#4E4C5C"><span style={{ color: "#EC1D51" }}>Why join the Gld?</span><br/>It’s more than gaming.</Text>
              <br />
              <Text as="p" fontSize="lg" color="#4E4C5C">Being a member is so much more than just turning up and logging on to play games. We offer a social calendar of events, you can enjoy league nights, tournaments, season enders, parties, prize pools and that’s just to start.</Text>
              <br />
              <Button
                color="white"
                bg="#EC1D51"
                size="lg"
                width="fit-content"
                onClick={() => {
                  gtmHandler({
                    event: "register your venue",
                    eventType: "button_click",
                    category: {
                      primaryCategory: "content interaction",
                      subCategory: "homepage"
                    }
                  })
                }}><Link to="/register">Join the Gld. today</Link>
              </Button>
            </Box>
            <Box className="text-35" display="inline-block" textAlign="right">
              <Image className="hide-mobile" src="/mouse.png" alt="dots" margin="-64px 0 -64px auto" maxWidth="100%" maxHeight="430px" />
            </Box>
          </Section>
          {/* <Section horizontalPadding verticalPadding bg="#0A154A">
            <SimpleGrid minChildWidth="280px" spacing="40px">
              <Box display="flex" justifyContent="center" flexDirection="column">
                <Image src="/logo.svg" alt="The GLD" display="inline-block" maxWidth="100%" width="512px" />
              </Box>
              <Box display="flex" justifyContent="center" flexDirection="column">
                <Text fontSize="4xl" color="brand.800">The GLD exists to connect gamers with other gamers. We are putting the different parts of Melbourne"s gaming community on the map.</Text>
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
                          eventType: "button_click",
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
                          eventType: "button_click",
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
                <Text color="brand.900">Add your events and competitions to our calendar so that gamers in Melbourne will know what"s on and when.</Text>
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
          </Section> */}
          <Section horizontalPadding verticalPadding bg="#DEE4EE">
            <RegisterForm gtm={{ subCategory: "homepage" }} />
          </Section>
        </Box>
      </Layout>
    )
  }
}

export default Home