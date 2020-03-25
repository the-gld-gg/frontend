import React from "react"
import { Link } from "react-router-dom"
import {
  Box,
  Image,
  Icon,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider
} from "@chakra-ui/core"
import styles from "./Header.module.css"

const Header = () => (
  <Box bg="brand.900" className={styles.header}>
    <Link to="/">
      <Image src="logo.svg" alt="The GLD" />
    </Link>
    <Menu>
      <MenuButton as={Button} variant="outline" variantColor="brand">
        <Icon name="menu" size="32px" color="brand.800" />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuDivider />
        <MenuGroup title="Account">
          <MenuItem>
            <Link to="/login">Login</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/register">Sign up</Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  </Box>
)

export default Header