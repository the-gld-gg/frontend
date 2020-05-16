import React, { useState } from "react"
import { Formik, Form} from "formik"
import * as Yup from "yup"
import axios from "axios"
import {
  Alert,
  AlertIcon
} from "@chakra-ui/core"
import gtmHandler from "../../utils/gtmHandler"
import InputText from "./../../components/InputText/InputText"
import SubmitButton from "./../../components/SubmitButton/SubmitButton"

const ForgotForm = (props) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  return (
    <>
      <Formik
        initialValues={{
          email: ""
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required")
        })}
        onSubmit={(values, actions) => {
          setLoading(true)
          axios
            .post("https://api.thegld.gg/v1/user/forgot", {
              email: values.email
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

              setResult({
                messages: ["A request has been sent. Kindly check your inbox."],
                status: "success"
              })
              gtmHandler({
                event: "forgot success",
                eventType: "form_response",
                category: {
                  primaryCategory: "form interaction",
                  subCategory: "forgot page"
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
            label="Email"
            name="email"
            type="email"
            placeholder="Email address"
          />

          <SubmitButton
            isLoading={loading}
            onClick={() => {
              gtmHandler({
                event: "click submit",
                eventType: "form_submit",
                category: {
                  primaryCategory: "form interaction",
                  subCategory: "forgot page"
                }
              })
            }}>
            Submit
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
    </>
  );
};

export default ForgotForm;