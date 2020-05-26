import React, { useState, useEffect } from "react"
import { Redirect } from "react-router"
import { Formik, Form} from "formik"
import axios from "axios"
import {
  Text,
  Button
} from "@chakra-ui/core"
import gtmHandler from "../../utils/gtmHandler"
import InputText from "./../../components/InputText/InputText"
import InputCheckBox from "./../../components/InputCheckBox/InputCheckBox"
import SubmitButton from "./../../components/SubmitButton/SubmitButton"

const RegisterJourneyForm = (props) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [games, setGames] = useState([])
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState("gamer")

  useEffect(() => {
    axios
      .get("https://api.thegld.gg/api/v1/game/list")
      .then(response => {
        setGames(response.data.games)
      })
      .catch(error => {
        console.log('error in fetching games', error)
      })
  }, [])

  if (result && result.redirect) {
    return (
      <Redirect push to={result.redirect} />
    )
  }

  const buttonProps = {
    color: "white",
    bg: "#0A154A",
    size: "lg",
    width: "100%",
    fontSize: "3xl",
    _hover: {
      bg: "brand.300",
      color: "brand.900"
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          games: [],
          genres: [],
          platforms: [],
          vname: "",
          vaddress: "",
          venuePlatforms: [],
          venueFacilities: [],
          venueGamingFacilities: [],
          gamerType: "",
          organiserPlatforms: [],
          organiserGames: [],
          organiserEquipment: []
        }}
        onSubmit={(values, actions) => {
          setLoading(true)
          axios
            .post("https://api.thegld.gg/api/v1/user/register-journey", {
              userType,
              values
            })
            .then(response => {
              actions.setSubmitting(false)
              setLoading(false)

              if (response.data.error) {
                setResult({
                  messages: Object.values(response.data.data).map(item => item[0]),
                  status: "error"
                })
              }
              setResult({
                messages: ["You have successfully registered."],
                status: "success"
              })
              gtmHandler({
                event: "registration journey success",
                eventType: "form_response",
                category: {
                  primaryCategory: "form interaction",
                  subCategory: props.gtm.subCategory
                }
              })
            })
            .catch(error => {
              setResult({
                messages: ["Something went wrong."],
                status: "error"
              })
            })
        }}        
      >
        <Form>
          <div style={{ width: "375px", maxWidth: "100%", margin: "0 auto" }}>
            <div
              style={{
                display: step === 1 ? "block" : "none", // A little bit about yourself
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                First, a bit about yourself
              </Text>
              <br />
              <Button {...buttonProps} onClick={() => setStep(2)}>
                Next
              </Button>
              <br />
              <br />
              <Button {...buttonProps} onClick={() => setStep(12)}>
                Add later
              </Button>
            </div>
            <div
              style={{
                display: step === 2 ? "block" : "none", // Preferred platforms
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Preferred platforms
              </Text>
              <br />
              <div>
                <InputCheckBox name="platforms" value="pc">PC</InputCheckBox>
                <InputCheckBox name="platforms" value="ps4">PS4</InputCheckBox>
                <InputCheckBox name="platforms" value="xbox">XBox</InputCheckBox>
                <InputCheckBox name="platforms" value="nintendo">Nintendo</InputCheckBox>
                <InputCheckBox name="platforms" value="mobile">Mobile</InputCheckBox>
                <InputCheckBox name="platforms" value="arcade">Arcade</InputCheckBox>
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(3)}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === 3 ? "block" : "none", // Favourite genres
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Favourite genres
              </Text>
              <br />
              <div>
                <InputCheckBox name="genres" value="rts">Real Time Strategy</InputCheckBox>
                <InputCheckBox name="genres" value="fps">First Person Shooter</InputCheckBox>
                <InputCheckBox name="genres" value="sports">Sports</InputCheckBox>
                <InputCheckBox name="genres" value="multiplayer">Multiplayer</InputCheckBox>
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(4)}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === 4 ? "block" : "none", // Favourite games
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Favourite games
              </Text>
              <br />
              <div>
                <InputCheckBox name="games" value="lol">League of Legends</InputCheckBox>
                <InputCheckBox name="games" value="dota2">DOTA2</InputCheckBox>
                <InputCheckBox name="games" value="cod">Call of Duty</InputCheckBox>
                <InputCheckBox name="games" value="overwatch">Overwatch</InputCheckBox>
                <InputCheckBox name="games" value="hots">Heroes of the storm</InputCheckBox>
                <InputCheckBox name="games" value="csgo">CS:GO</InputCheckBox>
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(5)}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === 5 ? "block" : "none", // What are you here to do ??
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                I am here to
              </Text>
              <br />
              <Button {...buttonProps} onClick={() => {
                setUserType("venue")
                setStep(6)
              }}>
                Register my venue
              </Button>
              <br />
              <br />
              <Button {...buttonProps} onClick={() => {
                setUserType("organiser")
                setStep(13)
              }}>
                Organise tournaments
              </Button>
              <br />
              <br />
              <Button {...buttonProps} onClick={() => {
                setUserType("gamer")
                setStep(11)
              }}>
                Play in tournaments
              </Button>
            </div>
            <div
              style={{
                display: step === 6 ? "block" : "none", // Venue info
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Venue Info
              </Text>
              <br />
              <InputText
                label="Venue Name"
                name="vname"
                type="vname"
                placeholder="Venue Name"
              />
              <InputText
                label="Venue Address"
                name="vaddress"
                type="vaddress"
                placeholder="Venue Address"
              />
              <Button {...buttonProps} onClick={() => setStep(7)}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === 7 ? "block" : "none", // Venue platforms
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Available platforms
              </Text>
              <br />
              <div>
                <InputCheckBox name="venuePlatforms" value="pc">PC</InputCheckBox>
                <InputCheckBox name="venuePlatforms" value="ps4">PS4</InputCheckBox>
                <InputCheckBox name="venuePlatforms" value="xbox">XBox</InputCheckBox>
                <InputCheckBox name="venuePlatforms" value="nintendo">Nintendo</InputCheckBox>
                <InputCheckBox name="venuePlatforms" value="mobile">Mobile</InputCheckBox>
                <InputCheckBox name="venuePlatforms" value="arcade">Arcade</InputCheckBox>
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(8)}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === 8 ? "block" : "none", // Gaming facilities
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Gaming facilities
              </Text>
              <br />
              <div>
                <InputCheckBox name="venueGamingFacilities" value="lan">LAN</InputCheckBox>
                <InputCheckBox name="venueGamingFacilities" value="pgb">Private Gaming Booths</InputCheckBox>
                <InputCheckBox name="venueGamingFacilities" value="booth">Private booth</InputCheckBox>
                <InputCheckBox name="venueGamingFacilities" value="stream">TV screens / streams</InputCheckBox>
                <InputCheckBox name="venueGamingFacilities" value="arena">Arena</InputCheckBox>
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(9)}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === 9 ? "block" : "none", // Venue facilities
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Venue facilities
              </Text>
              <br />
              <div>
                <InputCheckBox name="venueFacilities" value="sd">Soft drinks</InputCheckBox>
                <InputCheckBox name="venueFacilities" value="ad">Alcoholic drinks</InputCheckBox>
                <InputCheckBox name="venueFacilities" value="food">Food</InputCheckBox>
              </div>
              <br /> <br />
              <SubmitButton isLoading={loading} {...buttonProps} onClick={() => setStep(10)}>
                Next
              </SubmitButton>
            </div>
            <div
              style={{
                display: step === 10 ? "block" : "none", // Venue thanks
              }}
            >
              <Text as="h3" fontSize="xl" color="white">
                Thank you!
              </Text>
              <br />
              <Text as="h4" fontSize="3xl" color="white">
                Welcome to The GLD
              </Text>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                View venue on the map
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Link Facebook
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Link Twitch
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Link Twitter
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Manage venue profile
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setResult({ redirect: "/" })}>
                Home
              </Button>
            </div>
            <div
              style={{
                display: step === 11 ? "block" : "none", // Gamer looking for
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                I am looking to
              </Text>
              <br />
              <div>
                <InputCheckBox name="gamerType" value="social">Play socially</InputCheckBox>
                <InputCheckBox name="gamerType" value="comp">Play competitively</InputCheckBox>
                <InputCheckBox name="gamerType" value="other">Other</InputCheckBox>
              </div>
              <br /> <br />
              <SubmitButton isLoading={loading} {...buttonProps} onClick={() => setStep(12)}>
                Next
              </SubmitButton>
            </div>
            <div
              style={{
                display: step === 12 ? "block" : "none", // Gamer thanks
              }}
            >
              <Text as="h3" fontSize="xl" color="white">
                Thank you!
              </Text>
              <br />
              <Text as="h4" fontSize="3xl" color="white">
                Welcome to The GLD
              </Text>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Invite friends
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Update profile
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Find tournaments
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setResult({ redirect: "/" })}>
                Home
              </Button>
            </div>
            <div
              style={{
                display: step === 13 ? "block" : "none", // Organiser info
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Organiser Info
              </Text>
              <br />
              <Text as="p" fontSize="xl" color="white">
                Now, some information on how you will manage tournamrnts.
              </Text>
              <br />
              <InputText
                label="Organiser Alias"
                name="oalias"
                type="oalias"
                placeholder="Organiser Alias"
              />
              <Button {...buttonProps} onClick={() => setStep(14)}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === 14 ? "block" : "none", // Organiser platforms
              }}
            >
              <Text as="h4" fontSize="xl" color="white">
                Which platforms will you be mostly creating tournaments for?
              </Text>
              <br />
              <div>
                <InputCheckBox name="organiserPlatforms" value="pc">PC</InputCheckBox>
                <InputCheckBox name="organiserPlatforms" value="ps4">PS4</InputCheckBox>
                <InputCheckBox name="organiserPlatforms" value="xbox">XBox</InputCheckBox>
                <InputCheckBox name="organiserPlatforms" value="nintendo">Nintendo</InputCheckBox>
                <InputCheckBox name="organiserPlatforms" value="mobile">Mobile</InputCheckBox>
                <InputCheckBox name="organiserPlatforms" value="arcade">Arcade</InputCheckBox>
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(15)}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === 15 ? "block" : "none", // Organiser games
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Games you would like to organise tournaments for?
              </Text>
              <br />
              <div>
                <InputCheckBox name="organiserGames" value="lol">League of Legends</InputCheckBox>
                <InputCheckBox name="organiserGames" value="dota2">DOTA2</InputCheckBox>
                <InputCheckBox name="organiserGames" value="cod">Call of Duty</InputCheckBox>
                <InputCheckBox name="organiserGames" value="overwatch">Overwatch</InputCheckBox>
                <InputCheckBox name="organiserGames" value="hots">Heroes of the storm</InputCheckBox>
                <InputCheckBox name="organiserGames" value="csgo">CS:GO</InputCheckBox>
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(16)}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === 16 ? "block" : "none", // Organiser equipment
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                What equipments will you need for your tournaments?
              </Text>
              <br />
              <div>
                <InputCheckBox name="organiserEquipment" value="vEquip">Venue equipment</InputCheckBox>
                <InputCheckBox name="organiserEquipment" value="byoEquip">BYO equipment</InputCheckBox>
                <InputCheckBox name="organiserEquipment" value="sourceEquip">I would like to source the equipment when I need it</InputCheckBox>
              </div>
              <br /> <br />
              <SubmitButton isLoading={loading} {...buttonProps} onClick={() => setStep(17)}>
                Next
              </SubmitButton>
            </div>
            <div
              style={{
                display: step === 17 ? "block" : "none", // Organiser thanks
              }}
            >
              <Text as="h3" fontSize="xl" color="white">
                Thank you!
              </Text>
              <br />
              <Text as="h4" fontSize="3xl" color="white">
                Welcome to The GLD
              </Text>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Invite friends
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Update personal profile
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Update organiser profile
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Share on social media
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setResult({ redirect: "/" })}>
                Home
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default RegisterJourneyForm
