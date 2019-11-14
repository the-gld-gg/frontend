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
            variantColor="teal"
            isLoading={props.isSubmitting}
            type="submit"
            {...props}
          >
            {props.children}
          </Button>
      </FormControl>
    </LayoutFormControl>
  );
};

export default SubmitButton