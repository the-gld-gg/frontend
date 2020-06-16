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
import InputSearchable from "../../components/InputSearchable/InputSearchable"
import InputCheckBox from "./../../components/InputCheckBox/InputCheckBox"
import SubmitButton from "./../../components/SubmitButton/SubmitButton"
import { Link } from "react-router-dom"

const RegisterJourneyForm = (props) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [games, setGames] = useState([])
  const [genres, setGenres] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [step, setStep] = useState("aboutYou")
  const [userType, setUserType] = useState("gamer")
  const [userProfile, setUserProfile] = useState([])

  useEffect(() => {
    axios.all([
      axios.get("https://api.thegld.gg/api/v1/game/list"),
      axios.get("https://api.thegld.gg/api/v1/genre/list"),
      axios.get("https://api.thegld.gg/api/v1/platform/list"),
      axios({
        method: "GET",
        headers: {
          "x-access-token": props.user.access_token
        },
        url: "https://api.thegld.gg/api/v1/user/me"
      })
    ])
      .then(axios.spread(function (game, genre, platform, profile) {
        setGames(game.data.games)
        setGenres(genre.data.genres)
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
          games: userProfile.games || [],
          genres: [],
          platforms: [],
          psn: "",
          xbox_id: "",
          steam_id: "",
          twitch_id: "",
          vname: "",
          vaddress: "",
          cpu: "",
          ram: "",
          graphic: "",
          venuePlatforms: [],
          venueGames: [],
          venueFacilities: [],
          venueGamingFacilities: [],
          gamerType: [],
          olias: "",
          organiserPlatforms: [],
          organiserGames: [],
          venueId: "",
          office: "",
          other_location: "",
          organiserEquipment: []
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
            url: "https://api.thegld.gg/api/v1/user/profile",
            data: {
              games: values.games,
              genres: values.genres,
              platforms: values.platforms,
              psn: values.psn,
              xbox_id: values.xbox_id,
              steam_id: values.steam_id,
              twitch_id: values.twitch_id
            }
          })
            .then(response => {
              if (response.data.error) {
                setResult({
                  messages: Object.values(response.data.data).map(item => item[0]),
                  status: "error"
                })
              }

              gtmHandler({
                event: "registration journey profile success",
                eventType: "form_response",
                category: {
                  primaryCategory: "form interaction",
                  subCategory: props.gtm.subCategory
                },
                additionalProps: {
                  games: values.games,
                  genres: values.genres,
                  platforms: values.platforms,
                  psn: values.psn,
                  xbox_id: values.xbox_id,
                  steam_id: values.steam_id
                }
              })

              if (userType === "venue") {
                axios({
                  method: "POST",
                  headers: {
                    "x-access-token": user.access_token
                  },
                  url: "https://api.thegld.gg/api/v1/user/profile/venue-flow",
                  data: {
                    venue: {
                      name: values.vname,
                      address: values.vaddress,
                      games: values.venueGames,
                      platforms: values.venuePlatforms,
                      cpu: values.cpu,
                      ram: values.ram,
                      graphic: values.graphic,
                      count_pc: 10,
                      lan: values.venueGamingFacilities.indexOf("lan") !== -1 ? 1 : 0,
                      gaming_booth: values.venueGamingFacilities.indexOf("gaming_booth") !== -1 ? 1 : 0,
                      booth: values.venueGamingFacilities.indexOf("booth") !== -1 ? 1 : 0,
                      tv_screens: values.venueGamingFacilities.indexOf("tv_screens") !== -1 ? 1 : 0,
                      arena: values.venueGamingFacilities.indexOf("arena") !== -1 ? 1 : 0,
                      soft_drinks: values.venueFacilities.indexOf("soft_drinks") !== -1 ? 1 : 0,
                      alchohol: values.venueFacilities.indexOf("alchohol") !== -1 ? 1 : 0,
                      food: values.venueFacilities.indexOf("food") !== -1 ? 1 : 0
                    }
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
                      event: "registration journey profile venue success",
                      eventType: "form_response",
                      category: {
                        primaryCategory: "form interaction",
                        subCategory: props.gtm.subCategory
                      },
                      additionalProps: {
                        venue: {
                          name: values.vname,
                          address: values.vaddress,
                          games: values.venueGames,
                          platforms: values.venuePlatforms,
                          gamingFacilities: values.venueGamingFacilities,
                          facilities: values.venueFacilities
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
              } else if (userType === "organiser") {
                axios({
                  method: "POST",
                  headers: {
                    "x-access-token": user.access_token
                  },
                  url: "https://api.thegld.gg/api/v1/user/profile/organiser-flow",
                  data: {
                    organiser: {
                      name: values.oalias,
                      games: values.organiserGames,
                      platforms: values.organiserPlatforms,
                      venueId: values.organiserVenueName,
                      office: values.organiserOffice,
                      other_location: values.organiserOther,
                      venue_equipment: values.organiserEquipment.indexOf("venue_equipment") !== -1 ? 1 : 0,
                      byo_equipment: values.organiserEquipment.indexOf("byo_equipment") !== -1 ? 1 : 0,
                      source_equipment: values.organiserEquipment.indexOf("source_equipment") !== -1 ? 1 : 0
                    }
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
                      event: "registration journey profile organiser success",
                      eventType: "form_response",
                      category: {
                        primaryCategory: "form interaction",
                        subCategory: props.gtm.subCategory
                      },
                      additionalProps: {
                        organiser: {
                          name: values.oalias,
                          games: values.organiserGames,
                          platforms: values.organiserPlatforms,
                          venueId: values.organiserVenueName,
                          office: values.organiserOffice,
                          other_location: values.organiserOther,
                          equipment: values.organiserEquipment
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
              } else if (userType === "gamer") {
                axios
                  .post("https://api.thegld.gg/api/v1/user/profile/user-flow", {
                    social: values.gamerType.indexOf("social") !== -1 ? 1 : 0,
                    competitive: values.gamerType.indexOf("competitive") !== -1 ? 1 : 0,
                    other: values.gamerType.indexOf("other") !== -1 ? 1 : 0
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
                      event: "registration journey profile gamer success",
                      eventType: "form_response",
                      category: {
                        primaryCategory: "form interaction",
                        subCategory: props.gtm.subCategory
                      },
                      additionalProps: {
                        gamerType: values.gamerType
                      }
                    })
                  })
                  .catch(error => {
                    setResult({
                      messages: ["Something went wrong."],
                      status: "error"
                    })
                  })
              }
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
                display: step === "aboutYou" ? "block" : "none", // A little bit about yourself
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                First, a bit about yourself
              </Text>
              <br />
              <Button {...buttonProps} onClick={() => setStep("platforms")}>
                Next
              </Button>
              <br />
              <br />
              <Button {...buttonProps} onClick={() => setStep("gamerThanks")}>
                Add later
              </Button>
            </div>
            <div
              style={{
                display: step === "platforms" ? "block" : "none", // Preferred platforms
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Preferred platforms
              </Text>
              <br />
              <div>
                {
                  platforms &&
                  platforms.length > 0 &&
                  platforms.map(platform => {
                    return (
                      <InputCheckBox
                        key={platform.id}
                        name="platforms"
                        value={platform.id}
                      >
                        {platform.name}
                      </InputCheckBox>
                    )
                  })
                }
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("genres")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "genres" ? "block" : "none", // Favourite genres
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Favourite genres
              </Text>
              <br />
              <div>
                {
                  genres &&
                  genres.length > 0 &&
                  genres.map(genre => {
                    return (
                      <InputCheckBox
                        key={genre.id}
                        name="genres"
                        value={genre.id}
                      >
                        {genre.name}
                      </InputCheckBox>
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
                display: step === "games" ? "block" : "none", // Favourite games
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Favourite games
              </Text>
              <br />
              <div>
                {
                  games &&
                  games.length > 0 &&
                  games.map(game => {
                    return (
                      <InputCheckBox
                        key={game.id}
                        name="games"
                        value={game.id}
                      >
                        {game.name}
                      </InputCheckBox>
                    )
                  })
                }
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("gamerTags")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "gamerTags" ? "block" : "none", // Gamer tags
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Add your gamer tags for more visibility
              </Text>
              <br />
              <InputText
                label="PlayStation Network"
                name="psn"
                type="psn"
                placeholder="PlayStation Network"
              />
              <InputText
                label="XBox Live"
                name="xbox_id"
                type="xbox_id"
                placeholder="XBox Live"
              />
              <InputText
                label="Steam ID"
                name="steam_id"
                type="steam_id"
                placeholder="Steam ID"
              />
              <Button {...buttonProps} onClick={() => setStep("userType")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "userType" ? "block" : "none", // What are you here to do ??
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                I am here to
              </Text>
              <br />
              <Button {...buttonProps} onClick={() => {
                setUserType("venue")
                setStep("venueInfo")
              }}>
                Register my venue
              </Button>
              <br />
              <br />
              <Button {...buttonProps} onClick={() => {
                setUserType("organiser")
                setStep("organiserInfo")
              }}>
                Organise tournaments
              </Button>
              <br />
              <br />
              <Button {...buttonProps} onClick={() => {
                setUserType("gamer")
                setStep("gamerType")
              }}>
                Play in tournaments
              </Button>
            </div>
            <div
              style={{
                display: step === "venueInfo" ? "block" : "none", // Venue info
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
                formProps={props}
                defaultValue={userProfile && userProfile.venues && userProfile.venues[0].name}
                placeholder="Venue Name"
              />
              <InputSearchable
                label="Venue Address"
                name="vaddress"
                type="vaddress"
                placeholder="Venue Address"
              />
              <Button {...buttonProps} onClick={() => setStep("venuePlatforms")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "venuePlatforms" ? "block" : "none", // Venue platforms
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Available platforms
              </Text>
              <br />
              <div>
                {
                  platforms &&
                  platforms.length > 0 &&
                  platforms.map(platform => {
                    return (
                      <InputCheckBox
                        key={platform.id}
                        name="venuePlatforms"
                        value={platform.id}
                      >
                        {platform.name}
                      </InputCheckBox>
                    )
                  })
                }
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("venueGames")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "venueGames" ? "block" : "none", // Venue games
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Games available to play
              </Text>
              <br />
              <div>
                {
                  props.values.venuePlatforms &&
                  props.values.venuePlatforms.length > 0 &&
                  props.values.venuePlatforms.map(venuePlatform => {
                    return (
                      <div key={venuePlatform}>
                        <Text as="h6" fontSize="xl" color="brand.900" textAlign="left">
                          {platforms.find(item => item.id === venuePlatform).name}
                        </Text>
                        <div>
                          {
                            games &&
                            games.length > 0 &&
                            games.map(game => {
                              if (game.platforms.findIndex(item => item.id === venuePlatform) === -1) return null
                              return (
                                <InputCheckBox
                                  key={game.id}
                                  name="venueGames"
                                  value={game.id}
                                >
                                  {game.name}
                                </InputCheckBox>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("venueGamingFacilities")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "venueGamingFacilities" ? "block" : "none", // Gaming facilities
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Gaming facilities
              </Text>
              <br />
              <div>
                <InputCheckBox name="venueGamingFacilities" value="lan">LAN</InputCheckBox>
                <InputCheckBox name="venueGamingFacilities" value="gaming_booth">Private Gaming Booths</InputCheckBox>
                <InputCheckBox name="venueGamingFacilities" value="booth">Private booth</InputCheckBox>
                <InputCheckBox name="venueGamingFacilities" value="tv_screens">TV screens / streams</InputCheckBox>
                <InputCheckBox name="venueGamingFacilities" value="arena">Arena</InputCheckBox>
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("venueFacilities")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "venueFacilities" ? "block" : "none", // Venue facilities
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Venue facilities
              </Text>
              <br />
              <div>
                <InputCheckBox name="venueFacilities" value="soft_drinks">Soft drinks</InputCheckBox>
                <InputCheckBox name="venueFacilities" value="alchohol">Alcoholic drinks</InputCheckBox>
                <InputCheckBox name="venueFacilities" value="food">Food</InputCheckBox>
              </div>
              <br /> <br />
              <SubmitButton isLoading={loading} {...buttonProps} onClick={() => setStep("venueThanks")}>
                Next
              </SubmitButton>
            </div>
            <div
              style={{
                display: step === "venueThanks" ? "block" : "none", // Venue thanks
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
                display: step === "gamerType" ? "block" : "none", // Gamer looking for
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                I am looking to
              </Text>
              <br />
              <div>
                <InputCheckBox name="gamerType" value="social">Play socially</InputCheckBox>
                <InputCheckBox name="gamerType" value="competitive">Play competitively</InputCheckBox>
                <InputCheckBox name="gamerType" value="other">Other</InputCheckBox>
              </div>
              <br /> <br />
              <SubmitButton isLoading={loading} {...buttonProps} onClick={() => setStep("gamerThanks")}>
                Next
              </SubmitButton>
            </div>
            <div
              style={{
                display: step === "gamerThanks" ? "block" : "none", // Gamer thanks
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
                display: step === "organiserInfo" ? "block" : "none", // Organiser info
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
              <Button {...buttonProps} onClick={() => setStep("organiserPlatforms")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "organiserPlatforms" ? "block" : "none", // Organiser platforms
              }}
            >
              <Text as="h4" fontSize="xl" color="white">
                Which platforms will you be mostly creating tournaments for?
              </Text>
              <br />
              <div>
                {
                  platforms &&
                  platforms.length > 0 &&
                  platforms.map(platform => {
                    return (
                      <InputCheckBox
                        key={platform.id}
                        name="organiserPlatforms"
                        value={platform.id}
                      >
                        {platform.name}
                      </InputCheckBox>
                    )
                  })
                }
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("organiserGames")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "organiserGames" ? "block" : "none", // Organiser games
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Games you would like to organise tournaments for?
              </Text>
              <br />
              <div>
                {
                  games &&
                  games.length > 0 &&
                  games.map(game => {
                    return (
                      <InputCheckBox
                        key={game.id}
                        name="organiserGames"
                        value={game.id}
                      >
                        {game.name}
                      </InputCheckBox>
                    )
                  })
                }
              </div>
              <br /> <br />
              <Button {...buttonProps} onClick={() => setStep("organiserVenue")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "organiserVenue" ? "block" : "none", // Organiser Venue
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                Venue Info
              </Text>
              <br />
              <InputSearchable
                label="Venue Name"
                name="organiserVenueName"
                type="organiserVenueName"
                placeholder="Venue Name"
                searchType="venue"
              />
              <InputText
                label="Office Location"
                name="organiserOffice"
                type="organiserOffice"
                placeholder="Office Location"
              />
              <InputText
                label="Other"
                name="organiserOther"
                type="organiserOther"
                placeholder="Other"
              />
              <Button {...buttonProps} onClick={() => setStep("organiserEquipment")}>
                Next
              </Button>
            </div>
            <div
              style={{
                display: step === "organiserEquipment" ? "block" : "none", // Organiser equipment
              }}
            >
              <Text as="h4" fontSize="3xl" color="white">
                What equipments will you need for your tournaments?
              </Text>
              <br />
              <div>
                <InputCheckBox name="organiserEquipment" value="venue_equipment">Venue equipment</InputCheckBox>
                <InputCheckBox name="organiserEquipment" value="byo_equip">BYO equipment</InputCheckBox>
                <InputCheckBox name="organiserEquipment" value="source_equip">I would like to source the equipment when I need it</InputCheckBox>
              </div>
              <br /> <br />
              <SubmitButton isLoading={loading} {...buttonProps} onClick={() => setStep("organiserThanks")}>
                Next
              </SubmitButton>
            </div>
            <div
              style={{
                display: step === "organiserThanks" ? "block" : "none", // Organiser thanks
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
            <br />
            {
              step !== "aboutYou" &&
              step !== "userType" &&
              step !== "gamerThanks" &&
              step !== "venueThanks" &&
              step !== "organiserThanks" &&
              <Link to="/profile">Skip for now</Link>
            }
          </div>
        </Form>
        }
      </Formik>
    </>
  )
}

export default RegisterJourneyForm
