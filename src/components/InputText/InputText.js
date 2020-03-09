import React from 'react'
import { useField } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/core"
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import LayoutFormControl from '../../containers/LayoutFormControl/LayoutFormControl'
import styles from "./InputText.module.css"

const InputText = ({ label, color = "brand.900", ...props }) => {
  const [field, meta] = useField(props);

  return (
    <LayoutFormControl>
      <FormControl>
        {/* <FormLabel htmlFor={props.id || props.name} color={color}>{label}</FormLabel> */}
        <Input className={styles.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <ErrorMessage color={color}>
            {meta.error}
          </ErrorMessage>
        ) : null}
      </FormControl>
    </LayoutFormControl>
  );
};

export default InputText