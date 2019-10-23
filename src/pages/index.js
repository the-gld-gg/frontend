import React from "react"
import Layout from "../components/Layout/Layout"
import Map from "../components/Map/Map"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    Map should render below:
    <br />
    <Map />
  </Layout>
)

export default IndexPage
