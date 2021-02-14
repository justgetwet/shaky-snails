import './src/styles/tailwind.css'
import '@fontsource/lato'
import '@fontsource/yakuhanjp'
import '@fontsource/kosugi-maru'

import customPageElement from './src/components/wrapPageElements'

export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname)
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)
}

export const wrapPageElement = customPageElement