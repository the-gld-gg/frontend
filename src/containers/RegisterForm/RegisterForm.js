import React, { useState } from "react"
import { Redirect } from "react-router"
import { Formik, Form} from "formik"
import * as Yup from "yup"
import axios from "axios"
import {
  Alert,
  AlertIcon,
  Box,
  Image,
  Text
} from "@chakra-ui/core"
import gtmHandler from "../../utils/gtmHandler"
import InputText from "./../../components/InputText/InputText"
import SubmitButton from "./../../components/SubmitButton/SubmitButton"
import Section from "../../components/Section/Section"

const RegisterForm = (props) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  if (result && result.redirect) {
    return (
      <Redirect push to={result.redirect} />
    )
  }

  return (
    <>
      <Section verticalPadding horizontalPadding bg="#DEE4EE url(/hero-dots.png) no-repeat top right" backgroundSize="10%" textAlign="left" fullWidth>
        <Text as="h1" fontSize="5xl" color="#4E4C5C">Join <span style={{ color: "#EC1D51" }}>the Gld.</span> today</Text>
      </Section>
      <Section fullWidth verticalPadding>
        <Box display="flex">
          <Box flexShrink={0} className="hide-mobile">
            <Section horizontalPadding textAlign="left">
              <Text as="h1" fontSize="5xl" color="#4E4C5C"><span style={{ color: "#EC1D51" }}>01.</span></Text>
              <br />
              <Text as="h2" fontSize="4xl" color="#4E4C5C">Let's setup your account fast!</Text>
              <br />
              <br />
            </Section>
            <Image src="/xboxController.png" alt="Login" margin="0 auto" display="block" />
          </Box>
          <Section horizontalPadding>
            <Text as="h3" fontSize="3xl" color="#EC1D51">Account info</Text>
            <br />
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: ""
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                email: Yup.string()
                  .email("Invalid email addresss`")
                  .required("Required"),
                password: Yup.string()
                  .required("No password provided.")
                  .min(8, "Password is too short - should be 8 chars minimum.")
                  .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
              })}
              onSubmit={(values, actions) => {
                setLoading(true)
                axios
                  .post("https://api.thegld.gg/api/v1/user/register", {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    password_confirmation: values.password,
                    confirmEmailUrl: "/register-journey",
                    terms: true
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

                    if (response.data && response.data.user) {
                      sessionStorage.setItem("user", JSON.stringify(response.data.user))
                    }

                    if (response.data && response.data.message && response.data.message === "User already exists with this email") {
                      axios
                        .post("https://api.thegld.gg/api/v1/user/login", {
                          email: values.email,
                          password: values.password
                        }).then(response => {
                          if (response.data && response.data.user) {
                            sessionStorage.setItem("user", JSON.stringify(response.data.user))
                          }
                        })
                    }

                    setResult({
                      messages: ["You have successfully registered."],
                      status: "success",
                      redirect: "/register-journey" // register-success
                    })

                    gtmHandler({
                      event: "registration success",
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
                <InputText label="Name" name="name" type="name" placeholder="Name" />
                <InputText
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
                <InputText
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <br />
                <SubmitButton
                  isLoading={loading}
                  color="#EC1D51"
                  bg="transparent"
                  variant="outline"
                  variantColor="#EC1D51"
                  onClick={() => {
                    gtmHandler({
                      event: "click register",
                      eventType: "form_submit",
                      category: {
                        primaryCategory: "form interaction",
                        subCategory: props.gtm.subCategory
                      }
                    })
                  }}>
                  Continue
                </SubmitButton>

                {result &&
                  result.messages.map((item, index) => (
                    <Alert
                      key={`Alert${index}`}
                      status={result.status}>
                      <AlertIcon />
                      {item}
                    </Alert>
                  ))}
              </Form>
            </Formik>
          </Section>
        </Box>
      </Section>
    </>
  )
}

export default RegisterForm
