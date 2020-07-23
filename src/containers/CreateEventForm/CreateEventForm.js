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
import InputRadio from "./../../components/InputRadio/InputRadio"
import InputSelect from "./../../components/InputSelect/InputSelect"
import InputSearchable from "../../components/InputSearchable/InputSearchable"
import SubmitButton from "./../../components/SubmitButton/SubmitButton"

const CreateEventForm = (props) => {
  const [step, setStep] = useState("eventType")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [games, setGames] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [userProfile, setUserProfile] = useState([])
  const [eventType, setEventType] = useState("tournament")

  useEffect(() => {
    axios.all([
      axios.get("https://api.thegld.gg/api/v1/game/list"),
      axios.get("https://api.thegld.gg/api/v1/platform/list"),
      axios({
        method: "GET",
        headers: {
          "x-access-token": props.user.access_token
        },
        url: "https://api.thegld.gg/api/v1/user/me"
      })
    ])
      .then(axios.spread(function (game, platform, profile) {
        setGames(game.data.games)
        setPlatforms(platform.data.platforms)
        setUserProfile(profile.data.user)
      }))
  }, [props.user.access_token])

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
          location: "online",
          event_place: "online",
          venueId: "",
          days: "0",
          weeks: "0"
        }}
        onSubmit={(values, actions) => {
          setLoading(true)
          const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null
          if (!user) return

          axios({
            method: "POST",
            headers: {
              "x-access-token": user.access_token
            },
            url: "https://api.thegld.gg/api/v1/event/create",
            data: {
              userId: userProfile.id,
              name: values.name,
              platforms: [values.platform],
              date: values.date,
              event_type: eventType,
              days: Number(values.days),
              venueId: values.venueId,
              weeks: values.weeks,
              event_place: values.event_place,
              gameId: values.gameId,
              individual: values.teamComposition === "individual" ? 1 : 0,
              team: values.teamComposition === "team" ? 1 : 0,
              team_members: Number(values.team_members),
              format: values.format,
              fee_type: values.fee_type,
              sponser: 0,
              event_privacy: values.event_privacy
            }
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

              gtmHandler({
                event: "create event success",
                eventType: "form_response",
                category: {
                  primaryCategory: "form interaction",
                  subCategory: props.gtm.subCategory
                },
                additionalProps: {
                  venue: {
                    name: values.name,
                    date: values.date,
                    game: values.gameId,
                    venue: values.venueId,
                    platform: values.platform
                  }
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
      >{
        props =>
        <Form>
          <div style={{ width: "375px", maxWidth: "100%", margin: "0 auto" }}>
            <div
              style={{
                display: step === "eventType" ? "block" : "none", // Event Type
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                What kind of event would you like to organise?
              </Text>
              <br />
              <Button {...buttonProps} onClick={() => {
                setEventType("social")
                setStep("date")
              }}>
                Social event
              </Button>
              <br /><br />
              <Button {...buttonProps} onClick={() => {
                setEventType("tournament")
                setStep("date")
              }}>
                Tournament
              </Button>
              <br /><br />
              <Button {...buttonProps} onClick={() => {
                setEventType("league")
                setStep("date")
              }}>
                League
              </Button>
            </div>
            <div
              style={{
                display: step === "date" ? "block" : "none", // Event Type
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                {`What date will your ${eventType === "league" ? "league start" : `${eventType} be on`}?`}
              </Text>
              <br />
              <InputText
                label="name"
                name="name"
                placeholder="Event name" />
              <InputText
                label="date"
                name="date"
                placeholder="date"
                type="date" />
              {
                eventType === "tournament" &&
                <div>
                  <Text as="h3" fontSize="xl" color="white">
                    Over how many days will your event be held?
                  </Text>
                  <br />
                  <InputSelect
                    name="days"
                    color="brand.900"
                  >
                    <option value={1} selected>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </InputSelect>
                </div>
              }
              {
                eventType === "league" &&
                <div>
                  <Text as="h3" fontSize="xl" color="white">
                    How many weeks will your league run for?
                  </Text>
                  <br />
                  <InputSelect
                    name="weeks"
                    color="brand.900"
                  >
                    <option value={1} selected>1</option>
                    <option value={2}>2</option>
                  </InputSelect>
                </div>
              }
              <br /><br />
              <Button {...buttonProps} onClick={() => setStep("eventPrivacy")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "eventPrivacy" ? "block" : "none"
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                What kind of event will this be?
              </Text>
              <br />
              <div>
                <InputRadio
                  name="event_privacy"
                  value="private"
                >
                  Private - Invite only
                </InputRadio>
                <InputRadio
                  name="event_privacy"
                  value="public"
                >
                  Public - Anyone can join
                </InputRadio>
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("eventLocation")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "eventLocation" ? "block" : "none", // Event Type
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Where will this event be held?
              </Text>
              <br />
              <Button {...buttonProps} onClick={() => setStep("platforms")}>
                Online
              </Button>
              <br /><br />
              <Button {...buttonProps} onClick={() => setStep("physicalLocation")}>
                Physical location
              </Button>
            </div>
            <div
              style={{
                display: step === "physicalLocation" ? "block" : "none", // Organiser Venue
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Select a venue from the list
              </Text>
              <br />
              <InputSearchable
                label="Venue Name"
                name="venueId"
                type = "venueId"
                formProps={props}
                placeholder="Venue Name"
                searchType="venue"
              />
              <Button {...buttonProps} onClick={() => setStep("platforms")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "platforms" ? "block" : "none", // Preferred platforms
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                What platform will your event be played on?
              </Text>
              <br />
              <div>
                {
                  platforms &&
                  platforms.length > 0 &&
                  platforms.map(platform => {
                    return (
                      <InputRadio
                        key={platform.id}
                        name="platform"
                        value={platform.id}
                      >
                        {platform.name}
                      </InputRadio>
                    )
                  })
                }
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("games")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "games" ? "block" : "none", // Venue games
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Games available to play
              </Text>
              <br />
              <div>
                {
                  games &&
                  games.length > 0 &&
                  games.map(game => {
                    if (game.platforms.findIndex(item => item.id === props.values.platform) === -1) return null
                    return (
                      <InputRadio
                        key={game.id}
                        name="gameId"
                        value={game.id}
                      >
                        {game.name}
                      </InputRadio>
                    )
                  })
                }
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("teamComposition")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "teamComposition" ? "block" : "none", // Venue games
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Is this event for individuals or teams?
              </Text>
              <br />
              <div>
                <InputRadio
                  name="teamComposition"
                  value="individual"
                >
                  Individuals
                </InputRadio>
                <InputRadio
                  name="teamComposition"
                  value="team"
                >
                  Teams
                </InputRadio>
              </div>
              {
                props.values.teamComposition === "team" &&
                <div>
                  <br /><br />
                  <Text as="h4" fontSize="3xl" color="white">
                    How many players can join per team?
                  </Text>
                  <br />
                  <InputSelect
                    name="team_members"
                    color="brand.900"
                  >
                    <option value={2} selected>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </InputSelect>
                </div>
              }
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("format")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "format" ? "block" : "none", // Venue games
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                What format will the game be played in?
              </Text>
              <br />
              <div>
                <InputRadio
                  name="format"
                  value="pool-system"
                >
                  Pool system
                </InputRadio>
                <InputRadio
                  name="format"
                  value="knockout"
                >
                  Knockout
                </InputRadio>
                <InputRadio
                  name="format"
                  value="round-robin"
                >
                  Round robin
                </InputRadio>
                <InputRadio
                  name="format"
                  value="double-round-robin"
                >
                  Double round robin
                </InputRadio>
              </div>
              <br />
              <Text as="cite">Teams will be matched up randomly upon registration, you can customise these before the event starts.</Text>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("fee")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "fee" ? "block" : "none", // Venue games
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Will there be a fee for this event?
              </Text>
              <br />
              <div>
                <InputRadio
                  name="fee_type"
                  value="free"
                >
                  Free event
                </InputRadio>
                <InputRadio
                  name="fee_type"
                  value="prize"
                >
                  Prize pool
                </InputRadio>
                <InputRadio
                  name="fee_type"
                  value="entry-fee"
                >
                  Entry fee
                </InputRadio>
              </div>
              <br /> <br />
              <SubmitButton isLoading={loading} {...buttonProps} onClick={() => setStep("thanks")}>
                Next
              </SubmitButton>
            </div>
            <div
              style={{
                display: step === "thanks" ? "block" : "none"
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Your event has now been setup!
              </Text>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Post to Facebook
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Post to Discord
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep(100)}>
                Post to twitter
              </Button>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setResult({ redirect: "/" })}>
                Home
              </Button>
            </div>
          </div>
        </Form>
        }
      </Formik>
    </>
  )
}

export default CreateEventForm
