import React, { useState } from "react"
import { useField } from "formik"
import { FormControl, Input, List, ListItem } from "@chakra-ui/core"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import LayoutFormControl from "../../containers/LayoutFormControl/LayoutFormControl"
import googleAutoComplete from "../../utils/googleAutoComplete"
import styles from "./InputSearchable.module.css"

const InputSearchable = ({ label, color = "brand.900", ...props }) => {
  const [field, meta] = useField(props)
  const [value, setValue] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState([])
  const google = new googleAutoComplete()

  return (
    <LayoutFormControl>
      <FormControl>
        <Input
          className={styles.input}
          {...field}
          value={value}
          onChange={(event) => {
            const val = event.target.value
            if (val) {
              setValue(val)
              google.searchAddress(val, (response) => {
                if (response && response.length > 0) {
                  setShowResults(true)
                  setResults(response.filter(item => item.types.includes("street_address")))
                }
              })
            }
          }}
          {...props}
          autoComplete="off" />
        {
          showResults &&
          results &&
          results.length > 0 &&
          <List
            border="1px solid"
            background="white"
            position="absolute"
            zIndex="9"
            className={styles.inputList}>
            {
              results.map((result, index) => {
                return (
                  <ListItem
                    key={`Result-${index}`}
                    padding="16px 8px"
                    cursor="pointer"
                    _hover={{
                      bg: "brand.300",
                      color: "brand.900"
                    }}
                    onClick={() => {
                      setValue(result.description)
                      setShowResults(false)
                    }}>
                    {result.description}
                  </ListItem>
                )
              })
            }
          </List>
        }
        {meta.touched && meta.error ? (
          <ErrorMessage color={color}>
            {meta.error}
          </ErrorMessage>
        ) : null}
      </FormControl>
    </LayoutFormControl>
  )
}

export default InputSearchable