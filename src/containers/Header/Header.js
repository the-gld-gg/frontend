import React, { useState, useEffect } from "react"
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
  MenuDivider,
  useToast
} from "@chakra-ui/core"
import styles from "./Header.module.css"

const Header = (props) => {
  const [user, setUser] = useState(sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null)
  const [toastMessage, setToastMessage] = useState(undefined)
  const toast = useToast()

  useEffect(() => {
    if (toastMessage) {
      const { title, body } = toastMessage

      toast({
        title,
        description: body,
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    }
  }, [toastMessage, toast])

  return (
    <Box background={`linear-gradient(117.79deg, #52C3FF 27.59%, #008DD7 93.69%);`} className={styles.header}>
      <Link to="/">
        <Image src="/logo.svg" alt="The GLD" />
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
          {
            user &&
            user.access_token ?
            <MenuGroup title="Account">
              <MenuItem
                onClick={() => {
                  setUser(null)
                  sessionStorage.removeItem("user")
                  setToastMessage({
                    title: "Logout",
                    body: "You've successfully logged out."
                  })
                }}>
                Logout
              </MenuItem>
            </MenuGroup>
            :
            <MenuGroup title="Account">
              <MenuItem>
                <Link to="/login">Login</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/register">Sign up</Link>
              </MenuItem>
            </MenuGroup>
          }
        </MenuList>
      </Menu>
    </Box>
  )
}

export default Header
