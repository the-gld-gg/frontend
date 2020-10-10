import React, { useState } from "react"
import { Redirect } from "react-router"
import { Formik, Form} from "formik"
import * as Yup from "yup"
import axios from "axios"
import {
  Alert,
  AlertIcon,
  Text
} from "@chakra-ui/core"
import gtmHandler from "../../utils/gtmHandler"
import InputText from "./../../components/InputText/InputText"
import SubmitButton from "./../../components/SubmitButton/SubmitButton"
import { Link } from "react-router-dom"

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
      <Text as="h3" fontSize="6xl" color="#4E4C5C">Join the Gld. today.</Text>
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

          <SubmitButton
            isLoading={loading}
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
            REGISTER
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
      <br />
      <Link to="/login"><Text  color="brand.900">Already have an account? Login ></Text></Link>
    </>
  )
}

export default RegisterForm
