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
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required('Password confirm is required')
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
            label="New password"
            name="password"
            type="password"
            placeholder="New password"
          />
          <InputText
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
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