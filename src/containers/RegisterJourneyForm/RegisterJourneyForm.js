import React, { useState } from "react"
import { Redirect } from "react-router"
import { Formik, Form} from "formik"
import * as Yup from "yup"
import axios from "axios"
import {
  Alert,
  AlertIcon,
  Text,
  ButtonGroup,
  Button,
  CheckboxGroup,
  Checkbox
} from "@chakra-ui/core"
import gtmHandler from "../../utils/gtmHandler"
import InputText from "./../../components/InputText/InputText"
import SubmitButton from "./../../components/SubmitButton/SubmitButton"
import { Link } from "react-router-dom"

const RegisterJourneyForm = (props) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [step, setStep] = useState(1)

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

  const RenderStep = () => {
    return (
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="pc">PC</Checkbox>
            <Checkbox value="ps4">PS4</Checkbox>
            <Checkbox value="xbox">XBox</Checkbox>
            <Checkbox value="nintendo">Nintendo</Checkbox>
            <Checkbox value="mobile">Mobile</Checkbox>
            <Checkbox value="arcade">Arcade</Checkbox>
          </CheckboxGroup>
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="rts">Real Time Strategy</Checkbox>
            <Checkbox value="fps">First Person Shooter</Checkbox>
            <Checkbox value="sports">Sports</Checkbox>
            <Checkbox value="multiplayer">Multiplayer</Checkbox>
          </CheckboxGroup>
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="lol">League of Legends</Checkbox>
            <Checkbox value="dota">DOTA2</Checkbox>
            <Checkbox value="cod">Call of Duty</Checkbox>
            <Checkbox value="overwatch">Overwatch</Checkbox>
            <Checkbox value="hots">Heroes of the storm</Checkbox>
            <Checkbox value="csgo">CS: GO</Checkbox>
          </CheckboxGroup>
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
          <Button {...buttonProps} onClick={() => setStep(6)}>
            Register my venue
          </Button>
          <br />
          <br />
          <Button {...buttonProps} onClick={() => setStep(13)}>
            Organise tournaments
          </Button>
          <br />
          <br />
          <Button {...buttonProps} onClick={() => setStep(11)}>
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
          <Formik>
            <Form>
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
            </Form>
          </Formik>
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="pc">PC</Checkbox>
            <Checkbox value="ps4">PS4</Checkbox>
            <Checkbox value="xbox">XBox</Checkbox>
            <Checkbox value="nintendo">Nintendo</Checkbox>
            <Checkbox value="mobile">Mobile</Checkbox>
            <Checkbox value="arcade">Arcade</Checkbox>
          </CheckboxGroup>
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="lan">LAN</Checkbox>
            <Checkbox value="pgb">Private Gaming Booths</Checkbox>
            <Checkbox value="pb">Private booth</Checkbox>
            <Checkbox value="tv">TV screens / streams</Checkbox>
            <Checkbox value="arena">Arena</Checkbox>
          </CheckboxGroup>
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="sd">Soft drinks</Checkbox>
            <Checkbox value="ad">Alcoholic drinks</Checkbox>
            <Checkbox value="food">Food</Checkbox>
          </CheckboxGroup>
          <br /> <br />
          <Button {...buttonProps} onClick={() => setStep(10)}>
            Next
          </Button>
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="socaial">Play socially</Checkbox>
            <Checkbox value="comp">Play competitively</Checkbox>
            <Checkbox value="other">Other</Checkbox>
          </CheckboxGroup>
          <br /> <br />
          <Button {...buttonProps} onClick={() => setStep(12)}>
            Next
          </Button>
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
          <Formik>
            <Form>
              <InputText
                label="Organiser Alias"
                name="oalias"
                type="oalias"
                placeholder="Organiser Alias"
              />
            </Form>
          </Formik>
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="pc">PC</Checkbox>
            <Checkbox value="ps4">PS4</Checkbox>
            <Checkbox value="xbox">XBox</Checkbox>
            <Checkbox value="nintendo">Nintendo</Checkbox>
            <Checkbox value="mobile">Mobile</Checkbox>
            <Checkbox value="arcade">Arcade</Checkbox>
          </CheckboxGroup>
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="lol">League of Legends</Checkbox>
            <Checkbox value="dota">DOTA2</Checkbox>
            <Checkbox value="cod">Call of Duty</Checkbox>
            <Checkbox value="overwatch">Overwatch</Checkbox>
            <Checkbox value="hots">Heroes of the storm</Checkbox>
            <Checkbox value="csgo">CS: GO</Checkbox>
          </CheckboxGroup>
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
          <CheckboxGroup
            variantColor="blue"
            size="lg"
            spacing={6}
            color="white"
            fontWeight="bold"
            textAlign="left"
          >
            <Checkbox value="vEquip">Venue equipment</Checkbox>
            <Checkbox value="byoEquip">BYO equipment</Checkbox>
            <Checkbox value="sourceEquip">I would like to source the equipment when I need it</Checkbox>
          </CheckboxGroup>
          <br /> <br />
          <Button {...buttonProps} onClick={() => setStep(17)}>
            Next
          </Button>
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
    )
  }

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: ""
        }}
        onSubmit={(values, actions) => {
          // setLoading(true)
          //   axios
          //     .post("https://guild.ehsangazar.com/api/register-journey", {
          //       terms: true
          //     })
          //     .then(response => {
          //       actions.setSubmitting(false)
          //       setLoading(false)

          //       if (response.data.error) {
          //         setResult({
          //           messages: Object.values(response.data.data).map(item => item[0]),
          //           status: "error"
          //         })
          //       }
          //       setResult({
          //         messages: ["You have successfully registered."],
          //         status: "success"
          //       })
          //       gtmHandler({
          //         event: "registration journey success",
          //         eventType: "form_response",
          //         category: {
          //           primaryCategory: "form interaction",
          //           subCategory: props.gtm.subCategory
          //         }
          //       })
          //     })
          //     .catch(error => {
          //       setResult({
          //         messages: ["Something went wrong."],
          //         status: "error"
          //       })
          //     })
        }}        
      >
        <Form>
          <RenderStep />
        </Form>
      </Formik>
    </>
  )
}

export default RegisterJourneyForm
