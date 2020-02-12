import React from 'react'
import {
  FormControl,
} from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";
import LayoutFormControl from './../../containers//LayoutFormControl/LayoutFormControl'

const SubmitButton = (props) => {

  return (
    <LayoutFormControl>
      <FormControl>
        <Button
            isLoading={props.isSubmitting}
            type="submit"
            color="#0A154A"
            bg="#EE215B"
            size="lg"
            width="100%"
            {...props}
          >
            {props.children}
          </Button>
      </FormControl>
    </LayoutFormControl>
  );
};

export default SubmitButton