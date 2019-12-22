import React, { useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import InputText from './../../components/InputText/InputText'
import InputCheckBox from './../../components/InputCheckBox/InputCheckBox'
import SubmitButton from './../../components/SubmitButton/SubmitButton'

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          remember: false
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
          password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
          remember: Yup.boolean()
        })}
        onSubmit={(values, actions) => {
          setLoading(true)
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            setLoading(false)
          }, 2000);
        }}
      >
        <Form>
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
          <InputCheckBox name="remember">
            Remember me
          </InputCheckBox>

          <SubmitButton isLoading={loading}>
            Login
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
};



export default LoginForm;