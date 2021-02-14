import React from 'react'
import Layout from './layout'

const customPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export default customPageElement