import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import store from './app/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'

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
  <CookiesProvider>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </CookiesProvider>
)
