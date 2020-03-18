import React, { useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/core";
import InputText from './../../components/InputText/InputText'
import InputCheckBox from './../../components/InputCheckBox/InputCheckBox'
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
          password: "",
          passwordConfirm: "",
          terms: false
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password confirm is required"),
          terms: Yup.bool().oneOf(
            [true],
            "Terms and Conditions should be accepted"
          )
        })}
        onSubmit={(values, actions) => {
          setLoading(true);
          setTimeout(() => {
            axios
              .post("https://guild.ehsangazar.com/api/register", {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.passwordConfirm,
                terms: values.terms
              })
              .then(response => {
                if (response.data.error) {
                  setResult({
                    messages: Object.values(response.data.data).map(item => item[0]),
                    status: "error"
                  });
                }
                setResult({
                  messages: ["You have successfully registered"],
                  status: "success"
                });
              })
              .catch(error => {
                setResult({
                  messages: ["Something went wrong"],
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
          <InputText
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
          />
          <InputCheckBox name="terms">
            I accept all terms and conditions
          </InputCheckBox>

          <SubmitButton isLoading={loading}>REGISTER</SubmitButton>

          {result &&
            result.messages.map(item => (
              <Alert status={result.status}>
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