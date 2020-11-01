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
        bg="#EC1D51"
        size="lg"
        width="100%"
        fontSize="3xl"
        _hover={{
          bg: "brand.300",
          color: "brand.900"
        }}
        {...props}
      >
        {props.children}
      </Button>
    </FormControl>
  </LayoutFormControl>
)

export default SubmitButton