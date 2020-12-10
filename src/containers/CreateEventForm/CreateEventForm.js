import React, { useState, useEffect } from "react"
import { Redirect } from "react-router"
import { Formik, Form} from "formik"
import axios from "axios"
import {
  Text,
  Box,
  Image,
  Button
} from "@chakra-ui/core"
import gtmHandler from "../../utils/gtmHandler"
import InputText from "./../../components/InputText/InputText"
import InputRadio from "./../../components/InputRadio/InputRadio"
import InputSelect from "./../../components/InputSelect/InputSelect"
import InputSearchable from "../../components/InputSearchable/InputSearchable"
import SubmitButton from "./../../components/SubmitButton/SubmitButton"
import Section from "./../../components/Section/Section"

const CreateEventForm = (props) => {
  const [step, setStep] = useState("details")
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
          eventType: "tournament",
          venueId: "",
          days: "0",
          weeks: "0",
          format: "pool-system",
          fee_type: "entry-fee"
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
          <Section verticalPadding horizontalPadding bg="#DEE4EE url(/hero-dots.png) no-repeat top right" backgroundSize="10%" textAlign="left" fullWidth>
            <Text as="h1" fontSize="5xl" color="#4E4C5C">Create an <span style={{ color: "#EC1D51" }}>event.</span></Text>
          </Section>
          <Section fullWidth verticalPadding>
            <Box display="flex">
              <Box flexShrink={0} className="hide-mobile">
                <Section horizontalPadding textAlign="left">
                  {
                    step === "details" &&
                    <Text as="h1" fontSize="5xl" color="#4E4C5C"><span style={{ color: "#EC1D51" }}>01.</span></Text>
                  }
                  {
                    step === "game" &&
                    <Text as="h1" fontSize="5xl" color="#4E4C5C"><span style={{ color: "#EC1D51" }}>02.</span></Text>
                  }
                  {
                    step === "extra" &&
                    <Text as="h1" fontSize="5xl" color="#4E4C5C"><span style={{ color: "#EC1D51" }}>03.</span></Text>
                  }
                  {
                    step === "thanks" &&
                    <Text as="h1" fontSize="5xl" color="#4E4C5C"><span style={{ color: "#EC1D51" }}>04.</span></Text>
                  }
                  <br />
                  {
                    step === "details" &&
                    <Text as="h2" fontSize="4xl" color="#4E4C5C">Tell us about the event</Text>
                  }
                  {
                    step === "game" &&
                    <Text as="h2" fontSize="4xl" color="#4E4C5C">Now tell us about the game.</Text>
                  }
                  {
                    step === "extra" &&
                    <Text as="h2" fontSize="4xl" color="#4E4C5C">How will we play this?</Text>
                  }
                  {
                    step === "thanks" &&
                    <Text as="h2" fontSize="4xl" color="#4E4C5C">All set up!<br />Now let's play.</Text>
                  }
                  <br />
                  <br />
                </Section>
                <Image src="/xboxController.png" alt="Login" margin="0 auto" display="block" />
              </Box>
              <Section horizontalPadding textAlign="left">
                <div style={{ width: "100%", maxWidth: "768px", margin: "0 auto" }}>
                  <div
                    style={{
                      display: step === "details" ? "block" : "none", // Event Type
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
                      What kind of event would you like to organise?
                    </Text>
                    <br />
                    <InputRadio
                      name="eventType"
                      value="social"
                    >
                      Social event
                    </InputRadio>
                    <InputRadio
                      name="eventType"
                      value="tournament"
                    >
                      Tournament
                    </InputRadio>
                    <InputRadio
                      name="eventType"
                      value="league"
                    >
                      League
                    </InputRadio>
                  </div>
                  <div
                    style={{
                      display: step === "details" ? "block" : "none", // Event Type
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
                      {`What date will your ${props.values.eventType === "league" ? "league start" : `${props.values.eventType} be on`}?`}
                    </Text>
                    <br />
                    <InputText
                      name="name"
                      placeholder="Event name" />
                    <InputText
                      name="date"
                      placeholder="date"
                      type="date" />
                    {
                      props.values.eventType === "tournament" &&
                      <div>
                        <Text as="h4" fontSize="xl" color="#EC1D51">
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
                      props.values.eventType === "league" &&
                      <div>
                        <Text as="h4" fontSize="xl" color="#EC1D51">
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
                  </div>
                  <div
                    style={{
                      display: step === "details" ? "block" : "none"
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
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
                  </div>
                  <div
                    style={{
                      display: step === "details" ? "block" : "none", // Event Type
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
                      Where will this event be held?
                    </Text>
                    <br />
                    <InputRadio
                      name="location"
                      value="online">
                      Online
                    </InputRadio>
                    <InputRadio
                      name="location"
                      value="physicalLocation">
                      Physical location
                    </InputRadio>
                    {
                      props.values.location === "physicalLocation" &&
                      <div>
                        <Text as="h4" fontSize="xl" color="#EC1D51">
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
                      </div>
                    }
                    <br /><br />
                    <Button
                      {...buttonProps}
                      onClick={() => {
                        setStep("game")
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        })
                      }
                    }>
                      Continue
                    </Button>
                  </div>
                  <div
                    style={{
                      display: step === "game" ? "block" : "none", // Preferred platforms
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
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
                  </div>
                  <div
                    style={{
                      display: step === "game" ? "block" : "none", // Venue games
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
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
                    <br /><br />
                    <Button
                      {...buttonProps}
                      onClick={() => {
                        setStep("extra")
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        })
                      }
                    }>
                      Continue
                    </Button>
                  </div>
                  <div
                    style={{
                      display: step === "extra" ? "block" : "none", // Venue games
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
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
                        <Text as="h4" fontSize="xl" color="#EC1D51">
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
                  </div>
                  <div
                    style={{
                      display: step === "extra" ? "block" : "none", // Venue games
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
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
                    <Text as="cite">Teams will be matched up randomly upon registration, you can customise these before the event starts.</Text>
                    <br /><br />
                  </div>
                  <div
                    style={{
                      display: step === "extra" ? "block" : "none", // Venue games
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
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
                    <SubmitButton
                      isLoading={loading}
                      {...buttonProps}
                      onClick={() => {
                        setStep("thanks")
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        })
                      }}>
                      Create event
                    </SubmitButton>
                  </div>
                  <div
                    style={{
                      display: step === "thanks" ? "block" : "none"
                    }}
                  >
                    <Text as="h3" fontSize="3xl" color="#EC1D51">
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
              </Section>
            </Box>
          </Section>
        </Form>
        }
      </Formik>
    </>
  )
}

export default CreateEventForm
