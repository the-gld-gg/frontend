import React from "react"
import { useField } from "formik"
import {
  FormControl,
} from "@chakra-ui/core"
import { Select } from "@chakra-ui/core"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import LayoutFormControl from "../../containers/LayoutFormControl/LayoutFormControl"

const InputSelect = ({
  variantColor = "blue",
  size = "lg",
  spacing = 6,
  color = "white",
  fontWeight = "bold",
  textAlign = "left",
  ...props
}) => {
  const [field, meta] = useField(props)

  return (
    <LayoutFormControl>
      <FormControl>
        <Select
          variantColor={variantColor}
          size={size}
          spacing={spacing}
          color={color}
          fontWeight={fontWeight}
          textAlign={textAlign}
          defaultIsChecked={field.value && field.value.includes(props.value)}
          {...field}
          {...props}
        >
          {props.children}
        </Select>
        {meta.touched && meta.error ? (
          <ErrorMessage>
            {meta.error}
          </ErrorMessage>
        ) : null}
      </FormControl>
    </LayoutFormControl>
  )
}

export default InputSelect