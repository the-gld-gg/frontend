import React from 'react'
import Layout from './../../containers/Layout/Layout'
import {
  Link
} from "react-router-dom";

const About = ({
  children
}) => (
    <Layout>
        About
      {children}
      <Link to="/">Homepage</Link>
    </Layout>
)

export default About