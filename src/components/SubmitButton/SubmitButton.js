import React from 'react'
import {
  FormControl,
} from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";
import LayoutFormControl from './../../containers//LayoutFormControl/LayoutFormControl'

const SubmitButton = (props) => (
  <LayoutFormControl>
    <FormControl>
      <Button
        isLoading={props.isSubmitting}
        type="submit"
        color="white"
        bg="#0A154A"
        size="lg"
        width="100%"
        fontSize="3xl"
        {...props}
      >
        {props.children}
      </Button>
    </FormControl>
  </LayoutFormControl>
)

export default SubmitButton