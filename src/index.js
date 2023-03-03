import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import '@fontsource/source-sans-pro'

const colors = {
  main: {
    900: '#022540',
  },
  body: {
    fontFamily: 'Source Sans Pro',
  },
}

const theme = extendTheme({ colors })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
