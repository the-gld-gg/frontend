import React from 'react'
import { Link } from "react-router-dom"
import Layout from '../../containers/Layout/Layout'
import styles from "./Home.module.css"
import { SimpleGrid, Text, Box, Icon, Button, Image } from "@chakra-ui/core"
import Card from "../../components/Card/Card"
import Section from '../../components/Section/Section'
import Hero from '../../containers/Hero/Hero'
import RegisterForm from "../../containers/RegisterForm/RegisterForm"
import Map from '../../containers/Map/Map'

const Home = ({
  children
}) => (
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
      {/* <Section horizontalPadding verticalPadding fullWidth bg="#EE215B">
        <Box>
          <Text as="h4" fontSize="2xl" color="brand.900">Register your venue and host competitions and events.</Text>
          <br />
          <Text as="h4" fontSize="2xl" color="brand.900">Form new gaming clubs and teams to compete in your favourite games.</Text>
          <br />
          <Text as="h4" fontSize="2xl" color="brand.900">Build your profile as a team or a streamer.</Text>
          <br />
          <Text as="h4" fontSize="2xl" color="brand.900">Discover up and coming talent in your city.</Text>
        </Box>
      </Section> */}
      {/* <Section horizontalPadding verticalPadding bg="#0A154A">
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4}>
          <Card
            imageSrc="https://images.unsplash.com/photo-1467444606224-8254b013a046?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
            href="/register"
            heading="Connect"
            description="Find your local gaming clubs, LAN cafes and gaming bars." />
          <Card
            imageSrc="https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
            href="/register"
            heading="Join"
            description="Register your team and compete in local competitions."
            linkText="Register" />
          <Card
            imageSrc="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
            href="/login"
            heading="Play"
            description="Discover new places to spectate local or professional E-Sports."
            linkText="Login" />
        </SimpleGrid>
      </Section> */}
      <Section horizontalPadding verticalPadding fullWidth bg="#EE215B">
        <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing={4}>
          <Box>
            <Text as="h3" fontSize="4xl" color="brand.900">Put yourself on the map</Text>
            <br/>
            <SimpleGrid columns={{ xs: 1, sm: 2 }} spacing={4}>
              <Box>
                <Button variantColor="blue" variant="outline" size="lg" maxWidth="100%"><Link to="/register">Register your venue</Link></Button>
                <br />
                <br />
                <Text color="brand.900">Show gamers your location.</Text>
              </Box>
              <Box>
                <Button variantColor="blue" variant="outline" size="lg" maxWidth="100%"><Link to="/register">Sign up to TheGLD</Link></Button>
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
      {/* <Section horizontalPadding verticalPadding bg="#0A154A">
        <Text as="h1" fontSize="5xl" color="brand.800">Spectate <Box display={["block", "block", "none"]} />-<Box display={["block", "block", "none"]} /> Compete <Box display={["block", "block", "none"]} />-<Box display={["block", "block", "none"]} /> Host</Text>
        <br />
        <Text fontSize="2xl" color="brand.800">We want to meet every single gamer and gaming group in Melbourne and bring the whole community closer together to create the most exciting local gaming scene in the world.</Text>
        <br />
        <br />
        <Text as="h1" fontSize="3xl" color="brand.800">Who is this for?</Text>
        <br />
        <Text fontSize="2xl" color="brand.800">We are creating a platform for the modern gamer who would like to experience games in an environment bigger than their own house. From casual to ranked games, find where to play, build your own or your team's profile and help grow this community!</Text>
        <br /><br />
        <Button size="lg" bg="#EE215B" color="brand.900" maxWidth="100%"><Link to="/register">Sign up to TheGLD</Link></Button>
      </Section> */}
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
            <Text color="white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
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
            <Text color="brand.900">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
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
            <Text color="white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          </Box>
        </SimpleGrid>
      </Section>
      <Section horizontalPadding verticalPadding bg="#EE215B">
        <Text as="h3" fontSize="5xl" color="white">JOIN THE GLD TODAY!</Text>
        <br />
        <RegisterForm minimal />
      </Section>
    </div>
  </Layout>
)

export default Home