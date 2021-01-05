import React from "react"
import { Link } from "react-router-dom"
import heroStyles from "../../containers/Hero/Hero.module.css"
import gtmHandler from "../../utils/gtmHandler"
import Layout from "../../containers/Layout/Layout"
import { SimpleGrid, Text, Box, Icon, Button, Image } from "@chakra-ui/core"
import Section from "../../components/Section/Section"

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
        </Box>
      </Layout>
    )
  }
}

export default Home