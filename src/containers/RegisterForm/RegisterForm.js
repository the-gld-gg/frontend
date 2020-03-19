import React, { useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {
  Alert,
  AlertIcon
} from "@chakra-ui/core";
import gtmHandler from "../../utils/gtmHandler"
import InputText from './../../components/InputText/InputText'
import SubmitButton from './../../components/SubmitButton/SubmitButton'

const RegisterForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  return (
    <>
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
          setLoading(true);
          setTimeout(() => {
            axios
              .post("https://guild.ehsangazar.com/api/register", {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.password,
                terms: true
              })
              .then(response => {
                if (response.data.error) {
                  setResult({
                    messages: Object.values(response.data.data).map(item => item[0]),
                    status: "error"
                  });
                }
                setResult({
                  messages: ["You have successfully registered."],
                  status: "success"
                });
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
                });
              });
            actions.setSubmitting(false);
            setLoading(false);
          }, 2000);
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
    </>
  );
};



export default RegisterForm;