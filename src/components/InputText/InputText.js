import React from 'react'
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import { Input } from "@chakra-ui/core";
import ErrorMessage from './../ErrorMessage/ErrorMessage'
import LayoutFormControl from './../../containers//LayoutFormControl/LayoutFormControl'

const InputText = ({ label, ...props }) => {

  const [field, meta] = useField(props);
  return (
    <LayoutFormControl>
      <FormControl>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <Input {...field} {...props} />
        {meta.touched && meta.error ? (
          <ErrorMessage>
            {meta.error}
          </ErrorMessage>
        ): null}
      </FormControl>
    </LayoutFormControl>
  );
};

export default InputText