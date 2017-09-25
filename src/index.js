import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import './styles/app.css'
import configureStore from './store/configureStore'
import Cookies from 'js-cookie'

const store = configureStore()

if (!Cookies.get('state')) {
  Cookies.set('state', store.getState().control);
} 

store.subscribe(() => {
  let cookies = JSON.parse(Cookies.get('state'));  
  cookies = {...cookies, ...store.getState().control};
  Cookies.set('state', cookies);
})

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
)
