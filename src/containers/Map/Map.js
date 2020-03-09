import React from 'react'
import GoogleMap from "google-map-react"
import googleMapLoader from "google-map-react/lib/loaders/google_map_loader"
import { Box, Text, SimpleGrid, Icon } from "@chakra-ui/core"

const Map = () => (
  <Box width="100%" minHeight="70vh">
    <SimpleGrid columns={{ sm: 1, lg: 3 }} spacing={0} height="100%">
      <Box>
        <Box bg="brand.800" padding="1em">
          <Text as="h3" fontSize="2xl" color="white">Filters <Icon name="filter" size="32px" color="white" float="right" /></Text>
        </Box>
        <Box bg="white" padding="1em 2em">
          <Text fontSize="xl">Competition/Events</Text>
          <br />
          <Text fontSize="xl">Games</Text>
          <br />
          <Text fontSize="xl">Places to watch</Text>
        </Box>
        <br />
        <br />
        <Box bg="brand.800" padding="1em">
          <Text as="h3" fontSize="2xl" color="white">Upcoming tournaments <Icon name="trophy" size="32px" color="white" float="right" /></Text>
        </Box>
      </Box>
      <Box minHeight="70vh">
        <GoogleMap
          resetBoundsOnResize
          bootstrapURLKeys={{ key: "AIzaSyB6Jp61V5BnicXEcprtzV0IldSH3fKdP6c" }}
          defaultCenter = {{
            lat: -37.8390361,
            lng: 144.9997397
          }}
          defaultZoom={17}
          zoom={17}
          center={{
            lat: -37.8390361,
            lng: 144.9997397
          }}
          lockCenter>
        </GoogleMap>
      </Box>
      <Box bg="brand.900">
        <Box bg="brand.800" padding="1em">
          <Text as="h3" fontSize="2xl" color="white">Detail <Icon name="info" size="32px" color="white" float="right" /></Text>
        </Box>
        <br />
        <br />
        <Box textAlign="center">
          <Text as="h4" color="white" fontSize="2xl">Location</Text>
          <br />
          <br />
          <Text as="h4" color="brand.300" fontSize="3xl">Opening hours</Text>
        </Box>
      </Box>
    </SimpleGrid>
  </Box>
)

export default Map