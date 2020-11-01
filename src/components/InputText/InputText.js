import React from "react"
import { useField } from "formik";
import { FormControl, Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import LayoutFormControl from "../../containers/LayoutFormControl/LayoutFormControl"
import styles from "./InputText.module.css"

const InputText = ({
    label,
    color = "brand.900",
    icon = null,
    ...props
  }) => {
  const [field, meta] = useField(props);
  
  return (
    <LayoutFormControl>
      <FormControl>
        <label for={props.name}>{label}</label>
        <InputGroup>
          {
            icon &&
            <InputLeftElement
              width="62px"
              height="62px"
              children={<Icon width="20px" height="20px" name={icon} />}
            />
          }
          <Input className={styles.input} {...field} {...props} />
        </InputGroup>
        {meta.touched && meta.error ? (
          <ErrorMessage color={color}>
            {meta.error}
          </ErrorMessage>
        ) : null}
      </FormControl>
    </LayoutFormControl>
  )
}

export default InputText