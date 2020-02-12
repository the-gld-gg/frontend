import React, { useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import InputText from '../../components/InputText/InputText'
import SubmitButton from '../../components/SubmitButton/SubmitButton'

const ForgotForm = (props) => {
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
            .required("Required")
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

          <SubmitButton isLoading={loading}>
            Submit
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
};

export default ForgotForm;