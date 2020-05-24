import React from 'react'
import { useField } from "formik";
import {
  FormControl,
} from "@chakra-ui/core";
import { Checkbox } from "@chakra-ui/core";
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import LayoutFormControl from '../../containers/LayoutFormControl/LayoutFormControl'

const InputCheckBox = ({
  variantColor = "blue",
  size = "lg",
  spacing = 6,
  color = "white",
  fontWeight = "bold",
  textAlign = "left",
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <LayoutFormControl>
      <FormControl>
        <Checkbox
          variantColor={variantColor}
          size={size}
          spacing={spacing}
          color={color}
          fontWeight={fontWeight}
          textAlign={textAlign}
          {...field}
          {...props}
        >
          {props.children}
        </Checkbox>
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