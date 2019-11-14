import React from 'react'
import { useField } from "formik";
import {
  FormControl,
} from "@chakra-ui/core";
import { Checkbox } from "@chakra-ui/core";
import ErrorMessage from './../ErrorMessage/ErrorMessage'
import LayoutFormControl from './../../containers//LayoutFormControl/LayoutFormControl'

const InputCheckBox = ({ label, ...props }) => {

  const [field, meta] = useField(props);
  return (
    <LayoutFormControl>
      <FormControl>
        <Checkbox {...field} {...props}>{props.children}</Checkbox>
        {meta.touched && meta.error ? (
          <ErrorMessage>
            {meta.error}
          </ErrorMessage>
        ) : null}
      </FormControl>
    </LayoutFormControl>
  );
};

export default InputCheckBox