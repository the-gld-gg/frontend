import React, { useState } from "react"
import { Redirect } from "react-router"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import axios from "axios"
import {
  Alert,
  AlertIcon,
  Button,
  Text
} from "@chakra-ui/core"
import gtmHandler from "../../utils/gtmHandler"
import InputText from "./../../components/InputText/InputText"
import SubmitButton from "./../../components/SubmitButton/SubmitButton"
import { Link } from "react-router-dom"

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  if (result && result.redirect) {
    return (
      <Redirect push to={result.redirect} />
    )
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={Yup.object({
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
            .post("https://api.thegld.gg/api/v1/user/login", {
              email: values.email,
              password: values.password
            })
            .then(response => {
              actions.setSubmitting(false)
              setLoading(false)

              if (response.data.error) {
                setResult({
                  messages: Object.values(response.data.data).map(item => item[0]),
                  status: "error"
                })
                return
              }

              if (response.data && response.data.user) {
                sessionStorage.setItem("user", JSON.stringify(response.data.user))
              }

              setResult({
                messages: ["You have successfully logged in."],
                status: "success",
                redirect: "/profile"
              })
              gtmHandler({
                event: "login success",
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
          <InputText
            label="Email address"
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
            onClick={() => {
              gtmHandler({
                event: "click login",
                eventType: "form_submit",
                category: {
                  primaryCategory: "form interaction",
                  subCategory: props.gtm.subCategory
                }
              })
            }}>
            Login
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
          <Link to="/forgotpassword"><Text fontSize="s" fontWeight="bold" color="brand.800">Forgot your password?</Text></Link>
          <br />
          <br />
          <br />
          <Link to="/register"><Text  color="brand.900">Don't have an account yet?</Text></Link>
          <br />
          <Button
            color="#EC1D51"
            variantColor="#EC1D51"
            bg="transparent"
            width="100%"
            size="lg"
            variant="outline"
            onClick={() => {
              gtmHandler({
                event: "register your venue",
                eventType: "button_click",
                category: {
                  primaryCategory: "content interaction",
                  subCategory: "homepage"
                }
              })
            }}><Link to="/register">Join now</Link>
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default LoginForm
